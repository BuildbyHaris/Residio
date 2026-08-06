import { useState, useEffect } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const ROOM_TYPE_OPTIONS = ["Single", "Double", "Triple", "Dormitory"];
const AMENITY_OPTIONS = [
  "WiFi",
  "Food",
  "Laundry",
  "Parking",
  "AC",
  "Security",
  "Power Backup",
  "Hot Water",
];

const emptyFormState = {
  name: "",
  description: "",
  address: "",
  city: "",
  genderPreference: "Boys",
  contactNumber: "",
  totalBeds: "",
  amenities: [],
  roomTypes: [
    { type: "Single", price: "", availableBeds: "", imageFile: null, existingImage: null },
  ],
};

const HostelForm = ({
  onSubmit,
  onClose,
  submitting,
  initialData,
}) => {
  const isEditMode = Boolean(initialData);

  const [formData, setFormData] = useState(emptyFormState);
  const [hostelImages, setHostelImages] = useState([]); // new files only
  const [errors, setErrors] = useState({});
  const [existingHostelImages, setExistingHostelImages] = useState([]);
  const [deletedHostelImages, setDeletedHostelImages] = useState([]);

  // ---------- Pre-fill form when editing ----------
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        address: initialData.address || "",
        city: initialData.city || "",
        genderPreference: initialData.genderPreference || "Boys",
        contactNumber: initialData.contactNumber || "",
        totalBeds: initialData.totalBeds || "",
        amenities: initialData.amenities || [],
        roomTypes:
          initialData.roomTypes?.map((rt) => ({
            type: rt.type,
            price: rt.price,
            availableBeds: rt.availableBeds,
            imageFile: null, // new upload if owner changes it
            existingImage: rt.image?.url || null, // show current image
          })) || emptyFormState.roomTypes,
      });
      setExistingHostelImages(initialData.images || []);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleAmenity = (amenity) => {
    setFormData((prev) => {
      const exists = prev.amenities.includes(amenity);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== amenity)
          : [...prev.amenities, amenity],
      };
    });
  };

  const handleHostelImagesChange = (e) => {
    const files = Array.from(e.target.files);

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (files.length > 10) {
      setErrors((prev) => ({
        ...prev,
        hostelImages: "Maximum 10 images are allowed",
      }));
      return;
    }

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          hostelImages:
            "Only JPG, JPEG, PNG and WEBP images are allowed",
        }));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          hostelImages:
            "Each image must be less than 5 MB",
        }));
        return;
      }
    }

    setErrors((prev) => ({
      ...prev,
      hostelImages: undefined,
    }));

    setHostelImages(files);
  };
  const removeExistingHostelImage = (index) => {
    const image = existingHostelImages[index];

    setDeletedHostelImages((prev) => [
      ...prev,
      image.publicId,
    ]);

    setExistingHostelImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleRoomTypeChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.roomTypes];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, roomTypes: updated };
    });
  };

  const handleRoomImageChange = (index, file) => {
    handleRoomTypeChange(index, "imageFile", file);
  };

  const addRoomTypeRow = () => {
    setFormData((prev) => ({
      ...prev,
      roomTypes: [
        ...prev.roomTypes,
        { type: "Single", price: "", availableBeds: "", imageFile: null, existingImage: null },
      ],
    }));
  };

  const removeRoomTypeRow = (index) => {
    setFormData((prev) => ({
      ...prev,
      roomTypes: prev.roomTypes.filter((_, i) => i !== index),
    }));
  };

  const validate = () => {
    const newErrors = {};

    // Hostel Name
    const hostelName = formData.name.trim();
    const hostelNameRegex = /^[A-Za-z0-9&' -]+$/;

    if (!hostelName) {
      newErrors.name = "Hostel name is required";
    }
    else if (hostelName.length < 3) {
      newErrors.name = "Hostel name must be at least 3 characters";
    }
    else if (hostelName.length > 50) {
      newErrors.name = "Hostel name cannot exceed 50 characters";
    }
    else if (!hostelNameRegex.test(hostelName)) {
      newErrors.name =
        "Only letters, numbers, spaces, &, ' and - are allowed";
    }

    // Description
    const description = formData.description.trim();

    if (description) {
      if (description.length < 10) {
        newErrors.description =
          "Description must be at least 10 characters";
      } else if (description.length > 500) {
        newErrors.description =
          "Description cannot exceed 500 characters";
      }
    }

    // Address
    const address = formData.address.trim();
    const addressRegex = /^[A-Za-z0-9\s,./#-]+$/;

    if (!address) {
      newErrors.address = "Address is required";
    }
    else if (address.length < 5) {
      newErrors.address = "Address must be at least 5 characters";
    }
    else if (address.length > 100) {
      newErrors.address = "Address cannot exceed 100 characters";
    }
    else if (!addressRegex.test(address)) {
      newErrors.address =
        "Address contains invalid characters";
    }

    // City
    const city = formData.city.trim();
    const cityRegex = /^[A-Za-z\s]+$/;

    if (!city) {
      newErrors.city = "City is required";
    }
    else if (city.length < 2) {
      newErrors.city = "City must be at least 2 characters";
    }
    else if (city.length > 50) {
      newErrors.city = "City cannot exceed 50 characters";
    }
    else if (!cityRegex.test(city)) {
      newErrors.city = "City can contain only letters and spaces";
    }


    // Pakistan Contact Number
    const phone = formData.contactNumber.trim();

    if (!phone) {
      newErrors.contactNumber = "Contact number is required";
    } else {
      let parsedPhone;

      // International Number
      if (phone.startsWith("+")) {
        parsedPhone = parsePhoneNumberFromString(phone);
      }

      // Pakistan Local Number
      else {
        parsedPhone = parsePhoneNumberFromString(phone, "PK");
      }

      if (!parsedPhone || !parsedPhone.isValid()) {
        newErrors.contactNumber =
          "Enter a valid phone number";
      }
    }


    // Total Beds
    const totalBeds = String(formData.totalBeds ?? "").trim();

    const totalBedsRegex = /^[1-9]\d*$/;

    if (!totalBeds) {
      newErrors.totalBeds = "Total beds are required";
    }
    else if (!totalBedsRegex.test(totalBeds)) {
      newErrors.totalBeds =
        "Total beds must be a valid whole number";
    }
    else if (Number(totalBeds) < 1) {
      newErrors.totalBeds =
        "Total beds must be at least 1";
    }
    else if (Number(totalBeds) > 1000) {
      newErrors.totalBeds =
        "Total beds cannot exceed 1000";
    }


    // Room Types
    const roomTypes = formData.roomTypes;

    const duplicateTypes = roomTypes
      .map((room) => room.type)
      .filter(
        (type, index, arr) =>
          arr.indexOf(type) !== index
      );
    if (roomTypes.length === 0) {
      newErrors.roomTypes =
        "Please add at least one room type";
    }

    if (duplicateTypes.length > 0) {
      newErrors.roomTypes =
        "Same room type cannot be added multiple times";
    }


    roomTypes.forEach((rt, index) => {

      const priceRegex = /^[1-9]\d*(\.\d{1,2})?$/;


      if (!rt.price) {
        newErrors[`roomTypePrice_${index}`] =
          "Price is required";
      }

      else if (!priceRegex.test(rt.price)) {
        newErrors[`roomTypePrice_${index}`] =
          "Enter a valid price (e.g. 500 or 500.50)";
      }

      else if (Number(rt.price) <= 0) {
        newErrors[`roomTypePrice_${index}`] =
          "Price must be greater than zero";
      }


      const availableBeds = String(rt.availableBeds).trim();

      const availableBedsRegex = /^(0|[1-9]\d*)$/;

      if (!availableBeds) {
        newErrors[`roomTypeBeds_${index}`] =
          "Available beds are required";
      }

      else if (!availableBedsRegex.test(availableBeds)) {
        newErrors[`roomTypeBeds_${index}`] =
          "Available beds must be a valid whole number";
      }

      else if (Number(availableBeds) > Number(formData.totalBeds)) {
        newErrors[`roomTypeBeds_${index}`] =
          "Available beds cannot exceed total beds";
      }
      // Room Image Validation
      if (!isEditMode && !rt.imageFile) {
        newErrors[`roomImage_${index}`] =
          "Room image is required";
      }

      if (rt.imageFile) {
        const allowedTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/webp",
        ];

        if (!allowedTypes.includes(rt.imageFile.type)) {
          newErrors[`roomImage_${index}`] =
            "Only JPG, JPEG, PNG and WEBP images are allowed";
        }

        if (rt.imageFile.size > 5 * 1024 * 1024) {
          newErrors[`roomImage_${index}`] =
            "Image size must be less than 5 MB";
        }
      }

    });


    // Hostel Images validation
    const totalHostelImages =
      existingHostelImages.length + hostelImages.length;

    if (totalHostelImages === 0) {
      newErrors.hostelImages =
        "Please upload at least one hostel image";
    }
    const allowedImageTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (hostelImages.length > 10) {
      newErrors.hostelImages =
        "Maximum 10 images are allowed";
    }

    hostelImages.forEach((file) => {

      if (!allowedImageTypes.includes(file.type)) {
        newErrors.hostelImages =
          "Only JPG, JPEG, PNG and WEBP images are allowed";
      }

      if (file.size > 5 * 1024 * 1024) {
        newErrors.hostelImages =
          "Each image must be less than 5 MB";
      }

    });


    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const form = new FormData();

    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("address", formData.address);
    form.append("city", formData.city);
    form.append("genderPreference", formData.genderPreference);
    form.append("contactNumber", formData.contactNumber);
    form.append("totalBeds", formData.totalBeds);
    form.append("amenities", JSON.stringify(formData.amenities));

    // Image field intentionally omitted here — backend retains existing image
    // object ({url, publicId}) automatically when no new file is uploaded.
    const roomTypesPayload = formData.roomTypes.map((rt) => ({
      type: rt.type,
      price: Number(rt.price),
      availableBeds: Number(rt.availableBeds),
    }));
    form.append("roomTypes", JSON.stringify(roomTypesPayload));

    hostelImages.forEach((file) => form.append("images", file));
    form.append(
      "deletedHostelImages",
      JSON.stringify(deletedHostelImages)
    );

    formData.roomTypes.forEach((rt) => {
      if (rt.imageFile) {
        form.append("roomImages", rt.imageFile);
      }
    });
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4 pb-3 border-b">
          <h2 className="text-xl font-bold text-gray-900">
            {isEditMode ? "Edit Hostel" : "Add New Hostel"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 text-2xl leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hostel Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              maxLength={50}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="e.g. Green Valley Hostel"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              maxLength={500}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Short description about the hostel"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                maxLength={100}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">{errors.address}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                maxLength={50}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender Preference *
              </label>
              <select
                name="genderPreference"
                value={formData.genderPreference}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="Boys">Boys</option>
                <option value="Girls">Girls</option>
                <option value="Co-ed">Co-ed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Beds *
              </label>
              <input
                type="number"
                name="totalBeds"
                value={formData.totalBeds}
                onChange={handleChange}
                min="1"
                max="1000"
                step="1"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.totalBeds && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.totalBeds}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number *
            </label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="+923001234567"
              maxLength={20}
              inputMode="numeric"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-xs mt-1">
                {errors.contactNumber}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hostel Photos (max 10) {isEditMode && "— leave empty to keep existing"}
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleHostelImagesChange}
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 file:bg-orange-50 file:text-orange-600 file:border-0 file:px-3 file:py-2 file:rounded-md hover:file:bg-orange-100"
            />
            {existingHostelImages.length > 0 && (
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {existingHostelImages.map((image, index) => (
                  <div
                    key={image.publicId}
                    className="relative border rounded-lg overflow-hidden"
                  >
                    <img
                      src={image.url}
                      alt="Hostel"
                      className="h-24 w-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => removeExistingHostelImage(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 text-xs hover:bg-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            {hostelImages.length > 0 && (
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {hostelImages.map((file, index) => (
                  <div
                    key={index}
                    className="relative border rounded-lg overflow-hidden"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="h-24 w-full object-cover"
                    />

                    <p className="text-[10px] p-1 truncate">
                      {file.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {errors.hostelImages && (
              <p className="text-red-500 text-xs mt-1">
                {errors.hostelImages}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Types *
            </label>
            {errors.roomTypes && (
              <p className="text-red-500 text-xs mb-2">
                {errors.roomTypes}
              </p>
            )}
            <div className="space-y-3">
              {formData.roomTypes.map((rt, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-3 space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <select
                      value={rt.type}
                      onChange={(e) =>
                        handleRoomTypeChange(index, "type", e.target.value)
                      }
                      className="border border-gray-300 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      {ROOM_TYPE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>

                    <input
                      type="number"
                      placeholder="Price"
                      value={rt.price}
                      min="1"
                      step="0.01"
                      onChange={(e) =>
                        handleRoomTypeChange(index, "price", e.target.value)
                      }
                      className="border border-gray-300 rounded-lg px-2 py-1.5 text-sm w-24 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />

                    <input
                      type="number"
                      placeholder="Available Beds"
                      value={rt.availableBeds}
                      min="0"
                      step="1"
                      onChange={(e) =>
                        handleRoomTypeChange(
                          index,
                          "availableBeds",
                          e.target.value
                        )
                      }
                      className="border border-gray-300 rounded-lg px-2 py-1.5 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />

                    {formData.roomTypes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRoomTypeRow(index)}
                        className="text-red-500 hover:text-red-700 text-sm ml-auto"
                      >
                        🗑
                      </button>
                    )}
                  </div>

                  <div>
                    {rt.existingImage && !rt.imageFile && (
                      <div className="mb-2">
                        <img
                          src={rt.existingImage}
                          alt="Current Room"
                          className="h-20 w-20 object-cover rounded-lg border"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            handleRoomTypeChange(index, "existingImage", null)
                          }
                          className="mt-2 text-xs text-red-600 hover:text-red-700"
                        >
                          Remove Current Image
                        </button>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleRoomImageChange(index, e.target.files[0])
                      }
                      className="text-xs w-full file:bg-orange-50 file:text-orange-600 file:border-0 file:px-3 file:py-2 file:rounded-md hover:file:bg-orange-100"
                    />
                    {errors[`roomImage_${index}`] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors[`roomImage_${index}`]}
                      </p>
                    )}
                    {rt.imageFile && (
                      <div className="mt-2">
                        <img
                          src={URL.createObjectURL(rt.imageFile)}
                          alt="Preview"
                          className="h-20 w-20 object-cover rounded-lg border"
                        />

                        <p className="text-xs text-gray-500 mt-1 truncate">
                          {rt.imageFile.name}
                        </p>
                      </div>
                    )}
                    {rt.imageFile && (
                      <button
                        type="button"
                        onClick={() =>
                          handleRoomTypeChange(index, "imageFile", null)
                        }
                        className="mt-2 text-xs text-red-600 hover:text-red-700"
                      >
                        Remove Image
                      </button>
                    )}
                  </div>

                  {errors[`roomTypePrice_${index}`] && (
                    <p className="text-red-500 text-xs">
                      {errors[`roomTypePrice_${index}`]}
                    </p>
                  )}
                  {errors[`roomTypeBeds_${index}`] && (
                    <p className="text-red-500 text-xs">
                      {errors[`roomTypeBeds_${index}`]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addRoomTypeRow}
              className="mt-2 text-sm text-orange-600 hover:text-orange-700"
            >
              + Add Another Room Type
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amenities
            </label>
            <div className="flex flex-wrap gap-3">
              {AMENITY_OPTIONS.map((amenity) => (
                <label
                  key={amenity}
                  className="flex items-center gap-1.5 text-sm text-gray-600"
                >
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                    className="rounded text-orange-500 focus:ring-orange-500"
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 text-sm font-medium px-5 py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Saving..." : isEditMode ? "Update Hostel" : "Save Hostel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HostelForm;