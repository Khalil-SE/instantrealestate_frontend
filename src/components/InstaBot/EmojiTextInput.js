import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { FaRegSmile } from "react-icons/fa";
import { Form, Button } from "react-bootstrap";

const EmojiTextInput = ({
  type = "text",
  label = "",
  value = "",
  onChange = () => {},
  placeholder = "",
  disabled = false,
  error = null,
  maxLength = null,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 0 });

  const inputRef = useRef(null);
  const emojiButtonRef = useRef(null);
  const pickerRef = useRef(null);

  // Handle emoji select
  const handleEmojiSelect = (emoji) => {
    const cursorPos = inputRef.current.selectionStart;
    const newValue =
      value.slice(0, cursorPos) + emoji.native + value.slice(cursorPos);

    if (!maxLength || newValue.length <= maxLength) {
      onChange(newValue);
      setShowPicker(false);
      setTimeout(() => {
        inputRef.current.focus();
        inputRef.current.selectionEnd = cursorPos + emoji.native.length;
      }, 0);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    if (!maxLength || newValue.length <= maxLength) {
      onChange(newValue);
    }
  };

  // Set picker position
  useEffect(() => {
    if (showPicker && emojiButtonRef.current) {
      const rect = emojiButtonRef.current.getBoundingClientRect();
      setPickerPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [showPicker]);

  // Close on outside click
  const handleClickOutside = useCallback(
    (e) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(e.target) &&
        !emojiButtonRef.current.contains(e.target)
      ) {
        setShowPicker(false);
      }
    },
    []
  );

  // Close on Escape key
  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") {
      setShowPicker(false);
    }
  }, []);

  useEffect(() => {
    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showPicker, handleClickOutside, handleKeyDown]);

  return (
    <Form.Group className="mb-4 position-relative">
      {label && (
        <Form.Label
          className="mb-2"
          style={{
            fontSize: "0.875rem",
            fontWeight: 500,
            display: "inline-block",
            background: "linear-gradient(to right, #4f46e5, #9333ea)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {label}
        </Form.Label>
      )}

      <div className="position-relative">
        {type === "textarea" ? (
          <Form.Control
            as="textarea"
            rows={4}
            ref={inputRef}
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`rounded-3 border-3 ps-3 pe-5 text-dark ${error ? "is-invalid" : ""}`}
            style={{
              backgroundColor: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(4px)",
              transition: "background-color 0.2s",
            }}
          />
        ) : (
          <Form.Control
            type="text"
            ref={inputRef}
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`h-55 rounded-3 border-3 ps-3 pe-5 text-dark ${error ? "is-invalid" : ""}`}
            style={{
              backgroundColor: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(4px)",
              transition: "background-color 0.2s",
            }}
          />
        )}

        {/* Emoji toggle button */}
        <Button
          ref={emojiButtonRef}
          type="button"
          onClick={() => setShowPicker(!showPicker)}
          className={`position-absolute end-0 bg-transparent border-0 p-0 pe-3 ${
            type === "textarea" ? "bottom-0 mb-2" : "top-50 translate-middle-y"
          }`}
        >
          <FaRegSmile className="fs-4 text-primary" />
        </Button>

        {/* Emoji Picker in Portal */}
        {showPicker &&
          createPortal(
            <div
              ref={pickerRef}
              style={{
                position: "absolute",
                top: pickerPosition.top,
                left: pickerPosition.left,
                zIndex: 9999,
              }}
            >
              <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="light" />
            </div>,
            document.body
          )}
      </div>

      {/* Character counter */}
      {maxLength && (
        <div
          className="position-absolute text-muted small pe-3"
          style={{
            fontSize: "0.75rem",
            bottom: type === "textarea" ? "0" : "-1.25rem",
            right: 0,
          }}
        >
          {value.length} / {maxLength}
        </div>
      )}

      {error && <div className="text-danger small mt-1">{error}</div>}
    </Form.Group>
  );
};

export default EmojiTextInput;




// version 4
// import React, { useState, useRef, useEffect, useCallback } from "react";
// import { createPortal } from "react-dom";
// import Picker from "@emoji-mart/react";
// import data from "@emoji-mart/data";
// import { FaRegSmile } from "react-icons/fa";
// import { Form, Button } from "react-bootstrap";

