// src/components/Form/CustomTextInput.js
import React, { useRef } from "react";
import { Form } from "react-bootstrap";

const CustomTextInput = ({
  type = "text",
  label = "",
  value = "",
  placeholder = "",
  name = "",
  onChange = () => {},
  disabled = false,
  error = null,
  maxLength = null,
}) => {
  const inputRef = useRef(null);
  // Handle input change
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    if (!maxLength || newValue.length <= maxLength) {
      onChange(e);
    }
  };

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
            name={name}
            onChange={handleInputChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`rounded-3 border-3 ps-3 pe-5 text-dark ${
              error ? "is-invalid" : ""
            }`}
            style={{
              backgroundColor: disabled ? "#e9ecef" : "rgba(255,255,255,0.6)",
              backdropFilter: "blur(4px)",
              transition: "background-color 0.2s",
            }}
          />
        ) : (
          <Form.Control
            type="text"
            ref={inputRef}
            value={value}
            name={name}
            onChange={handleInputChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`h-55 rounded-3 border-3 ps-3 pe-5 text-dark ${
              error ? "is-invalid" : ""
            }`}
            style={{
              backgroundColor: disabled ? "#e9ecef" : "rgba(255,255,255,0.6)",
              backdropFilter: "blur(4px)",
              transition: "background-color 0.2s",
            }}
          />
        )}
      </div>

      {/* Character counter */}
      {maxLength && (
        <div
          className="position-absolute text-muted small pe-3"
          style={{
            fontSize: "0.75rem",
            bottom: type === "textarea" ? "-1.25rem" : "-1.25rem",
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

export default CustomTextInput;
