// components/CustomSelect.js
import React from "react";
import Form from "react-bootstrap/Form";
import CustomLabel from "./CustomLabel";
import styles from "./CustomSelect.module.css"; // Import the CSS module

const CustomSelect = ({ label, value, onChange, options = [], id, name }) => {
  return (
    <Form.Group controlId={id} className="mb-3">
      {label && (
        // <Form.Label className={styles.gradientLabel}>
        //   {label}
        // </Form.Label>
        <CustomLabel text={label} />
      )}
      <Form.Select
        name={name}
        value={value}
        onChange={onChange}
        className={styles.fancySelect}
      >
        {options.map((option, index) => (
          <option
            key={index}
            value={option.value}
            className="text-dark"
          >
            {option.label}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default CustomSelect;
