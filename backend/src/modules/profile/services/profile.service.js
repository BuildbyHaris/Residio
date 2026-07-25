import {
    findProfileById,
    updateProfileById,
} from "../repositories/profile.repository.js";

import {
    uploadImage,
    deleteImage,
} from "../../../shared/media/cloudinary.service.js";

export const getProfile = async (userId) => {
    const user = await findProfileById(userId);

    if (!user) {
        throw new Error("User not found.");
    }

    return user;
};

export const updateProfile = async (
    userId,
    profileData,
    file
) => {

    // Find existing user
    const user = await findProfileById(userId);

    if (!user) {
        throw new Error("User not found.");
    }

    // Build update object
    const updateData = {};

    if (profileData.name !== undefined)
        updateData.name = profileData.name.trim();

    if (profileData.phone !== undefined)
        updateData.phone = profileData.phone.trim();

    if (profileData.bio !== undefined)
        updateData.bio = profileData.bio.trim();

    if (profileData.gender !== undefined)
        updateData.gender = profileData.gender;

    if (profileData.dateOfBirth !== undefined)
        updateData.dateOfBirth = profileData.dateOfBirth;


    // Handle profile image
    if (file) {

        // Delete old image
        if (user.profileImage?.publicId) {
            await deleteImage(
                user.profileImage.publicId
            );
        }

        // Upload new image
        const uploadedImage =
            await uploadImage(
                file.buffer,
                "residio/profile-images"
            );

        updateData.profileImage = {
            url: uploadedImage.secure_url,
            publicId: uploadedImage.public_id,
        };

    }

    if (Object.keys(updateData).length === 0) {
        throw new Error("No data provided to update.");
    }

    return await updateProfileById(
        userId,
        updateData
    );
};