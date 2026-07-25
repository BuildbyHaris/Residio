import { submitOwnerVerification } from "../services/ownerVerification.service.js";

/**
 * Submit Owner Verification Request
 */
export const submitOwnerVerificationController = async (
    req,
    res,
    next
) => {
    try {
        const result = await submitOwnerVerification({
            userId: req.user._id,
            formData: req.body,
            files: req.files,
        });

        return res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};