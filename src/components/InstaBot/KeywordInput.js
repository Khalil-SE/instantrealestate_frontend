// components/InstaBot/KeywordInput.js

import React, { useState, useEffect } from "react";
import { Form, Spinner } from "react-bootstrap";
import { checkKeywordAvailability } from "../../services/instabotService";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const KeywordInput = ({
  existingKeywordObj = null, // works for InstaBot or Property
  value = "",
  onChange = () => {},
}) => {
  const [isAvailable, setIsAvailable] = useState(null); // true | false | null
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingKeywordObj?.text !== value) {
      const delayDebounce = setTimeout(() => {
        if (value?.trim()) {
          setLoading(true);
          checkKeywordAvailability(value.trim())
            .then((available) => {
              setIsAvailable(available);
            })
            .catch(() => setIsAvailable(null))
            .finally(() => setLoading(false));
        } else {
          setIsAvailable(null);
        }
      }, 600);

      return () => clearTimeout(delayDebounce);
    }
  }, [value, existingKeywordObj?.text]);

  return (
    <Form.Group className="mb-4">
      <label className="label">
        <h6>Keyword</h6>
      </label>
      <Form.Group className="position-relative">
        <Form.Control
          type="text"
          // className="text-dark ps-5 h-55"
          className="text-dark h-55 rounded-4 border-3"
          style={{ fontSize: "1rem" }}
          placeholder="Keyword"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {/* <i className="ri-user-line position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i> */}
        <span className="position-absolute top-50 end-0 translate-middle-y pe-3">
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : isAvailable === true ? (
            <FaCheckCircle className="text-success fs-5" />
          ) : isAvailable === false ? (
            <FaTimesCircle className="text-danger fs-5" />
          ) : null}
        </span>
        {isAvailable === false && (
          <div className="text-danger small mt-1">Keyword is not available</div>
        )}
      </Form.Group>
    </Form.Group>
  );
};

export default KeywordInput;


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
