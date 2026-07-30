import multer from "multer";

const storage = multer.memoryStorage();

// Allow only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

// Single upload
export const singleUpload = upload.single("file");

// Multiple upload (Maximum 5 images)
export const multipleUpload = upload.array("files", 5);
