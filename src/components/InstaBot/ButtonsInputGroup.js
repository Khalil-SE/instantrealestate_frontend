
import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import EmojiTextInput from "./EmojiTextInput";

const ButtonsInputGroup = ({
  buttons = [],
  setButtons = () => {},
  maxButtons = 3,
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
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <label className="label text-secondary">Buttons</label>
        <Button variant="primary" onClick={handleAddButton} disabled={buttons.length >= maxButtons}>
          <i className="ri-add-line"></i> Add Button
        </Button>
      </div>

      {buttons.map((btn, idx) => (
        <Card className="p-4 mt-3" key={idx}>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label className="label text-secondary">Button {idx + 1}</label>
              <button
                className="ps-0 border-0 bg-transparent lh-1 position-relative top-2"
                onClick={() => handleRemoveButton(idx)}
              >
                <span className="material-symbols-outlined fs-16 text-danger">delete</span>
              </button>
            </div>

            <EmojiTextInput
              label=""
              type="text"
              placeholder="Button Title"
              value={btn.text}
              onChange={(val) => handleChange(idx, "text", val)}
            />

            <Form.Group className="mb-4">
              <label className="label text-secondary">Destination Url</label>
              <Form.Group className="position-relative">
                <Form.Control
                  type="text"
                  className="text-dark ps-5 h-55"
                  placeholder="Destination Url"
                  value={btn.url}
                  onChange={(e) => handleChange(idx, "url", e.target.value)}
                />
                <i className="ri-link position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i>
              </Form.Group>
            </Form.Group>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default ButtonsInputGroup;
