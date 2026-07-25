import multer from "multer";

// Memory storage — file buffer me hi rahegi, disk par save nahi hogi
const storage = multer.memoryStorage();

// Sirf images allow karna — security ke liye zaroori
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per file limit
});

export default upload;