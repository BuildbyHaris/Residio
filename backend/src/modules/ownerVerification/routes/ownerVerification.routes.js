import express from "express";

import {
    submitOwnerVerificationController,
} from "../controllers/ownerVerification.controller.js";


import { upload } from "../../../shared/media/upload.middleware.js";


import protect from "../../auth/middlewares/protect.middleware.js";


const router = express.Router();

router.post(
    "/submit",

    protect,

    upload.fields([
        {
            name: "cnicFront",
            maxCount: 1,
        },

        {
            name: "cnicBack",
            maxCount: 1,
        },

        {
            name: "selfie",
            maxCount: 1,
        },

        {
            name: "ownershipProof",
            maxCount: 1,
        },
    ]),

    submitOwnerVerificationController
);



export default router;