// const EmojiTextInput = ({
//   type = "text",
//   label = "",
//   value = "",
//   onChange = () => {},
//   placeholder = "",
//   disabled = false,
//   error = null,
//   maxLength = null,
// }) => {
//   const [showPicker, setShowPicker] = useState(false);
//   const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 0 });

//   const inputRef = useRef(null);
//   const emojiButtonRef = useRef(null);
//   const pickerRef = useRef(null);

//   // Handle emoji select
//   const handleEmojiSelect = (emoji) => {
//     const cursorPos = inputRef.current.selectionStart;
//     const newValue =
//       value.slice(0, cursorPos) + emoji.native + value.slice(cursorPos);

//     if (!maxLength || newValue.length <= maxLength) {
//       onChange(newValue);
//       setShowPicker(false);
//       setTimeout(() => {
//         inputRef.current.focus();
//         inputRef.current.selectionEnd = cursorPos + emoji.native.length;
//       }, 0);
//     }
//   };

//   // Handle text input change
//   const handleInputChange = (e) => {
//     const newValue = e.target.value;
//     if (!maxLength || newValue.length <= maxLength) {
//       onChange(newValue);
//     }
//   };

//   // Set picker position when opened
//   useEffect(() => {
//     if (showPicker && emojiButtonRef.current) {
//       const rect = emojiButtonRef.current.getBoundingClientRect();
//       setPickerPosition({
//         top: rect.bottom + window.scrollY,
//         left: rect.left + window.scrollX,
//       });
//     }
//   }, [showPicker]);

//   // Close on outside click
//   const handleClickOutside = useCallback(
//     (e) => {
//       if (
//         pickerRef.current &&
//         !pickerRef.current.contains(e.target) &&
//         !emojiButtonRef.current.contains(e.target)
//       ) {
//         setShowPicker(false);
//       }
//     },
//     [pickerRef, emojiButtonRef]
//   );

//   // Close on Escape key
//   const handleKeyDown = useCallback(
//     (e) => {
//       if (e.key === "Escape") {
//         setShowPicker(false);
//       }
//     },
//     []
//   );

//   useEffect(() => {
//     if (showPicker) {
//       document.addEventListener("mousedown", handleClickOutside);
//       document.addEventListener("keydown", handleKeyDown);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.removeEventListener("keydown", handleKeyDown);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       document.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [showPicker, handleClickOutside, handleKeyDown]);

//   return (
//     <Form.Group className="mb-4">
//       {label && (
//         <Form.Label
//           className="mb-2"
//           style={{
//             fontSize: "0.875rem",
//             fontWeight: 500,
//             display: "inline-block",
//             background: "linear-gradient(to right, #4f46e5, #9333ea)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//           }}
//         >
//           {label}
//         </Form.Label>
//       )}

//       <div className="position-relative">
//         {type === "textarea" ? (
//           <Form.Control
//             as="textarea"
//             rows={4}
//             ref={inputRef}
//             value={value}
//             onChange={handleInputChange}
//             placeholder={placeholder}
//             disabled={disabled}
//             className={`rounded-3 border-3 ps-3 pe-5 text-dark}`}
//             // className={`rounded-3 border-3 ps-3 pe-5 text-dark ${
//             //   error ? "is-invalid" : ""
//             // }`}
//             style={{
//               backgroundColor: "rgba(255,255,255,0.6)",
//               backdropFilter: "blur(4px)",
//               transition: "background-color 0.2s",
//             }}
//           />
//         ) : (
//           <Form.Control
//             type="text"
//             ref={inputRef}
//             value={value}
//             onChange={handleInputChange}
//             placeholder={placeholder}
//             disabled={disabled}
//             className={`h-55 rounded-3 border-3 ps-3 pe-5 text-dark}`}
//             // className={`h-55 rounded-3 border-3 ps-3 pe-5 text-dark ${
//             //   error ? "is-invalid" : ""
//             // }`}
//             style={{
//               backgroundColor: "rgba(255,255,255,0.6)",
//               backdropFilter: "blur(4px)",
//               transition: "background-color 0.2s",
//             }}
//           />
//         )}

