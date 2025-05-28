import React, { useState, useRef } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { FaRegSmile } from "react-icons/fa";
import { Form, Button } from "react-bootstrap";

const EmojiTextInput = ({ type = "text", label = "", value, onChange, placeholder = "", disabled = false }) => {
  const [showPicker, setShowPicker] = useState(false);
  const inputRef = useRef(null);

  const handleEmojiSelect = (emoji) => {
    const cursorPos = inputRef.current.selectionStart;
    const newValue = value.slice(0, cursorPos) + emoji.native + value.slice(cursorPos);
    onChange(newValue);
    setShowPicker(false);
    setTimeout(() => {
      inputRef.current.focus();
      inputRef.current.selectionEnd = cursorPos + emoji.native.length;
    }, 0);
  };

  return (
    <Form.Group className="mb-4">
      <label className="label text-secondary">{label}</label>
      <Form.Group className="position-relative">
        {type === "textarea" ? (
          <textarea
            className="form-control ps-5 text-dark"
            ref={inputRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            rows={5}
          ></textarea>
        ) : (
          <Form.Control
            type={type}
            className="text-dark ps-5 h-55"
            ref={inputRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
          />
        )}
        <Button onClick={() => setShowPicker(!showPicker)} className="position-absolute top-50 end-0 translate-middle-y bg-transparent p-0 pe-3 border-0">
          <FaRegSmile className="fs-24 position-relative top-1 text-primary" />
        </Button>
        {showPicker && (
          <div style={{ position: "absolute", zIndex: 1000, top: "100%", right: 0 }}>
            <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="light" />
          </div>
        )}
      </Form.Group>
    </Form.Group>
  );
};

export default EmojiTextInput;