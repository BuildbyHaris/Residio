 import { useState, useEffect } from "react";

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
    {
      type: "Single",
      price: "",
      availableBeds: "",
      imageFile: null,
      existingImage: null,
    },
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
    if (files.length > 10) {
      setErrors((prev) => ({
        ...prev,
        hostelImages: "Maximum 10 images allowed",
      }));
      return;
    }
    setErrors((prev) => ({ ...prev, hostelImages: undefined }));
    setHostelImages(files);
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
        {
          type: "Single",
          price: "",
          availableBeds: "",
          imageFile: null,
          existingImage: null,
        },
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

    if (!formData.name.trim()) newErrors.name = "Hostel name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!/^(?:\+92|0)[0-9]{10,11}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Enter a valid Pakistan contact number";
    }
    if (!formData.totalBeds || Number(formData.totalBeds) < 1)
      newErrors.totalBeds = "Total beds must be at least 1";

    formData.roomTypes.forEach((rt, i) => {
      if (!rt.price || Number(rt.price) < 0)
        newErrors[`roomTypePrice_${i}`] = "Valid price required";
      if (rt.availableBeds === "" || Number(rt.availableBeds) < 0)
        newErrors[`roomTypeBeds_${i}`] = "Valid bed count required";
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
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Short description about the hostel"
            />
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.totalBeds && (
                <p className="text-red-500 text-xs mt-1">{errors.totalBeds}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number *
            </label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="+923001234567"
              maxLength={13}
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
              Hostel Photos (max 5){" "}
              {isEditMode && "— leave empty to keep existing"}
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleHostelImagesChange}
              className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 file:bg-orange-50 file:text-orange-600 file:border-0 file:px-3 file:py-2 file:rounded-md hover:file:bg-orange-100"
            />
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
              <p className="text-red-500 text-xs mt-1">{errors.hostelImages}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Types *
            </label>
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
                      onChange={(e) =>
                        handleRoomTypeChange(index, "price", e.target.value)
                      }
                      className="border border-gray-300 rounded-lg px-2 py-1.5 text-sm w-24 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />

                    <input
                      type="number"
                      placeholder="Available Beds"
                      value={rt.availableBeds}
                      onChange={(e) =>
                        handleRoomTypeChange(
                          index,
                          "availableBeds",
                          e.target.value,
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
                      <img
                        src={rt.existingImage}
                        alt="current room"
                        className="h-12 w-12 object-cover rounded mb-1"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleRoomImageChange(index, e.target.files[0])
                      }
                      className="text-xs w-full file:bg-orange-50 file:text-orange-600 file:border-0 file:px-3 file:py-2 file:rounded-md hover:file:bg-orange-100"
                    />
                    {rt.imageFile && (
                      <p className="text-xs text-gray-500 mt-1">
                        {rt.imageFile.name}
                      </p>
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
              {submitting
                ? "Saving..."
                : isEditMode
                  ? "Update Hostel"
                  : "Save Hostel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HostelForm;
