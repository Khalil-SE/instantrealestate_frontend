import React, { useState } from "react";
import { Spinner } from "react-bootstrap";

import { uploadUserPicture } from "../../services/userService"; // Adjust the import path as necessary
// import useToast from "../hook/useToast";

const ProfilePicture = ({ picture }) => {

    // const { triggerToast } = useToast();

  const [uploadingImage, setUploadingImage] = useState(false);
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const isValidType = ["image/jpeg", "image/png"].includes(file.type);
    if (!isValidType) {
      alert("Only JPG and PNG files are allowed.");
      
      return;
    }

    const formData = new FormData();
    formData.append("picture", file);

    setUploadingImage(true);
    try {
      await uploadUserPicture(formData);
    
    //   alert("Profile picture updated successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      
       alert("Image upload failed. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <div className="flex-shrink-0 position-relative">
      {uploadingImage && (
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "rgba(255,255,255,0.6)", zIndex: 1 }}
        >
          <Spinner animation="border" size="sm" variant="primary" />
        </div>
      )}
      <div>
        <img
          src={picture || "/images/user-68.jpg"}
          className="img-fluid rounded-circle border border-2 wh-160"
          style={{ objectFit: "cover" }}
          alt="user"
          width={160}
          height={160}
        />
        <div className="position-absolute bottom-0 end-0">
          <div className="product-upload">
            <label htmlFor="file-upload" className="file-upload mb-0">
              <i className="ri-image-add-line bg-primary bg-opacity-10 p-2 rounded-1 text-primary"></i>
            </label>
            <input id="file-upload" type="file" onChange={handleImageUpload} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePicture;
