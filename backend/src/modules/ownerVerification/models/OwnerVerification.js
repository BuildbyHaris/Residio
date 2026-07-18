import mongoose from "mongoose";

const ownerVerificationSchema = new mongoose.Schema(
    {
        // ==========================================
        // User Reference
        // ==========================================

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        // ==========================================
        // Personal Information
        // ==========================================

        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        cnic: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        gender: {
            type: String,
            enum: ["male", "female", "other"],
            required: true,
        },

        dateOfBirth: {
            type: Date,
            required: true,
        },

        // ==========================================
        // Address
        // ==========================================

        province: {
            type: String,
            required: true,
            trim: true,
        },

        city: {
            type: String,
            required: true,
            trim: true,
        },

        address: {
            type: String,
            required: true,
            trim: true,
        },

        postalCode: {
            type: String,
            default: "",
        },

        // ==========================================
        // Business Information
        // ==========================================

        businessName: {
            type: String,
            default: "",
            trim: true,
        },

        businessType: {
            type: String,
            enum: ["individual", "company"],
            default: "individual",
        },

        experience: {
            type: Number,
            default: 0,
        },

        // ==========================================
        // Verification Documents
        // ==========================================

        cnicFront: {
            url: {
                type: String,
                required: true,
            },
            publicId: {
                type: String,
                required: true,
            },
        },

        cnicBack: {
            url: {
                type: String,
                required: true,
            },
            publicId: {
                type: String,
                required: true,
            },
        },

        selfieWithCnic: {
            url: {
                type: String,
                required: true,
            },
            publicId: {
                type: String,
                required: true,
            },
        },

        ownershipProof: {
            url: {
                type: String,
                required: true,
            },
            publicId: {
                type: String,
                required: true,
            },
        },

        isAgreementAccepted: {
            type: Boolean,
            required: true,
            default: false,
        },

        // ==========================================
        // Verification Status
        // ==========================================

        status: {
            type: String,
            enum: [
                "pending",
                "approved",
                "rejected",
            ],
            default: "pending",
        },

        rejectionReason: {
            type: String,
            default: "",
        },

        // ==========================================
        // Admin (Future)
        // ==========================================

        reviewedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        reviewedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const OwnerVerification = mongoose.model(
    "OwnerVerification",
    ownerVerificationSchema
);

export default OwnerVerification;