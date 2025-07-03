import React, { useState, useEffect } from "react";
import { Form, Spinner } from "react-bootstrap";
import { checkKeywordAvailability } from "../../services/instabotService";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const KeywordInput = ({
  existingKeywordObj = null,
  value = "",
  onChange = () => {},
  error = null, // NEW: server-side error
}) => {
  const [isAvailable, setIsAvailable] = useState(null);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const trimmedValue = value.trim();

    if (
      existingKeywordObj?.text === trimmedValue || 
      trimmedValue === ""
    ) {
      setIsAvailable(null);
      setChecking(false);
      return;
    }

    setChecking(true); // show spinner while waiting
    const timer = setTimeout(() => {
      checkKeywordAvailability(trimmedValue)
        .then((available) => {
          setIsAvailable(available);
        })
        .catch(() => setIsAvailable(null))
        .finally(() => setChecking(false));
    }, 600); // debounce delay

    return () => clearTimeout(timer);
  }, [value, existingKeywordObj?.text]);

  return (
    <Form.Group className="mb-4">
      {/* <Form.Label
        style={{
          fontSize: "0.875rem",
          fontWeight: "500",
          background: "linear-gradient(to right, #4f46e5, #9333ea)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Keyword
      </Form.Label> */}

      <Form.Group className="position-relative">
        <Form.Control
          type="text"
          placeholder="Enter keyword"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`rounded-3 py-2 px-3`}
          // className={`rounded-3 py-2 px-3 ${
          //   error || isAvailable === false ? "is-invalid" : ""
          // }`}
          style={{
            fontSize: "1rem",
            paddingRight: "2.5rem", // for icon space
          }}
        />

        <div
          className="position-absolute top-50 end-0 translate-middle-y pe-3"
          style={{ zIndex: 2 }}
        >
          {checking ? (
            <Spinner animation="border" size="sm" />
          ) : isAvailable === true ? (
            <FaCheckCircle className="text-success fs-5" />
          ) : isAvailable === false ? (
            <FaTimesCircle className="text-danger fs-5" />
          ) : null}
        </div>
      </Form.Group>

      {/* {isAvailable === false && (
        <div className="text-danger small mt-1">Keyword is not available</div>
      )} */}
      {/* Error Message */}
      {error && (
        <div className="text-danger small mt-1">{error}</div>
      )}

      {!error && isAvailable === false && (
        <div className="text-danger small mt-1">Keyword is not available</div>
      )}
    </Form.Group>
  );
};

export default KeywordInput;



// version 4
// import React, { useState, useEffect } from "react";
// import { Form, Spinner, InputGroup } from "react-bootstrap";
// import { checkKeywordAvailability } from "../../services/instabotService";
// import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// const KeywordInput = ({
//   existingKeywordObj = null,
//   value = "",
//   onChange = () => {},
// }) => {
//   const [isAvailable, setIsAvailable] = useState(null);
//   const [checking, setChecking] = useState(false);

//   useEffect(() => {
//     const trimmedValue = value.trim();

//     // Reset state immediately
//     setChecking(false);
//     setIsAvailable(null);

//     if (existingKeywordObj?.text !== value && trimmedValue !== "") {
//       setChecking(true); // show spinner right away

//       const timer = setTimeout(() => {
//         checkKeywordAvailability(trimmedValue)
//           .then((available) => {
//             setIsAvailable(available);
//           })
//           .catch(() => setIsAvailable(null))
//           .finally(() => setChecking(false));
//       }, 500); // debounce

//       return () => clearTimeout(timer);
//     }

//     if (trimmedValue === "") {
//       setIsAvailable(null);
//     }
//   }, [value, existingKeywordObj?.text]);

//   return (
//     <Form.Group className="mb-4">
//       {/* Gradient Label */}
//       {/* <Form.Label
//         style={{
//           fontSize: "0.875rem",
//           fontWeight: "500",
//           background: "linear-gradient(to right, #4f46e5, #9333ea)",
//           WebkitBackgroundClip: "text",
//           WebkitTextFillColor: "transparent",
//         }}
//       >
//         Keyword
//       </Form.Label> */}

