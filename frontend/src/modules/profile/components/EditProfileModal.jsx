import { useEffect, useRef, useState } from "react";
import { X, Camera } from "lucide-react";

import FormField from "./FormField";

import {
  getInitials,
} from "../utils/imageHelpers";

import {
  validateProfile,
  validateField,
} from "../validation/profile.validation";

function EditProfileModal({
  open,
  onClose,
  user,
  onSave,
}) {
  const fileInputRef = useRef(null);

  const [saving, setSaving] = useState(false);

  const [apiError, setApiError] = useState("");

  const [selectedImage, setSelectedImage] =
    useState(null);

  const [previewImage, setPreviewImage] =
    useState("");

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    gender: "",
    dateOfBirth: "",
  });

  /*
  ---------------------------------------
  Sync user data every time modal opens
  ---------------------------------------
  */

  useEffect(() => {
    if (!user || !open) return;

    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      bio: user.bio || "",
      gender: user.gender || "",
      dateOfBirth: user.dateOfBirth
        ? user.dateOfBirth.substring(0, 10)
        : "",
    });

    setPreviewImage(
      user.profileImage?.url || ""
    );

    setSelectedImage(null);

    setErrors({});

    setApiError("");
  }, [user, open]);

  useEffect(() => {
    return () => {
      if (previewImage?.startsWith("blob:")) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  /*
  ---------------------------------------
  Text Inputs
  ---------------------------------------
  */

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  }

  /*
  ---------------------------------------
  Blur Validation
  ---------------------------------------
  */

  function handleBlur(e) {
    const { name, value } = e.target;

    if (name === "email") return;

    const error = validateField(
      name,
      value
    );

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  }

  /*
  ---------------------------------------
  Select Image
  ---------------------------------------
  */

  function handleSelectImage() {
    fileInputRef.current.click();
  }

  /*
  ---------------------------------------
  Preview Image
  ---------------------------------------
  */

  function handleImageChange(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setApiError("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setApiError("Image must be smaller than 5MB.");
      return;
    }

    setApiError("");

    if (previewImage?.startsWith("blob:")) {
      URL.revokeObjectURL(previewImage);
    }

    const imageUrl = URL.createObjectURL(file);

    setSelectedImage(file);
    setPreviewImage(imageUrl);
  }

  /*
  ---------------------------------------
  Submit
  ---------------------------------------
  */

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("✅ Submit clicked");
     alert("Submit clicked");
    if (saving) return;

    const {
      isValid,
      errors: validationErrors,
    } = validateProfile(formData);

      console.log("2", isValid, validationErrors);

    if (!isValid) {
          console.log("3 Validation failed");
      setErrors(validationErrors);
      return;
    }

    try {
      console.log("🚀 Calling onSave...");

      setSaving(true);

      setApiError("");

      const payload =
        new FormData();

      payload.append(
        "name",
        formData.name
      );

      payload.append(
        "phone",
        formData.phone
      );

      payload.append(
        "bio",
        formData.bio
      );

      payload.append(
        "gender",
        formData.gender
      );

      payload.append(
        "dateOfBirth",
        formData.dateOfBirth
      );

      if (selectedImage) {
        payload.append(
          "profileImage",
          selectedImage
        );
      }
      console.log("Payload about to send:", payload);

      await onSave(payload);
      console.log("✅ onSave finished");
      setSelectedImage(null);
      setErrors({});
      setApiError("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      onClose();

    } catch (err) {
      setApiError(
        err?.response?.data?.message ||
        "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 mx-4 flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b px-8 py-6">
          <div>
            <h2 className="text-2xl font-bold">
              Edit Profile
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Keep your profile up to date.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto space-y-5 p-8"
        >
          {/* Avatar */}

          <div className="flex items-center gap-5">

            <div className="relative">

              <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-[#F5732C]/20 bg-gray-100">

                {previewImage ? (
                  <img
                    src={previewImage}
                    alt={formData.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[#FDEDE3] text-3xl font-bold text-[#F5732C]">
                    {getInitials(formData.name)}
                  </div>
                )}

              </div>

              <button
                type="button"
                onClick={handleSelectImage}
                className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-[#F5732C] text-white shadow-lg transition hover:scale-105"
              >
                <Camera size={17} />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                hidden
                accept=".jpg,.jpeg,.png,.webp"
                onChange={handleImageChange}
              />

            </div>

            <div>

              <h3 className="font-semibold">
                Profile Picture
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                JPG, PNG or WEBP

                <br />

                Maximum size 5 MB
              </p>

              <button
                type="button"
                onClick={handleSelectImage}
                className="mt-3 font-medium text-[#F5732C] hover:underline"
              >
                Change Photo
              </button>

            </div>

          </div>

          {/* Name */}

          <FormField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
            placeholder="Enter your name"
          />

          {/* Email */}

          <FormField
            label="Email"
            name="email"
            type="email"
            disabled
            value={formData.email}
          />

          {/* Phone */}

          <FormField
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.phone}
            placeholder="+92..."
          />

          {/* Bio */}

          <FormField
            label="Bio"
            type="textarea"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.bio}
            rows={4}
            maxLength={300}
            placeholder="Tell people something about yourself..."
          />

          {/* Gender */}

          <FormField
            label="Gender"
            type="select"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.gender}
            options={[
              {
                label: "Select Gender",
                value: "",
              },
              {
                label: "Male",
                value: "male",
              },
              {
                label: "Female",
                value: "female",
              },
              {
                label: "Other",
                value: "other",
              },
            ]}
          />

          {/* DOB */}

          <FormField
            label="Date of Birth"
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.dateOfBirth}
          />

          {/* Backend Error */}

          {apiError && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {apiError}
            </div>
          )}

          {/* Footer */}

          <div className="flex justify-end gap-3 border-t pt-6">

            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-xl border px-5 py-2.5 font-medium transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-[#F5732C] px-6 py-2.5 font-semibold text-white transition hover:bg-[#E96418] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Saving...
                </span>
              ) : (
                "Save Changes"
              )}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;