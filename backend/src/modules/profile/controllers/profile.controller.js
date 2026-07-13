import {
    getProfile,
    updateProfile,
} from "../services/profile.service.js";
import { profileDTO } from "../dto/profile.dto.js";

export const getProfileController = async (
    req,
    res,
    next
) => {
    try {
        const profile = await getProfile(req.user._id);

        return res.status(200).json({
            success: true,
            data: profileDTO(profile),
        });
    } catch (error) {
        next(error);
    }
};

export const updateProfileController = async (
    req,
    res,
    next
) => {
    try {

        const updatedProfile = await updateProfile(
            req.user._id,
            req.body,
            req.file
        );

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            data: profileDTO(updatedProfile),
        });
    } catch (error) {
        next(error);
    }
};