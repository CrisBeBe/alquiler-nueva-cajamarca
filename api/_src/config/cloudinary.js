const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Upload a file (path or buffer) to Cloudinary
 * @param {string|Buffer} fileSource - Path to the local file or a Buffer
 * @param {string} folder - Cloudinary folder name
 * @returns {Promise<Object>} - Cloudinary upload result
 */
const uploadToCloudinary = async (fileSource, folder = 'alquileres') => {
  return new Promise((resolve, reject) => {
    const options = {
      folder: folder,
      resource_type: 'auto'
    };

    if (Buffer.isBuffer(fileSource)) {
      // If it's a buffer (for Vercel/MemoryStorage)
      const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      uploadStream.end(fileSource);
    } else {
      // If it's a file path
      cloudinary.uploader.upload(fileSource, options)
        .then(result => resolve(result))
        .catch(error => reject(error));
    }
  });
};

module.exports = {
  cloudinary,
  uploadToCloudinary
};
