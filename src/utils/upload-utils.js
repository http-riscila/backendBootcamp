import cloudinary from "../config/cloudinary.js";

/**
 * Faz upload de uma imagem para o Cloudinary
 * @param {Buffer} fileBuffer - Buffer da imagem
 * @param {string} folder - Pasta no Cloudinary onde salvar a imagem
 * @param {string} publicId - ID público da imagem (opcional)
 * @returns {Promise<string>} - URL da imagem no Cloudinary
 */
async function uploadImage(fileBuffer, folder, publicId = null) {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder: folder,
      resource_type: "image",
      format: "jpg",
      quality: "auto:good",
      width: 500,
      height: 500,
      crop: "fill",
    };

    if (publicId) {
      uploadOptions.public_id = publicId;
      uploadOptions.overwrite = true;
    }

    cloudinary.uploader
      .upload_stream(uploadOptions, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      })
      .end(fileBuffer);
  });
}

async function deleteImage(imageUrl) {
  if (!imageUrl) return;

  try {
    const urlParts = imageUrl.split("/");
    const lastPart = urlParts[urlParts.length - 1];
    const publicId = lastPart.split(".")[0];

    const folderIndex = urlParts.findIndex((part) => part === "upload") + 2;
    const fullPublicId =
      urlParts.slice(folderIndex, -1).join("/") + "/" + publicId;

    await cloudinary.uploader.destroy(fullPublicId);
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
  }
}

export { uploadImage, deleteImage };
