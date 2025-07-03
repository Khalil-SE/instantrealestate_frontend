import React from "react";
import { Button, Spinner } from "react-bootstrap";
import { IoRocketOutline } from "react-icons/io5";
import "./AnimatedSubmitButton.css"; // Make sure this file is imported

const AnimatedSubmitButton = ({ isAnimating = false }) => {
  return (
    <div className="position-relative w-100">
      <Button
        type="submit"
        disabled={isAnimating}
        className={`gradient-button w-100 d-flex align-items-center justify-content-center rounded-3 py-2 px-4 fw-semibold`}
        style={{
          opacity: isAnimating ? 0.5 : 1,
          pointerEvents: isAnimating ? "none" : "auto",
          fontSize: "1rem",
        }}
      >
        <div
          className="d-flex align-items-center justify-content-center transition-opacity"
          style={{
            opacity: isAnimating ? 0 : 1,
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          <IoRocketOutline size={18} className="me-2" />
          Generate Automation
        </div>
        {isAnimating && (
          <Spinner
            animation="border"
            size="sm"
            className="position-absolute top-50 start-50 translate-middle"
          />
        )}
      </Button>
    </div>
  );
};

export default AnimatedSubmitButton;


// version: 1
// import React from "react";
// import { Button, Spinner } from "react-bootstrap";
// import { IoRocketOutline } from "react-icons/io5";

// const AnimatedSubmitButton = ({ isAnimating = false }) => {
//   return (
//     <div className="position-relative w-100">
//       <Button
//         type="submit"
//         variant="primary"
//         disabled={isAnimating}
//         className={`w-100 d-flex align-items-center justify-content-center rounded-3 py-2 px-4 fw-semibold transition-opacity`}
//         style={{
//           opacity: isAnimating ? 0.5 : 1,
//           pointerEvents: isAnimating ? "none" : "auto",
//           transition: "opacity 0.5s ease-in-out",
//           fontSize: "1rem",
//         }}
//       >
//         <div
//           className={`d-flex align-items-center justify-content-center transition-opacity`}
//           style={{ opacity: isAnimating ? 0 : 1, transition: "opacity 0.5s ease-in-out" }}
//         >
//           <IoRocketOutline size={18} className="me-2" />
//           Generate Automation
//         </div>
//       </Button>
//     </div>
//   );
// };

// export default AnimatedSubmitButton;
