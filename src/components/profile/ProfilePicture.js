import React from "react";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
// import {
//   uploadToBunnyCDN,
//   deleteFromBunnyCDN,
//   extractBunnyCDNPath,
// } from "../../services/bunnyCdnService"; // Adjust the import path as necessary
// import { updateUserMe } from "../../services/userService"; // Adjust the import path as necessary
// import useAuth from "../../store/useAuth";
// import { uploadUserPicture } from "../../services/userService"; // Adjust the import path as necessary
// import useToast from "../hook/useToast";

const ProfilePicture = ({ image = null, disabled = false, isLoading = false, setImage = () => {} }) => {
  // const { triggerToast } = useToast();
  // const user = useAuth((state) => state.user);

  // const [uploadingImage, setUploadingImage] = useState(false);
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const isValidType = ["image/jpeg", "image/png"].includes(file.type);
    if (!isValidType) {
      toast.error("Only JPG and PNG files are allowed.");
      // alert("Only JPG and PNG files are allowed.");
      return;
    }

    setImage(file);

    // const extension = file.name.split(".").pop().toLowerCase();
    // const fileName = `user-profile.${extension}`;

    // setUploadingImage(true);

    // try {
    //   // Optional: delete old image if present
    //   if (picture) {
    //     const { folder, fileName: oldFile } = extractBunnyCDNPath(picture);
    //     if (folder && oldFile && oldFile !== fileName) {
    //       await deleteFromBunnyCDN(oldFile, folder);
    //     }
    //   }

    //   // Upload new image
    //   const imageUrl = await uploadToBunnyCDN(file, fileName, "users");

    //   // Update backend
    //   const updatedUser = await updateUserMe({ picture: imageUrl });

    //   toast.success("Profile picture updated!");
    // } catch (error) {
    //   console.error("Image upload failed:", error);
    //   toast.error("Failed to update profile picture.");
    // } finally {
    //   setUploadingImage(false);
    // }
  };

  // const handleImageUpload = async (event) => {
  //   const file = event.target.files[0];
  //   if (!file) return;

  //   const isValidType = ["image/jpeg", "image/png"].includes(file.type);
  //   if (!isValidType) {
  //     alert("Only JPG and PNG files are allowed.");

  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("picture", file);

  //   setUploadingImage(true);
  //   try {
  //     await uploadUserPicture(formData);

  //     //   alert("Profile picture updated successfully!");
  //   } catch (error) {
  //     console.error("Upload failed:", error);

  //     alert("Image upload failed. Please try again.");
  //   } finally {
  //     setUploadingImage(false);
  //   }
  // };

  console.log(image, "image in profile picture");
  

  return (
    <div className="flex-shrink-0 position-relative">
      {isLoading && (
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "rgba(255,255,255,0.6)", zIndex: 1 }}
        >
          <Spinner animation="border" size="sm" variant="primary" />
        </div>
      )}
      <div>
        {image ? (
          <img
            // src={picture || "/images/custom/robot_profile_pic_m.jpeg"}
            src={typeof image === "string" ? image : URL.createObjectURL(image)}
            className="img-fluid rounded-circle border border-2 wh-160"
            style={{ objectFit: "cover" }}
            alt="user"
            width={160}
            height={160}
          />
          
        ) : (
          <img
            src={ "/images/custom/robot_profile_pic_m.jpeg"}
            className="img-fluid rounded-circle border border-2 wh-160"
            style={{ objectFit: "cover" }}
            alt="user"
            width={160}
            height={160}
          />
        )}

        {disabled || (
          <div className="position-absolute bottom-0 end-0">
            <div className="product-upload">
              <label htmlFor="file-upload" className="file-upload mb-0">
                {/* <i className="ri-image-add-line bg-primary bg-opacity-10 p-2 rounded-1 text-primary"></i> */}
                <i className="ri-camera-line fs-18 bg-primary bg-opacity-10 p-2 rounded-1 text-primary"></i>
              </label>
              <input
                id="file-upload"
                type="file"
                onChange={handleImageUpload}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProfilePicture;