//         {/* Emoji toggle button */}
//         <Button
//           ref={emojiButtonRef}
//           type="button"
//           onClick={() => setShowPicker(!showPicker)}
//           className={`position-absolute end-0 bg-transparent border-0 p-0 pe-3 ${
//             type === "textarea" ? "bottom-0 mb-2" : "top-50 translate-middle-y"
//           }`}
//         >
//           <FaRegSmile className="fs-4 text-primary" />
//         </Button>

//         {/* Emoji Picker via Portal */}
//         {showPicker &&
//           createPortal(
//             <div
//               ref={pickerRef}
//               style={{
//                 position: "absolute",
//                 top: pickerPosition.top,
//                 left: pickerPosition.left,
//                 zIndex: 9999,
//               }}
//             >
//               <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="light" />
//             </div>,
//             document.body
//           )}
//       </div>

//       {/* Character counter */}
//       {maxLength && (
//         <div
//           className="position-absolute bottom-0 end-0 text-muted small pe-3 pb-1"
//           style={{ fontSize: "0.75rem" }}
//         >
//           {value.length} / {maxLength}
//         </div>
//       )}

//       {error && <div className="text-danger small mt-1">{error}</div>}
//     </Form.Group>
//   );
// };

// export default EmojiTextInput;



// version 3
// import React, { useState, useRef, useEffect } from "react";
// import { createPortal } from "react-dom";
// import Picker from "@emoji-mart/react";
// import data from "@emoji-mart/data";
// import { FaRegSmile } from "react-icons/fa";
// import { Form, Button } from "react-bootstrap";

// const EmojiTextInput = ({
//   type = "text",
//   label = "",
//   value = "",
//   onChange = () => {},
//   placeholder = "",
//   disabled = false,
//   error = null,
//   maxLength = null,
// }) => {
//   const [showPicker, setShowPicker] = useState(false);
//   const inputRef = useRef(null);
//   const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 0 });

//   const emojiButtonRef = useRef(null);

//   const handleEmojiSelect = (emoji) => {
//     const cursorPos = inputRef.current.selectionStart;
//     const newValue =
//       value.slice(0, cursorPos) + emoji.native + value.slice(cursorPos);

//     if (!maxLength || newValue.length <= maxLength) {
//       onChange(newValue);
//       setShowPicker(false);

//       setTimeout(() => {
//         inputRef.current.focus();
//         inputRef.current.selectionEnd = cursorPos + emoji.native.length;
//       }, 0);
//     }
//   };

//   const handleInputChange = (e) => {
//     const newValue = e.target.value;
//     if (!maxLength || newValue.length <= maxLength) {
//       onChange(newValue);
//     }
//   };

//   useEffect(() => {
//     if (showPicker && emojiButtonRef.current) {
//       const rect = emojiButtonRef.current.getBoundingClientRect();
//       setPickerPosition({
//         top: rect.bottom + window.scrollY,
//         left: rect.left + window.scrollX,
//       });
//     }
//   }, [showPicker]);

//   return (
//     <Form.Group className="mb-4">
//       {label && (
//         <Form.Label
//           style={{
//             fontSize: "0.875rem",
//             fontWeight: 500,
//             display: "inline-block",
//             background: "linear-gradient(to right, #4f46e5, #9333ea)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//           }}
//           className="mb-2"
//         >
//           {label}
//         </Form.Label>
//       )}

//       <div className="position-relative">
//         {type === "textarea" ? (
//           <Form.Control
//             as="textarea"
//             rows={4}
//             ref={inputRef}
//             value={value}
//             onChange={handleInputChange}
//             placeholder={placeholder}
//             disabled={disabled}
//             className={`rounded-3 border-3 ps-3 pe-5 text-dark ${
//               error ? "is-invalid" : ""
//             }`}
//             style={{
//               backgroundColor: "rgba(255,255,255,0.6)",
//               backdropFilter: "blur(4px)",
//               transition: "background-color 0.2s",
//             }}
//           />
//         ) : (
//           <Form.Control
//             type="text"
//             ref={inputRef}
//             value={value}
//             onChange={handleInputChange}
//             placeholder={placeholder}
//             disabled={disabled}
//             className={`h-55 rounded-3 border-3 ps-3 pe-5 text-dark ${
//               error ? "is-invalid" : ""
//             }`}
//             style={{
//               backgroundColor: "rgba(255,255,255,0.6)",
//               backdropFilter: "blur(4px)",
//               transition: "background-color 0.2s",
//             }}
//           />
//         )}

