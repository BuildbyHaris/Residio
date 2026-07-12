import fs from "fs";

import {
  uploadToCloudinary,
} from "../../../shared/services/cloudinary.service.js";

import {
  submitOwnerVerificationService,
  getMyVerificationService,
  updateOwnerVerificationService,
  getAllVerificationsService,
  approveVerificationService,
  rejectVerificationService,
} from "../services/ownerVerification.service.js";

/**
 * Submit Owner Verification
 */
export const submitOwnerVerification = async (req, res) => {
  try {
    if (
      !req.files?.cnicFrontImage ||
      !req.files?.cnicBackImage ||
      !req.files?.propertyProof ||
      !req.files?.selfieWithCnic
    ) {
      return res.status(400).json({
        success: false,
        message: "Please upload all required documents.",
      });
    }

    const cnicFront = await uploadToCloudinary(
      req.files.cnicFrontImage[0].path,
      "owner-verification"
    );

    const cnicBack = await uploadToCloudinary(
      req.files.cnicBackImage[0].path,
      "owner-verification"
    );

    const propertyProof = await uploadToCloudinary(
      req.files.propertyProof[0].path,
      "owner-verification"
    );

    const selfie = await uploadToCloudinary(
      req.files.selfieWithCnic[0].path,
      "owner-verification"
    );

    req.body.cnicFrontImage = cnicFront.secure_url;
    req.body.cnicBackImage = cnicBack.secure_url;
    req.body.propertyProof = propertyProof.secure_url;
    req.body.selfieWithCnic = selfie.secure_url;

    const verification = await submitOwnerVerificationService(
      req.user._id,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Owner verification submitted successfully.",
      data: verification,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });

  } finally {
    try{
    if (req.files?.cnicFrontImage?.[0]) {
      fs.unlinkSync(req.files.cnicFrontImage[0].path);
    }

    if (req.files?.cnicBackImage?.[0]) {
      fs.unlinkSync(req.files.cnicBackImage[0].path);
    }

    if (req.files?.propertyProof?.[0]) {
      fs.unlinkSync(req.files.propertyProof[0].path);
    }

    if (req.files?.selfieWithCnic?.[0]) {
      fs.unlinkSync(req.files.selfieWithCnic[0].path);
    }
  } catch (error) {
    console.error("Error deleting temporary files:", error.message);
  }
}
};
/**
 * Get Logged-in User Verification
 */
export const getMyVerification = async (req, res) => {
  try {
    const verification = await getMyVerificationService(req.user._id);

    return res.status(200).json({
      success: true,
      data: verification,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Update Owner Verification
 */
export const updateOwnerVerification = async (req, res) => {
  try {
    const verification = await updateOwnerVerificationService(
      req.user._id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Owner verification updated successfully.",
      data: verification,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get All Verification Requests
 */
export const getAllVerifications = async (req, res) => {
  try {
    const verifications = await getAllVerificationsService();

    return res.status(200).json({
      success: true,
      data: verifications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Approve Verification
 */
export const approveVerification = async (req, res) => {
  try {
    await approveVerificationService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Owner verification approved successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Reject Verification
 */
export const rejectVerification = async (req, res) => {
  try {
    const { adminRemark } = req.body;

    await rejectVerificationService(
      req.params.id,
      adminRemark
    );

    return res.status(200).json({
      success: true,
      message: "Owner verification rejected successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};