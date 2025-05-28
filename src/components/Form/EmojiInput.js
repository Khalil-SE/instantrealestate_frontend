import React, { useState, useRef } from "react";
import { FormControl, InputGroup, Button } from "react-bootstrap";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { FaSmile } from "react-icons/fa";
import "./EmojiInput.css"; // optional for styling

const EmojiInput = ({ value, onChange, placeholder = "", disabled = false }) => {
  const [showPicker, setShowPicker] = useState(false);
  const inputRef = useRef(null);

  const handleEmojiSelect = (emoji) => {
    const cursorPos = inputRef.current.selectionStart;
    const newValue =
      value.slice(0, cursorPos) + emoji.native + value.slice(cursorPos);
    onChange(newValue);
    setShowPicker(false); // optionally close after selecting
    setTimeout(() => {
      inputRef.current.focus();
      inputRef.current.selectionEnd = cursorPos + emoji.native.length;
    }, 0);
  };

  return (
    <div className="emoji-input-wrapper" style={{ position: "relative" }}>
      <InputGroup>
        <FormControl
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
        />
        <Button
          variant="outline-secondary"
          onClick={() => setShowPicker(!showPicker)}
          disabled={disabled}
          className="emoji-toggle-button"
        >
          <FaSmile />
        </Button>
      </InputGroup>

      {showPicker && (
        <div className="emoji-picker-dropdown" style={{ position: "absolute", zIndex: 1000, top: "100%", right: 0 }}>
          <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="light" />
        </div>
      )}
    </div>
  );
};

export default EmojiInput;
