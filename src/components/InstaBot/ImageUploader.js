import React, { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";

const ImageUploader = ({ setImage, disabled = false }) => {
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef();

  const validateFile = (file) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      alert("Only JPG, JPEG, and PNG files are accepted.");
      return false;
    }
    return true;
  };

  const processFile = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
    setImage(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      processFile(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file && validateFile(file)) {
      processFile(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setImage(null);
  };

  const triggerFileDialog = () => {
    inputRef.current?.click();
  };

  return (
    <Form.Group className="mb-4">
      

      <div
        className={`border border-2 rounded-3 p-4 text-center bg-light position-relative ${
          dragActive ? "border-primary bg-white" : "border-secondary-subtle"
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        style={{ cursor: "pointer" }}
        onClick={triggerFileDialog}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png"
          disabled={disabled}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        {preview ? (
          <div className="position-relative">
            <img
              src={preview}
              alt="Preview"
              className="img-fluid rounded mb-2"
              style={{ maxHeight: "200px", objectFit: "contain" }}
            />
            <Button
              variant="outline-danger"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveImage();
              }}
              className="position-absolute top-0 end-0 m-2 px-2 py-1"
            >
              ✕
            </Button>
          </div>
        ) : (
          <div className="py-3">
            <i className="ri-folder-image-line fs-4 bg-primary bg-opacity-10 p-2 rounded-1 text-primary mb-2 d-inline-block"></i>
            <p className="mb-1 text-muted small">
              Drag & drop your image here, or click to browse
            </p>
            <p className="text-muted small mb-0">Supported: JPG, JPEG, PNG</p>
          </div>
        )}
      </div>
    </Form.Group>
  );
};

export default ImageUploader;



// version 1
// ImageUploader.js
// import React from "react";

// const ImageUploader = ({ setImage, disabled = false }) => {
//   const handleFileChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImage(file);
      
      
//     }
//   };
//   return (
//     <div className="form-group mb-4">
//       <label className="label">
//         <p className="fs-4">Image Upload</p></label>
//       <div className="form-control h-100 text-center position-relative p-4 p-lg-5 rounded-4 border-3">
//         <div className="product-upload">
//           <label htmlFor="file-upload" className="file-upload mb-0">
//             <i className="ri-folder-image-line fs-4 bg-primary bg-opacity-10 p-2 rounded-1 text-primary"></i>
//             <span className="d-block text-body fs-4">
//               Drag and drop an image or{" "}
//               <span className="text-primary text-decoration-underline">Browse</span>
//             </span>
//           </label>
//           <input
//             id="file-upload"
//             type="file"
//             disabled={disabled}
//             accept="image/*"
//             onChange={handleFileChange}
//             style={{ display: "none" }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImageUploader;


