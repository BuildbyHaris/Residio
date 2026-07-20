import express from "express";
import {
  createHostel,
  getMyHostels,
  updateHostel,
  deleteHostel,
  getAllActiveHostels,
} from "../controllers/hostel.controller.js";
import { protect, authorizeOwner } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

// Public route — User Dashboard listing
router.get("/", getAllActiveHostels);

router.post(
  "/",
  protect,
  authorizeOwner,
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "roomImages", maxCount: 10 },
  ]),
  createHostel
);

router.get("/my-hostels", protect, authorizeOwner, getMyHostels);

router.put(
  "/:id",
  protect,
  authorizeOwner,
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "roomImages", maxCount: 10 },
  ]),
  updateHostel
);

router.delete("/:id", protect, authorizeOwner, deleteHostel);

export default router;