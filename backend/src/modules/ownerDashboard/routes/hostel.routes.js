import express from "express";
import {
  createHostel,
  getMyHostels,
  updateHostel,
  deleteHostel,
  getAllActiveHostels,
  getHostelById,
} from "../controllers/hostel.controller.js";
import { protect, authorizeOwner } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

// Public route — User Dashboard listing

router.post(
  "/",
  (req, res, next) => {
    console.log("✅ Hostel POST route reached");
    next();
  },
  protect,
  authorizeOwner,
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "roomImages", maxCount: 10 },
  ]),
  createHostel
);
router.get("/", getAllActiveHostels);
router.get("/my-hostels", protect, authorizeOwner, getMyHostels);
router.get("/:id", getHostelById);
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