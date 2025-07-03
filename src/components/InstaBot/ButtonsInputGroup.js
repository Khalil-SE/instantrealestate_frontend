import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import EmojiTextInput from "./EmojiTextInput";
import ContentBlockCard from "../Form/ContentBlockCard";

const ButtonsInputGroup = ({
  buttons = [],
  setButtons = () => {},
  maxButtons = 3,
  errors = {}, // 🔹 Accepts an error object like { button0Text: "...", button0Url: "..." }
}) => {
  const handleAddButton = () => {
    if (buttons.length < maxButtons) {
      setButtons([...buttons, { text: "", url: "" }]);
    }
  };

  const handleRemoveButton = (index) => {
    const updated = buttons.filter((_, i) => i !== index);
    setButtons(updated);
  };

  const handleChange = (index, field, value) => {
    const updated = [...buttons];
    updated[index][field] = value;
    setButtons(updated);
  };

  return (
    <ContentBlockCard>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6
          className="fw-semibold mb-0"
          style={{
            background: "linear-gradient(to right, #4f46e5, #9333ea)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Buttons{" "}
          <span className="fw-normal text-muted">(Add up to {maxButtons} Buttons)</span>
        </h6>

        <Button
          variant="primary"
          onClick={handleAddButton}
          className="d-flex align-items-center gap-1 px-3 py-1 rounded-3"
          disabled={buttons.length >= maxButtons}
        >
          <i className="ri-add-line fs-5"></i> Add Button
        </Button>
      </div>

      {buttons.length === 0 && (
        <div className="text-center py-3 text-muted bg-light rounded-3">
          No buttons added. Click "Add Button" to create one.
        </div>
      )}

      {buttons.map((btn, idx) => {
        const textError = errors[`button${idx}Text`] || null;
        const urlError = errors[`button${idx}Url`] || null;

        return (
          <Card key={idx} className="mb-4 border-0 shadow-sm rounded-4">
            <Card.Body className="p-4 bg-light-subtle rounded-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="text-secondary mb-0">Button {idx + 1}</h6>
                <Button
                  variant="link"
                  onClick={() => handleRemoveButton(idx)}
                  className="text-danger p-0 border-0"
                >
                  <span className="material-symbols-outlined fs-4">delete</span>
                </Button>
              </div>

              <div className="mb-3">
                <EmojiTextInput
                  type="text"
                  placeholder="Button Title"
                  value={btn.text}
                  maxLength={20}
                  onChange={(val) => handleChange(idx, "text", val)}
                  error={textError}
                />
              </div>

              <Form.Group>
                <Form.Label className="text-secondary small mb-1">
                  Destination URL {" "}
                  
                  <span className="fw-normal text-muted">( link should start with http or https )</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="https://example.com"
                  value={btn.url}
                  onChange={(e) => handleChange(idx, "url", e.target.value)}
                  className={`rounded-3 border-2 h-55 text-dark ${
                    urlError ? "is-invalid" : ""
                  }`}
                  style={{ backgroundColor: "#fff", fontSize: "0.95rem" }}
                />
                {urlError && (
                  <Form.Text className="text-danger small mt-1">
                    {urlError}
                  </Form.Text>
                )}
              </Form.Group>
            </Card.Body>
          </Card>
        );
      })}
    </ContentBlockCard>
  );
};

export default ButtonsInputGroup;


// version 2
// import React from "react";
// import { Card, Button, Form } from "react-bootstrap";
// import EmojiTextInput from "./EmojiTextInput";
// import ContentBlockCard from "../Form/ContentBlockCard";

// const ButtonsInputGroup = ({
//   buttons = [],
//   setButtons = () => {},
//   maxButtons = 3,
// }) => {
//   const handleAddButton = () => {
//     if (buttons.length < maxButtons) {
//       setButtons([...buttons, { text: "", url: "" }]);
//     }
//   };

//   const handleRemoveButton = (index) => {
//     const updated = buttons.filter((_, i) => i !== index);
//     setButtons(updated);
//   };

//   const handleChange = (index, field, value) => {
//     const updated = [...buttons];
//     updated[index][field] = value;
//     setButtons(updated);
//   };

//   return (
//     <ContentBlockCard>
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h6
//           className="fw-semibold mb-0"
//           style={{
//             background: "linear-gradient(to right, #4f46e5, #9333ea)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//           }}
//         >
//           Buttons{" "}
//           <span className="fw-normal text-muted">(Add up to {maxButtons} Buttons)</span>
//         </h6>

//         <Button
//           variant="primary"
//           onClick={handleAddButton}
//           className="d-flex align-items-center gap-1 px-3 py-1 rounded-3"
//           disabled={buttons.length >= maxButtons}
//         >
//           <i className="ri-add-line fs-5"></i> Add Button
//         </Button>
//       </div>

//       {buttons.length === 0 && (
//         <div className="text-center py-3 text-muted bg-light rounded-3">
//           No buttons added. Click "Add Button" to create one.
//         </div>
//       )}

//       {buttons.map((btn, idx) => (
//         <Card key={idx} className="mb-4 border-0 shadow-sm rounded-4">
//           <Card.Body className="p-4 bg-light-subtle rounded-4">
//             <div className="d-flex justify-content-between align-items-center mb-3">
//               <h6 className="text-secondary mb-0">Button {idx + 1}</h6>
//               <Button
//                 variant="link"
//                 onClick={() => handleRemoveButton(idx)}
//                 className="text-danger p-0 border-0"
//               >
//                 <span className="material-symbols-outlined fs-5">delete</span>
//               </Button>
//             </div>

//             <div className="mb-3">
//               <EmojiTextInput
//                 type="text"
//                 placeholder="Button Title"
//                 value={btn.text}
//                 maxLength={20}
//                 onChange={(val) => handleChange(idx, "text", val)}
//               />
//             </div>

//             <Form.Group>
//               <Form.Label className="text-secondary small mb-1">
//                 Destination URL
//               </Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="https://example.com"
//                 value={btn.url}
//                 onChange={(e) => handleChange(idx, "url", e.target.value)}
//                 className="rounded-3 border-2 h-55 text-dark"
//                 style={{ backgroundColor: "#fff", fontSize: "0.95rem" }}
//               />
//             </Form.Group>
//           </Card.Body>
//         </Card>
//       ))}
//     </ContentBlockCard>
//   );
// };

// export default ButtonsInputGroup;



// version 1

// import React from "react";
// import { Card, Button, Form } from "react-bootstrap";
// import EmojiTextInput from "./EmojiTextInput";
// import ContentBlockCard from "../Form/ContentBlockCard";

// const ButtonsInputGroup = ({
//   buttons = [],
//   setButtons = () => {},
//   maxButtons = 3,
// }) => {
//   const handleAddButton = () => {
//     if (buttons.length < maxButtons) {
//       setButtons([...buttons, { text: "", url: "" }]);
//     }
//   };

//   const handleRemoveButton = (index) => {
//     const updated = buttons.filter((_, i) => i !== index);
//     setButtons(updated);
//   };

//   const handleChange = (index, field, value) => {
//     const updated = [...buttons];
//     updated[index][field] = value;
//     setButtons(updated);
//   };

//   return (
//     <ContentBlockCard>
//     {/* <div> */}
//       <div className="d-flex justify-content-between align-items-center">
//         <label className="label">
//           <h6>Buttons</h6>
          
//           </label>
//         <Button className="fs-5" variant="primary" onClick={handleAddButton} disabled={buttons.length >= maxButtons}>
//           <i className="ri-add-line"></i> 
//           Add Button 
//         </Button>
//       </div>

//  <Card className="p-4 mt-3 rounded-4 border-3" style={{ backgroundColor: "#ffffff" }} >
//            <Card.Body >
//       {buttons.map((btn, idx) => (
        
//         <div key={idx}>
//             <div className="d-flex justify-content-between align-items-center mb-2">
//               <label className="label text-secondary">
//                 <h6>
//                   Button {idx + 1}
//                 </h6>
//                 </label>
//               <button
//                 className="ps-0 border-0 bg-transparent lh-1 position-relative top-2"
//                 onClick={() => handleRemoveButton(idx)}
//               >
//                 <span className="material-symbols-outlined fs-4 text-danger">delete</span>
//               </button>
//             </div>

//             <EmojiTextInput
//               label=""
//               type="text"
//               placeholder="Button Title"
//               value={btn.text}
//               onChange={(val) => handleChange(idx, "text", val)}
//             />

//             <Form.Group className="mb-4">
//               <label className="label text-secondary">Destination Url</label>
//               <Form.Group className="position-relative">
//                 <Form.Control
//                   type="text"
//                   // className="text-dark ps-5 h-55"
//                   className="text-dark h-55 rounded-4 border-3"
//                   style={{ fontSize: "1rem" }}
//                   placeholder="Destination Url"
//                   value={btn.url}
//                   onChange={(e) => handleChange(idx, "url", e.target.value)}
//                 />
//                 {/* <i className="ri-link position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i> */}
//               </Form.Group>
//             </Form.Group>
//             </div>
        
//       ))}

//          </Card.Body>
//          </Card>
//     {/* </div> */}
//     </ContentBlockCard>
//   );
// };

// export default ButtonsInputGroup;