//         <Button
//           ref={emojiButtonRef}
//           type="button"
//           onClick={() => setShowPicker(!showPicker)}
//           className={`position-absolute end-0 bg-transparent border-0 p-0 pe-3 ${
//             type === "textarea" ? "bottom-0 mb-2" : "top-50 translate-middle-y"
//           }`}
//         >
//           <FaRegSmile className="fs-4 text-primary" />
//         </Button>

//         {/*  Portal-based emoji picker */}
//         {showPicker &&
//           createPortal(
//             <div
//               style={{
//                 position: "absolute",
//                 top: pickerPosition.top,
//                 left: pickerPosition.left,
//                 zIndex: 9999,
//               }}
//             >
//               <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="light" />
//             </div>,
//             document.body
//           )}
//       </div>

//       {maxLength && (
//         <div
//           className="position-absolute bottom-0 end-0 text-muted small pe-3 pb-1"
//           style={{ fontSize: "0.75rem" }}
//         >
//           {value.length} / {maxLength}
//         </div>
//       )}

//       {error && <div className="text-danger small mt-1">{error}</div>}
//     </Form.Group>
//   );
// };

// export default EmojiTextInput;



// version 2
// import React, { useState, useRef } from "react";
// import Picker from "@emoji-mart/react";
// import data from "@emoji-mart/data";
// import { FaRegSmile } from "react-icons/fa";
// import { Form, Button } from "react-bootstrap";

// const EmojiTextInput = ({
//   type = "text",
//   label = "",
//   value = "",
//   onChange = () => {},
//   placeholder = "",
//   disabled = false,
//   error = null,
//   maxLength = null, //  New
// }) => {
//   const [showPicker, setShowPicker] = useState(false);
//   const inputRef = useRef(null);

//   const handleEmojiSelect = (emoji) => {
//     const cursorPos = inputRef.current.selectionStart;
//     const newValue =
//       value.slice(0, cursorPos) + emoji.native + value.slice(cursorPos);

//     //  Prevent adding emoji if it exceeds maxLength
//     if (!maxLength || newValue.length <= maxLength) {
//       onChange(newValue);
//       setShowPicker(false);

//       setTimeout(() => {
//         inputRef.current.focus();
//         inputRef.current.selectionEnd = cursorPos + emoji.native.length;
//       }, 0);
//     }
//   };

//   const handleInputChange = (e) => {
//     const newValue = e.target.value;
//     if (!maxLength || newValue.length <= maxLength) {
//       onChange(newValue);
//     }
//   };

//   return (
//     <Form.Group className="mb-4">
//       {label && (
//         <Form.Label
//           style={{
//             fontSize: "0.875rem",
//             fontWeight: 500,
//             display: "inline-block",
//             background: "linear-gradient(to right, #4f46e5, #9333ea)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//           }}
//           className="mb-2"
//         >
//           {label}
//         </Form.Label>
//       )}

//       <div className="position-relative">
//         {type === "textarea" ? (
//           <Form.Control
//             as="textarea"
//             rows={4}
//             ref={inputRef}
//             value={value}
//             onChange={handleInputChange}
//             placeholder={placeholder}
//             disabled={disabled}
//             className={`rounded-3 border-3 ps-3 pe-5 text-dark ${
//               error ? "is-invalid" : ""
//             }`}
//             style={{
//               backgroundColor: "rgba(255,255,255,0.6)",
//               backdropFilter: "blur(4px)",
//               transition: "background-color 0.2s",
//             }}
//           />
//         ) : (
//           <Form.Control
//             type="text"
//             ref={inputRef}
//             value={value}
//             onChange={handleInputChange}
//             placeholder={placeholder}
//             disabled={disabled}
//             className={`h-55 rounded-3 border-3 ps-3 pe-5 text-dark ${
//               error ? "is-invalid" : ""
//             }`}
//             style={{
//               backgroundColor: "rgba(255,255,255,0.6)",
//               backdropFilter: "blur(4px)",
//               transition: "background-color 0.2s",
//             }}
//           />
//         )}