//       {/* Input Field */}
//       <InputGroup className="position-relative">
//         <Form.Control
//           type="text"
//           placeholder="Enter keyword"
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           className="rounded-3 py-2 px-3"
//           style={{
//             fontSize: "1rem",
//             paddingRight: "2.5rem", // space for icon
//           }}
//         />

//         {/* Status Icon or Spinner */}
//         {/* <div
//           className="position-absolute top-50 end-0 translate-middle-y pe-3"
//           style={{ zIndex: 2 }}
//         >
//           {checking ? (
//             <Spinner animation="border" size="sm" />
//           ) : isAvailable === true ? (
//             <FaCheckCircle className="text-success fs-5" />
//           ) : isAvailable === false ? (
//             <FaTimesCircle className="text-danger fs-5" />
//           ) : null}
//         </div> */}
//         <div className="position-absolute top-50 end-0 translate-middle-y pe-3" style={{ zIndex: 2 }}>
//   {(() => {
//     if (checking) {
//       return <Spinner animation="border" size="sm" />;
//     }
//     if (isAvailable === true) {
//       return <FaCheckCircle className="text-success fs-5" />;
//     }
//     if (isAvailable === false) {
//       return <FaTimesCircle className="text-danger fs-5" />;
//     }
//     return null;
//   })()}
// </div>

//       </InputGroup>

//       {/* Error Message */}
//       {isAvailable === false && (
//         <div className="text-danger small mt-1">Keyword is not available</div>
//       )}
//     </Form.Group>
//   );
// };

// export default KeywordInput;



// Version 3
// import React, { useState, useEffect } from "react";
// import { Form, Spinner, InputGroup } from "react-bootstrap";
// import { checkKeywordAvailability } from "../../services/instabotService";
// import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// const KeywordInput = ({
//   existingKeywordObj = null,
//   value = "",
//   onChange = () => {},
// }) => {
//   const [isAvailable, setIsAvailable] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (existingKeywordObj?.text !== value) {
//       const delayDebounce = setTimeout(() => {
//         if (value?.trim()) {
//           setLoading(true);
//           checkKeywordAvailability(value.trim())
//             .then((available) => {
//               setIsAvailable(available);
//             })
//             .catch(() => setIsAvailable(null))
//             .finally(() => setLoading(false));
//         } else {
//           setIsAvailable(null);
//         }
//       }, 600);

//       return () => clearTimeout(delayDebounce);
//     }
//   }, [value, existingKeywordObj?.text]);

//   return (
//     <Form.Group className="mb-4">
//       <Form.Label
//         style={{
//           fontSize: "0.875rem",
//           fontWeight: "500",
//           background: "linear-gradient(to right, #4f46e5, #9333ea)",
//           WebkitBackgroundClip: "text",
//           WebkitTextFillColor: "transparent",
//         }}
//       >
//         Keyword
//       </Form.Label>

//       <InputGroup className="position-relative">
//         <Form.Control
//           type="text"
//           placeholder="Enter keyword"
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           className="rounded-3 py-2 px-3"
//           style={{
//             fontSize: "1rem",
//             paddingRight: "2.5rem", // space for icon
//             borderColor: "#dee2e6",
//           }}
//         />

//         <div
//           className="position-absolute top-50 end-0 translate-middle-y pe-3"
//           style={{ zIndex: 2 }}
//         >
//           {loading ? (
//             <Spinner animation="border" size="sm" />
//           ) : isAvailable === true ? (
//             <FaCheckCircle className="text-success fs-5" />
//           ) : isAvailable === false ? (
//             <FaTimesCircle className="text-danger fs-5" />
//           ) : null}
//         </div>
//       </InputGroup>

//       {isAvailable === false && (
//         <div className="text-danger small mt-1">Keyword is not available</div>
//       )}
//     </Form.Group>
//   );
// };

// export default KeywordInput;


// Version 2

// components/InstaBot/KeywordInput.js

