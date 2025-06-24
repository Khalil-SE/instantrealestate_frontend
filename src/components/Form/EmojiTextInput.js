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
//       {label && <label className="label text-secondary">{label}</label>}

//       {/* Use flex to align input, left icon, and right emoji button */}
//       <div className="position-relative d-flex align-items-start">
//         {/* Left icon */}
//         <div className="position-absolute start-0 pt-2 ps-3">
//           <i className="ri-user-line fs-20 text-muted" />
//         </div>

//         {/* Input or Textarea */}
//         {type === "textarea" ? (
//           <Form.Control
//             as="textarea"
//             className="form-control ps-5 pe-5 text-dark"
//             rows={5}
//             ref={inputRef}
//             value={value}
//             onChange={(e) => onChange(e.target.value)}
//             placeholder={placeholder}
//             disabled={disabled}
//           />
//         ) : (
//           <Form.Control
//             type="text"
//             className="form-control ps-5 pe-5 text-dark h-55"
//             ref={inputRef}
//             value={value}
//             onChange={(e) => onChange(e.target.value)}
//             placeholder={placeholder}
//             disabled={disabled}
//           />
//         )}

//         {/* Emoji Button */}
//         <Button
//           onClick={() => setShowPicker(!showPicker)}
//           className="position-absolute end-0 pt-2 pe-3 bg-transparent border-0"
//         >
//           <FaRegSmile className="fs-24 text-primary" />
//         </Button>

//         {/* Emoji Picker */}
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
//       </div>
//     </Form.Group>
//   );
// };

// export default EmojiTextInput;


// components/Form/EmojiTextInput.js
import React, { useState, useRef } from "react";
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
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const inputRef = useRef(null);

  const handleEmojiSelect = (emoji) => {
    const cursorPos = inputRef.current.selectionStart;
    const newValue =
      value.slice(0, cursorPos) + emoji.native + value.slice(cursorPos);
    onChange(newValue);
    setShowPicker(false);

    setTimeout(() => {
      inputRef.current.focus();
      inputRef.current.selectionEnd = cursorPos + emoji.native.length;
    }, 0);
  };

  return (
    <Form.Group className="mb-4">
      <label className="label">
        <h6>{label}</h6>
        
        </label>
      <Form.Group className="position-relative">
        {type === "textarea" ? (
          <Form.Control
            as="textarea"
            // className="form-control ps-5 text-dark"
            className="form-control text-dark rounded-4 border-3"
            style={{ fontSize: "1rem" }}
            placeholder={placeholder}
            rows={4}
            ref={inputRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
          />
        ) : (
          <Form.Control
            type={type}
            // className="text-dark ps-5 h-55"
            className="text-dark h-55 rounded-4 border-3"
            style={{ fontSize: "1rem" }}
            ref={inputRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
          />
        )}
        {/* <i className="ri-user-line position-absolute top-0 start-0  fs-20 ps-20" style={{marginTop:'11px'}} /> */}
        <Button
          onClick={() => setShowPicker(!showPicker)}
          className="position-absolute top-0 end-0 translate-middle-y bg-transparent p-0 pe-3 border-0"
          style={{marginTop:'25px'}}
        >
          <FaRegSmile className="fs-24 position-relative top-1 text-primary" />
        </Button>
        {showPicker && (
          <div
            className="emoji-picker-dropdown"
            style={{
              position: "absolute",
              zIndex: 1000,
              top: "100%",
              right: 0,
            }}
          >
            <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="light" />
          </div>
        )}
      </Form.Group>
    </Form.Group>
  );
};

export default EmojiTextInput;










// import React, {useState, useRef} from "react";

// import Picker from "@emoji-mart/react";
// import data from "@emoji-mart/data";
// // import "./EmojiInput.css"; // optional for styling
// import { FaRegSmile } from "react-icons/fa";

// import { Form, Button } from "react-bootstrap";

// const EmojiTextInput = ({
//     type="text",
//     label="",
//   value,
//   onChange,
//   placeholder = "",
//   disabled = false,
  
// }) => {


//     const [showPicker, setShowPicker] = useState(false);
//       const inputRef = useRef(null);
    
//       const handleEmojiSelect = (emoji) => {
//         const cursorPos = inputRef.current.selectionStart;
//         const newValue =
//           value.slice(0, cursorPos) + emoji.native + value.slice(cursorPos);
//         onChange(newValue);
//         setShowPicker(false); // optionally close after selecting
//         setTimeout(() => {
//           inputRef.current.focus();
//           inputRef.current.selectionEnd = cursorPos + emoji.native.length;
//         }, 0);
//       };


//   return (
//    <Form.Group className="mb-4">
//           <label className="label text-secondary">{label}</label>

//           <Form.Group className="position-relative">
//             { type === "textarea" ? (
//                 <textarea
//                       className="form-control ps-5 text-dark"
//                       placeholder="Some demo text ... "
//                       cols="30"
//                       rows="5"
//                     ></textarea>
//             ):
//             <Form.Control
//               type={type}
//               className="text-dark ps-5 h-55"
//               ref={inputRef}
//                 value={value}
//                 onChange={(e) => onChange(e.target.value)}
//                 placeholder={placeholder}
//                 disabled={disabled}
//             />
//             }
//             <i className="ri-user-line position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i>
//             <Button
            
//             onClick={() => setShowPicker(!showPicker)}
//              className="position-absolute top-50 end-0 translate-middle-y bg-transparent p-0 pe-3 border-0">
//               {/* <i className="ri-search-line fs-24 position-relative top-1 text-primary"></i> */}
//                 <FaRegSmile className="fs-24 position-relative top-1 text-primary" />
//             </Button>

//             {showPicker && (
//                     <div className="emoji-picker-dropdown" style={{ position: "absolute", zIndex: 1000, top: "100%", right: 0 }}>
//                       <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="light" />
//                     </div>
//                   )}
//           </Form.Group>
//         </Form.Group>
//   );
// }

// export default EmojiTextInput;