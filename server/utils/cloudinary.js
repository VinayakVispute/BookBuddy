function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
  }
  
  async function uploadFileToCloudinary(file, folder, quality) {
    const options = { folder };
  
    if (quality) {
      options.quality = quality;
    }
  
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
  }
  
  module.exports = {
    uploadFileToCloudinary,
    isFileTypeSupported
  };
  