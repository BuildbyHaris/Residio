import multer from "multer";

// Store files in memory (RAM)
const storage = multer.memoryStorage();

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

// Allow only supported file types
const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    return cb(null, true);
  }

  cb(
    new Error(
      "Only JPG, PNG, WEBP and PDF files are allowed."
    ),
    false
  );
};

// Reusable upload middleware
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});