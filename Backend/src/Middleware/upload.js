import multer from "multer";
import path from "path";

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images"); // folder to save images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique name
  }
});

// Filter only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("Only images allowed"), false);
};

const upload = multer({ storage, fileFilter });

export default upload;
