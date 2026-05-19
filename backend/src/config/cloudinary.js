const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Upload a local file to Cloudinary
 * @param {string} localFilePath - Path to the local file
 * @param {string} folder - Cloudinary folder name
 * @returns {Promise<Object>} - Cloudinary upload result
 */
const uploadToCloudinary = async (localFilePath, folder = 'alquileres') => {
  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: folder,
      resource_type: 'auto'
    });
    
    // Remove local file after successful upload
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    
    return result;
  } catch (error) {
    console.error('[Cloudinary Upload Error]:', error);
    // Even if upload fails, we might want to keep the local file as fallback 
    // or delete it if we don't want to fill up disk space.
    // For now, we'll throw the error and let the caller decide.
    throw error;
  }
};

module.exports = {
  cloudinary,
  uploadToCloudinary
};
