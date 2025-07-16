import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file. Only images are allowed. Please upload an image file."
      ),
      false
    );
  }
};

const limits = {
  fileSize: 5 * 1024 * 1024, // Maximum file size of 5MB
};

const upload = multer({
  storage,
  fileFilter,
  limits,
}).single("communityImage");

const communityImageUploadMiddleware = (req, res, next) => {
  upload(req, res, (error) => {
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    next();
  });
};

export default communityImageUploadMiddleware;
