const multer = require('multer');

/**
 * Storage Configuration
 * Use Memory Storage for Serverless environments (like Vercel).
 */
const storage = multer.memoryStorage();

/**
 * File Filter to validate MIME types
 */
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const mimetype = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(file.originalname.toLowerCase()); // Simple check

  if (mimetype || extname) { // More permissive for serverless
    return cb(null, true);
  }
  cb(new Error('Solo se permiten imágenes (jpg, jpeg, png, webp)'));
};

/**
 * Multer Upload Instance
 */
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

module.exports = upload;
