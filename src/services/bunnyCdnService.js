// services/bunnyCdnService.js
import axios from "axios";

// BunnyCDN settings (ensure these are stored securely in env if needed)
const BUNNY_STORAGE_ZONE = process.env.REACT_APP_BUNNY_STORAGE_ZONE //"your-storage-zone";
const BUNNY_STORAGE_REGION = process.env.REACT_APP_BUNNY_STORAGE_REGION //"sg"; // e.g., "sg" or "ny"
const BUNNY_STORAGE_API_KEY = process.env.REACT_APP_BUNNY_STORAGE_API_KEY //"your-storage-api-key"; // Only if uploading from frontend
const BUNNY_PUBLIC_URL = `https://${BUNNY_STORAGE_ZONE}.b-cdn.net`;

/**
 * Uploads an image to BunnyCDN using the instabot<ID>_<timestamp> format.
 * @param {File} file - The image file to upload
 * @param {number|string} instabotId - The ID of the saved instabot
 * @returns {Promise<string>} - Public URL of uploaded image
 */
export const uploadInstaBotImageToBunny = async (file, instabotId) => {
  const timestamp = Date.now();
  const extension = file.name.split('.').pop().toLowerCase();
  const safeExtension = extension === "jpg" || extension === "jpeg" || extension === "png" ? extension : "jpg";
  const filename = `instabot${instabotId}_${timestamp}.${safeExtension}`;
  const uploadUrl = `https://${BUNNY_STORAGE_REGION}.storage.bunnycdn.com/${BUNNY_STORAGE_ZONE}/${filename}`;

  const response = await axios.put(uploadUrl, file, {
    headers: {
      AccessKey: BUNNY_STORAGE_API_KEY,
      "Content-Type": file.type,
    },
  });

  if (response.status === 201) {
    return `${BUNNY_PUBLIC_URL}/${filename}`;
  } else {
    throw new Error("Failed to upload image to BunnyCDN");
  }
};
