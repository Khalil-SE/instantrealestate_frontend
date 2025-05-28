// ImageUploader.js
import React from "react";

const ImageUploader = ({ setImage, disabled = false }) => {
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      
      
    }
  };
  return (
    <div className="form-group mb-4">
      <label className="label text-secondary">Image Upload</label>
      <div className="form-control h-100 text-center position-relative p-4 p-lg-5">
        <div className="product-upload">
          <label htmlFor="file-upload" className="file-upload mb-0">
            <i className="ri-folder-image-line bg-primary bg-opacity-10 p-2 rounded-1 text-primary"></i>
            <span className="d-block text-body fs-14">
              Drag and drop an image or{" "}
              <span className="text-primary text-decoration-underline">Browse</span>
            </span>
          </label>
          <input
            id="file-upload"
            type="file"
            disabled={disabled}
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;


// import React from "react";

// const ImageUploader = ({ onChange, disabled = false }) => {
//   return (
//     <div className="form-group mb-4">
//       <label className="label text-secondary">Image Upload</label>
//       <div className="form-control h-100 text-center position-relative p-4 p-lg-5">
//         <div className="product-upload">
//           <label htmlFor="file-upload" className="file-upload mb-0">
//             <i className="ri-folder-image-line bg-primary bg-opacity-10 p-2 rounded-1 text-primary"></i>
//             <span className="d-block text-body fs-14">
//               Drag and drop an image or{" "}
//               <span className="text-primary text-decoration-underline">
//                 Browse
//               </span>
//             </span>
//           </label>
//           <input
//             id="file-upload"
//             type="file"
//             disabled={disabled}
//             accept="image/*"
//             onChange={(e) => onChange(e.target.files[0])}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImageUploader;