//         {/* Emoji Icon Button */}
//         <Button
//           type="button"
//           onClick={() => setShowPicker(!showPicker)}
//           className={`position-absolute end-0 bg-transparent border-0 p-0 pe-3 ${
//             type === "textarea" ? "bottom-0 mb-2" : "top-50 translate-middle-y"
//           }`}
//         >
//           <FaRegSmile className="fs-4 text-primary" />
//         </Button>

//         {/* Emoji Picker */}
//         {showPicker && (
//           <div
//             className="emoji-picker-dropdown"
//             style={{
//               position: "absolute",
//               zIndex: 2000,
//               top: "100%",
//               right: 0,
//             }}
//           >
//             <Picker
//               data={data}
//               onEmojiSelect={handleEmojiSelect}
//               theme="light"
//             />
//           </div>
//         )}
//       </div>
//       {/* Character Limit Display */}
//       {maxLength && (
//         <div
//           className="position-absolute bottom-0 end-0 text-muted small pe-3 pb-1"
//           style={{ fontSize: "0.75rem" }}
//         >
//           {value.length} / {maxLength}
//         </div>
//       )}

//       {error && <div className="text-danger small mt-1">{error}</div>}
//     </Form.Group>
//   );
// };

// export default EmojiTextInput;

// version 1

// // components/Form/EmojiTextInput.js
// import React, { useState, useRef } from "react";
// import Picker from "@emoji-mart/react";
// import data from "@emoji-mart/data";
// import { FaRegSmile } from "react-icons/fa";
// import { Form, Button } from "react-bootstrap";

// const EmojiTextInput = ({
//   type = "text",
//   label = "",
//   labelFontClass = null,
//   value = "",
//   onChange = () => {},
//   placeholder = "",
//   disabled = false,
// }) => {
//   const [showPicker, setShowPicker] = useState(false);
//   const inputRef = useRef(null);

//   const handleEmojiSelect = (emoji) => {
//     const cursorPos = inputRef.current.selectionStart;
//     const newValue =
//       value.slice(0, cursorPos) + emoji.native + value.slice(cursorPos);
//     onChange(newValue);
//     setShowPicker(false);

//     setTimeout(() => {
//       inputRef.current.focus();
//       inputRef.current.selectionEnd = cursorPos + emoji.native.length;
//     }, 0);
//   };

//   return (
//     <Form.Group className="mb-4">
//       <label className="label">
//         {labelFontClass ? (<p className={labelFontClass}>{label}</p>) : (<h6>{label}</h6>)}

//         </label>
//       <Form.Group className="position-relative">
//         {type === "textarea" ? (
//           <Form.Control
//             as="textarea"
//             // className="form-control ps-5 text-dark"
//             className="form-control text-dark rounded-4 border-3"
//             style={{ fontSize: "1rem" }}
//             placeholder={placeholder}
//             rows={4}
//             ref={inputRef}
//             value={value}
//             onChange={(e) => onChange(e.target.value)}
//             disabled={disabled}
//           />
//         ) : (
//           <Form.Control
//             type={type}
//             // className="text-dark ps-5 h-55"
//             className="text-dark h-55 rounded-4 border-3"
//             style={{ fontSize: "1rem" }}
//             ref={inputRef}
//             value={value}
//             onChange={(e) => onChange(e.target.value)}
//             placeholder={placeholder}
//             disabled={disabled}
//           />
//         )}
//         {/* <i className="ri-user-line position-absolute top-0 start-0  fs-20 ps-20" style={{marginTop:'11px'}} /> */}
//         <Button
//           onClick={() => setShowPicker(!showPicker)}
//           className="position-absolute bottom-0 end-0 translate-middle-y bg-transparent p-0 pe-3 border-0"
//            style={{marginBottom:'3px'}}
//         >
//           <FaRegSmile className="fs-24 position-relative top-1 text-primary" />
//         </Button>
//         {showPicker && (
//           <div
//             className="emoji-picker-dropdown"
//             style={{
//               position: "absolute",
//               zIndex: 1000,
//               top: "100%",
//               right: 0,
//             }}
//           >
//             <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="light" />
//           </div>
//         )}
//       </Form.Group>
//     </Form.Group>
//   );
// };

// export default EmojiTextInput;
