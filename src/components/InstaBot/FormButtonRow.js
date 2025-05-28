
import React from "react";
import { Form } from "react-bootstrap";
import EmojiTextInput from "./EmojiTextInput";

const FormButtonRow = ({
  index,
  buttonText,
  buttonUrl,
  onChangeText,
  onChangeUrl,
  onDelete,
  deletable = true,
}) => {
  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center">
        <label className="label text-secondary">Button {index + 1}</label>
        {deletable && (
          <button
            type="button"
            className="ps-0 border-0 bg-transparent lh-1 position-relative top-2"
            onClick={() => onDelete(index)}
          >
            <span className="material-symbols-outlined fs-16 text-danger">
              delete
            </span>
          </button>
        )}
      </div>

      <EmojiTextInput
        type="text"
        value={buttonText}
        onChange={(val) => onChangeText(index, val)}
        placeholder="Button Title"
      />

      <Form.Group className="mb-3">
        <label className="label text-secondary">Destination URL</label>
        <Form.Group className="position-relative">
          <Form.Control
            type="text"
            className="text-dark ps-5 h-55"
            value={buttonUrl}
            onChange={(e) => onChangeUrl(index, e.target.value)}
            placeholder="Destination Url"
          />
          <i className="ri-user-line position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i>
          <span className="position-absolute top-50 end-0 translate-middle-y bg-transparent p-0 pe-3 border-0">
            <i className="ri-search-line fs-24 position-relative top-1 text-primary"></i>
          </span>
        </Form.Group>
      </Form.Group>
    </div>
  );
};

export default FormButtonRow;
