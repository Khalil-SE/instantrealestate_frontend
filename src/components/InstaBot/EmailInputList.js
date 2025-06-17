
import React from "react";
import { Form } from "react-bootstrap";

const EmailInputList = ({
  emails = [],
  setEmails = () => {},
  emailInput = "",
  setEmailInput = () => {},
}) => {
  const handleKeyDown = (e) => {
    if ((e.key === "Enter" || e.key === ",") && emailInput.trim()) {
      e.preventDefault();
      if (/\S+@\S+\.\S+/.test(emailInput.trim()) && !emails.includes(emailInput.trim())) {
        setEmails([...emails, emailInput.trim()]);
      }
      setEmailInput("");
    } else if (e.key === "Backspace" && !emailInput && emails.length) {
      setEmails(emails.slice(0, -1));
    }
  };

  const handleRemove = (idx) => {
    setEmails(emails.filter((_, i) => i !== idx));
  };

  return (
    <Form.Group className="mb-4">
      <label className="label text-secondary">
        <h6>
        Email Addresses
        </h6>
        </label>
      <div
        className="form-control d-flex flex-wrap align-items-center"
        style={{ minHeight: 55, maxHeight: 120, overflowY: "auto", gap: 4 }}
      >
        {emails.map((email, idx) => (
          <span key={idx} className="badge bg-primary me-2 mb-1">
            <span className="text-light" >
            {email}
            </span>
            <button
              type="button"
              className="btn-close btn-close-white btn-sm ms-2"
              aria-label="Remove"
              style={{ fontSize: 10 }}
              onClick={() => handleRemove(idx)}
            />
          </span>
        ))}
        <input
          type="email"
          className="border-0 flex-grow-1"
          placeholder="Add email and press Enter"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{ minWidth: 150, outline: "none" }}
        />
      </div>
    </Form.Group>
  );
};

export default EmailInputList;
