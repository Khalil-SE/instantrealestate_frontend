import React from "react";

const CustomLabel = ({text="Label"}) => {
  return (
    <label
    className="mb-2"
      style={{
        // fontSize: "0.875rem",
        fontWeight: 500,
        // marginBottom: "0.5rem",
        background: "linear-gradient(to right, #4f46e5, #9333ea)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        
      }}
    >
      {text}
    </label>
    
  );
};

export default CustomLabel;
