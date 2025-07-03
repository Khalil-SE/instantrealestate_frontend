import React, { useState } from "react";
// import { X } from "lucide-react";
import { RxCross2 } from "react-icons/rx";
import { Form } from "react-bootstrap";

const EmailInputList = ({
  emails = [],
  setEmails = () => {},
  emailInput = "",
  setEmailInput = () => {},
}) => {
  const [isInvalid, setIsInvalid] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const addEmail = () => {
    const email = emailInput.trim();
    if (email && validateEmail(email)) {
      if (!emails.includes(email)) {
        setEmails([...emails, email]);
      }
      setEmailInput("");
      setIsInvalid(false);
    } else {
      setIsInvalid(true);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && emailInput.trim() ) {
      e.preventDefault();
      addEmail();
    } else if (e.key === "Backspace" && !emailInput && emails.length) {
      setEmails(emails.slice(0, -1));
    }
  };

  const handleRemove = (idx) => {
    setEmails(emails.filter((_, i) => i !== idx));
  };

  return (
    <Form.Group className="mb-5">
      {/* <Form.Label className="fw-medium text-body mb-2">
        Email Recipients
      </Form.Label> */}

      <div className="d-flex flex-wrap gap-2 mb-2">
        {emails.map((email, index) => (
          <div
            key={index}
            className="d-flex align-items-center bg-primary bg-opacity-10 text-primary py-1 px-3 rounded-pill small animate-fade-in"
          >
            {email}
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="btn p-0 border-0 ms-2 text-primary opacity-75 hover-opacity-100"
              style={{ lineHeight: 1 }}
            >
              <RxCross2 size={14} />
            </button>
          </div>
        ))}
      </div>

      <div className="position-relative">
        <Form.Control
          type="email"
          value={emailInput}
          placeholder="Enter email address and press Enter or ,"
          className={`rounded-3 px-3 py-2 border-2 ${
            isInvalid ? "border-danger" : ""
          }`}
          style={{ fontSize: "0.95rem" }}
          onChange={(e) => {
            setEmailInput(e.target.value);
            setIsInvalid(false);
          }}
          onKeyDown={handleKeyDown}
          onBlur={() => emailInput.trim() && addEmail()}
        />
        {isInvalid && (
          <div className="text-danger small mt-1">
            Please enter a valid email address
          </div>
        )}
      </div>
    </Form.Group>
  );
};

export default EmailInputList;



// version 1
// import React from "react";
// import { Form } from "react-bootstrap";

// const EmailInputList = ({
//   emails = [],
//   setEmails = () => {},
//   emailInput = "",
//   setEmailInput = () => {},
// }) => {
//   const handleKeyDown = (e) => {
//     if ((e.key === "Enter" || e.key === ",") && emailInput.trim()) {
//       e.preventDefault();
//       if (/\S+@\S+\.\S+/.test(emailInput.trim()) && !emails.includes(emailInput.trim())) {
//         setEmails([...emails, emailInput.trim()]);
//       }
//       setEmailInput("");
//     } else if (e.key === "Backspace" && !emailInput && emails.length) {
//       setEmails(emails.slice(0, -1));
//     }
//   };

//   const handleRemove = (idx) => {
//     setEmails(emails.filter((_, i) => i !== idx));
//   };

//   return (
//     <Form.Group className="mb-4">
//       <label className="label text-secondary">
//         <h6>
//         Email Addresses
//         </h6>
//         </label>
//       <div
//         className="form-control d-flex flex-wrap align-items-center rounded-4 border-3"
//         style={{ minHeight: 80, maxHeight: 120, overflowY: "auto", gap: 4, fontSize: "1rem" }}
//       >
//         {emails.map((email, idx) => (
//           <span key={idx} className="badge bg-primary me-2 mb-1">
//             <span className="text-white"
//             style={{fontSize: "1rem"}} >
//             {email}
//             </span>
//             <button
//               type="button"
//               className="btn-close btn-close-white btn-sm ms-2"
//               aria-label="Remove"
//               style={{ fontSize: 10 }}
//               onClick={() => handleRemove(idx)}
//             />
//           </span>
//         ))}
//         <input
//           type="email"
//           className="border-0 flex-grow-1"
//           placeholder="Add email and press Enter"
//           value={emailInput}
//           onChange={(e) => setEmailInput(e.target.value)}
//           onKeyDown={handleKeyDown}
//           style={{ minWidth: 150, outline: "none" }}
//         />
//       </div>
//     </Form.Group>
//   );
// };

// export default EmailInputList;
