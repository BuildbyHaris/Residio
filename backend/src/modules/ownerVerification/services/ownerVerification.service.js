import mongoose from "mongoose";

import {
    uploadImage,
    uploadFile,
    deleteFile,
} from "../../../shared/media/cloudinary.service.js";

import {
    findUserById,
    updateUserById,
} from "../../auth/repositories/auth.repository.js";

import {
    createOwnerVerification,
    createOwnerProfile,
    findOwnerVerificationByUserId,
} from "../repositories/ownerVerification.repository.js";


/**
 * Upload Verification Documents
 */
const uploadVerificationDocuments = async (files) => {

    const uploadedFiles = {};


    // ==========================
    // CNIC Front
    // ==========================

    if (files.cnicFront?.[0]) {

        const result = await uploadImage(
            files.cnicFront[0].buffer,
            "residio/owner-verification/cnic"
        );

        uploadedFiles.cnicFront = {
            url: result.secure_url,
            publicId: result.public_id,
            resourceType: "image",
        };
    }


    // ==========================
    // CNIC Back
    // ==========================

    if (files.cnicBack?.[0]) {

        const result = await uploadImage(
            files.cnicBack[0].buffer,
            "residio/owner-verification/cnic"
        );

        uploadedFiles.cnicBack = {
            url: result.secure_url,
            publicId: result.public_id,
            resourceType: "image",
        };
    }


    // ==========================
    // Selfie
    // ==========================

    if (files.selfie?.[0]) {

        const result = await uploadImage(
            files.selfie[0].buffer,
            "residio/owner-verification/selfie"
        );

        uploadedFiles.selfieWithCnic = {
            url: result.secure_url,
            publicId: result.public_id,
            resourceType: "image",
        };
    }


    // ==========================
    // Ownership Proof
    // ==========================

    if (files.ownershipProof?.[0]) {

        const file = files.ownershipProof[0];

        const resourceType =
            file.mimetype === "application/pdf"
                ? "raw"
                : "image";


        const result = await uploadFile(
            file.buffer,
            "residio/owner-verification/proofs",
            resourceType
        );


        uploadedFiles.ownershipProof = {
            url: result.secure_url,
            publicId: result.public_id,
            resourceType,
        };
    }


    return uploadedFiles;
};




/**
 * Cleanup Uploaded Files
 */
const cleanupUploadedFiles = async (uploadedFiles) => {

    if (!uploadedFiles) return;


    const deletePromises = [];


    for (const file of Object.values(uploadedFiles)) {


        if (!file?.publicId) continue;


        deletePromises.push(
            deleteFile(
                file.publicId,
                file.resourceType || "image"
            )
        );
    }


    await Promise.allSettled(deletePromises);

};





/**
 * Submit Owner Verification Request
 */
export const submitOwnerVerification = async ({
    userId,
    formData,
    files,
}) => {


    const user = await findUserById(userId);


    if (!user) {
        throw new Error(
            "User not found."
        );
    }



    if (user.ownerStatus === "owner") {

        throw new Error(
            "You are already a verified owner."
        );

    }



    if (user.ownerStatus === "pending_owner") {

        throw new Error(
            "Your owner verification request is already under review."
        );

    }



    const existingVerification =
        await findOwnerVerificationByUserId(userId);



    if (
        existingVerification &&
        existingVerification.status === "pending"
    ) {

        throw new Error(
            "An owner verification request is already pending."
        );

    }




    // ================================
    // Validate Files
    // ================================


    if (
        !files ||
        !files.cnicFront ||
        !files.cnicBack ||
        !files.selfie ||
        !files.ownershipProof
    ) {

        throw new Error(
            "All verification documents are required."
        );

    }




    let uploadedFiles = {};

    const session =
        await mongoose.startSession();



    try {


        session.startTransaction();



        // =====================================
        // Upload Documents
        // =====================================

        uploadedFiles =
            await uploadVerificationDocuments(
                files
            );




        // =====================================
        // Create Owner Verification
        // =====================================


        const ownerVerification =
            await createOwnerVerification(
                {

                    user: user._id,

                    ...formData,


                    cnicFront:
                        uploadedFiles.cnicFront,


                    cnicBack:
                        uploadedFiles.cnicBack,


                    selfieWithCnic:
                        uploadedFiles.selfieWithCnic,


                    ownershipProof:
                        uploadedFiles.ownershipProof,


                    status: "pending",

                },

                session
            );





        // =====================================
        // Create Owner Profile
        // =====================================


        const ownerProfile =
            await createOwnerProfile(
                {

                    user: user._id,


                    businessName:
                        formData.businessName,


                    businessType:
                        formData.businessType,


                    province:
                        formData.province,


                    city:
                        formData.city,


                    address:
                        formData.address,


                    postalCode:
                        formData.postalCode,


                    experience:
                        formData.experience,


                    isVerified:false,

                },

                session
            );






        // =====================================
        // Update User
        // =====================================


        const updatedUser =
            await updateUserById(
                user._id,

                {

                    ownerStatus:
                        "pending_owner",


                    ownerVerification:
                        ownerVerification._id,


                    ownerProfile:
                        ownerProfile._id,


                    rejectionReason:"",


                    ownerApprovedAt:null,


                    ownerApprovedBy:null,

                },

                session
            );




        if(!updatedUser){

            throw new Error(
                "Failed to update user information."
            );

        }




        // =====================================
        // Commit Transaction
        // =====================================


        await session.commitTransaction();





        return {

            success:true,


            message:
            "Your owner verification request has been submitted successfully.",



            data:{

                ownerStatus:
                    updatedUser.ownerStatus,


                verificationId:
                    ownerVerification._id,


                ownerProfileId:
                    ownerProfile._id,

            },

        };



    } catch(error){


        await session.abortTransaction();



        await cleanupUploadedFiles(
            uploadedFiles
        );


        throw error;


    } finally {


        await session.endSession();

    }

};