// import React, { useState, useEffect } from "react";
// import { Form, Spinner } from "react-bootstrap";
// import { checkKeywordAvailability } from "../../services/instabotService";
// import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// const KeywordInput = ({
//   existingKeywordObj = null, // works for InstaBot or Property
//   value = "",
//   onChange = () => {},
// }) => {
//   const [isAvailable, setIsAvailable] = useState(null); // true | false | null
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (existingKeywordObj?.text !== value) {
//       const delayDebounce = setTimeout(() => {
//         if (value?.trim()) {
//           setLoading(true);
//           checkKeywordAvailability(value.trim())
//             .then((available) => {
//               setIsAvailable(available);
//             })
//             .catch(() => setIsAvailable(null))
//             .finally(() => setLoading(false));
//         } else {
//           setIsAvailable(null);
//         }
//       }, 600);

//       return () => clearTimeout(delayDebounce);
//     }
//   }, [value, existingKeywordObj?.text]);

//   return (
//     <Form.Group className="mb-4">
//       <label className="label">
//         <p className="fs-4 text-primary">Keyword</p>
//       </label>
//       <Form.Group className="position-relative">
//         <Form.Control
//           type="text"
//           // className="text-dark ps-5 h-55"
//           className="text-dark h-55 rounded-4 border-3"
//           style={{ fontSize: "1rem" }}
//           placeholder="Keyword"
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//         />
//         {/* <i className="ri-user-line position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i> */}
//         <span className="position-absolute top-50 end-0 translate-middle-y pe-3">
//           {loading ? (
//             <Spinner animation="border" size="sm" />
//           ) : isAvailable === true ? (
//             <FaCheckCircle className="text-success fs-4" />
//           ) : isAvailable === false ? (
//             <FaTimesCircle className="text-danger fs-4" />
//           ) : null}
//         </span>
//         {isAvailable === false && (
//           <div className="text-danger small mt-1">Keyword is not available</div>
//         )}
//       </Form.Group>
//     </Form.Group>
//   );
// };

// export default KeywordInput;




// version 1

// components/Form/KeywordInput.js
// import React, { useState, useEffect } from "react";
// import { Form, Spinner } from "react-bootstrap";
// import { checkKeywordAvailability } from "../../services/instabotService";
// import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// const KeywordInput = ({
//   instaBotObj = null,
//   value = "",
//   onChange = () => {},
// }) => {
//   const [isAvailable, setIsAvailable] = useState(null); // true | false | null
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (instaBotObj?.keyword?.text !== value) {
//       const delayDebounce = setTimeout(() => {
//         if (value?.trim()) {
//           setLoading(true);
//           checkKeywordAvailability(value.trim())
//             .then((available) => {
//               console.log("Keyword availability", available);
//               setIsAvailable(available);
//               // console.log("KeywordInput value", value);
//             })
//             .catch(() => setIsAvailable(null))
//             .finally(() => setLoading(false));
//         } else {
//           setIsAvailable(null);
//         }
//       }, 600);

//       return () => clearTimeout(delayDebounce);
//     }
//   }, [value, instaBotObj?.keyword?.text]);

//   return (
//     <Form.Group className="mb-4">
//       <label className="label">
//         <h6 >
//         Keyword
//         </h6>
//         </label>
//       <Form.Group className="position-relative">
//         <Form.Control
//           type="text"
//           className="text-dark ps-5 h-55"
//           placeholder="Keyword"
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//         />
//         <i className="ri-user-line position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i>
//         <span className="position-absolute top-50 end-0 translate-middle-y pe-3">
//           {loading ? (
//             <Spinner animation="border" size="sm" />
//           ) : isAvailable === true ? (
//             <FaCheckCircle className="text-success fs-5" />
//           ) : isAvailable === false ? (
//             <FaTimesCircle className="text-danger fs-5" />
//           ) : null}
//         </span>
//         {isAvailable === false && (
//           <div className="text-danger small mt-1">Keyword is not available</div>
//         )}
//       </Form.Group>
//     </Form.Group>
//   );
// };

// export default KeywordInput;
