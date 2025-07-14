// services/bunnyCdnService.js
// import axios from "axios";

// BunnyCDN settings (ensure these are stored securely in env if needed)
// const BUNNY_STORAGE_ZONE = process.env.REACT_APP_BUNNY_STORAGE_ZONE //"your-storage-zone";
// const BUNNY_STORAGE_REGION = process.env.REACT_APP_BUNNY_STORAGE_REGION //"sg"; // e.g., "sg" or "ny"
// const BUNNY_STORAGE_API_KEY = process.env.REACT_APP_BUNNY_STORAGE_API_KEY //"your-storage-api-key"; // Only if uploading from frontend
// const BUNNY_PUBLIC_URL = `https://${BUNNY_STORAGE_ZONE}.b-cdn.net`;

// src/services/bunnyCdnService.js

import axios from "axios";

/**
 * Uploads an image to BunnyCDN and returns its public URL.
 * @param {File} file - The image file (from file input or drag-drop).
 * @param {string} fileName - Desired name for the file on BunnyCDN (must include extension, e.g., "instabot123.png").
 * @param {string} folder - Optional subfolder path (e.g., "instabots/")
 * @returns {Promise<string>} - Public URL of the uploaded image.
 */
export const uploadToBunnyCDN = async (file, fileName, folder = "") => {
  // console.log("Uploading to BunnyCDN:", { fileName, folder }  );

  const BUNNY_STORAGE_ZONE = process.env.REACT_APP_BUNNY_STORAGE_ZONE; // "your-storage-zone-name";
  const BUNNY_STORAGE_API_KEY = process.env.REACT_APP_BUNNY_STORAGE_API_KEY; // "your-storage-zone-access-key";
  const BUNNY_STORAGE_REGION = process.env.REACT_APP_BUNNY_STORAGE_REGION; // "de"; // or "ny", "la", "sg" depending on your Bunny zone
  const BUNNY_PULL_ZONE = process.env.REACT_APP_BUNNY_PULL_ZONE; //"your-pull-zone-name"; // used for public URL

  const BUNNY_UPLOAD_URL = `https://${BUNNY_STORAGE_REGION}.storage.bunnycdn.com/${BUNNY_STORAGE_ZONE}`;

  // console.log("BunnyCDN Upload URL:", BUNNY_UPLOAD_URL);
  // console.log("Bunny API Key:", BUNNY_STORAGE_API_KEY);

  try {
    const path = folder ? `${folder}/${fileName}` : fileName;
    const url = `${BUNNY_UPLOAD_URL}/${path}`;

    await axios.put(url, file, {
      headers: {
        AccessKey: BUNNY_STORAGE_API_KEY,
        "Content-Type": "application/octet-stream",
        // "Content-Type": file.type,
      },
    });

    // Construct the public URL
    // const publicUrl = `https://${BUNNY_PULL_ZONE}.b-cdn.net/${path}`;
    const publicUrl = `https://${BUNNY_PULL_ZONE}/${path}`;

    console.log("Image uploaded to BunnyCDN:", publicUrl);

    return publicUrl;
  } catch (error) {
    console.error("BunnyCDN upload failed:", error);
    throw new Error("Image upload to BunnyCDN failed.");
  }
};

export async function deleteFromBunnyCDN(fileName, folder = "instabots") {
  const BUNNY_STORAGE_ZONE = process.env.REACT_APP_BUNNY_STORAGE_ZONE;
  const BUNNY_STORAGE_API_KEY = process.env.REACT_APP_BUNNY_STORAGE_API_KEY;
  const BUNNY_STORAGE_REGION = process.env.REACT_APP_BUNNY_STORAGE_REGION;

  const deleteUrl = `https://${BUNNY_STORAGE_REGION}.storage.bunnycdn.com/${BUNNY_STORAGE_ZONE}/${folder}/${fileName}`;

  return axios.delete(deleteUrl, {
    headers: {
      AccessKey: BUNNY_STORAGE_API_KEY,
    },
  });
}

export function extractBunnyCDNPath(publicUrl) {
  try {
    const url = new URL(publicUrl);
    const pathParts = url.pathname.split('/').filter(Boolean); // Removes empty strings
    const fileName = pathParts.pop(); // Get the filename
    const folder = pathParts.join('/'); // Remaining is the folder path
    return { folder, fileName };
  } catch (err) {
    console.error("Invalid BunnyCDN URL:", publicUrl);
    return { folder: null, fileName: null };
  }
}
