// components/Form/PublicReplySelector.js
import React from "react";
import { Form } from "react-bootstrap";

const PublicReplySelector = ({
  templates = [],
  selectedTemplateId = "",
  onChange = () => {},
  onView = () => {},
  onEdit = () => {},
  onDelete = () => {},
}) => {
  return (
    <Form.Group className="mb-4 mt-3">
      <label className="label text-secondary">
        <h6>
        Public Reply
        </h6>
        </label>
      <div className="d-flex justify-content-between align-items-center">
        <Form.Group className="position-relative flex-grow-1 me-3">
          <Form.Select
          // className="form-control ps-5 h-55"
            className="form-control h-55 rounded-4 border-3"
            style={{ fontSize: "1rem" }}
            value={selectedTemplateId}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="">-- Select Template --</option>
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </Form.Select>
          {/* <i className="ri-list-ordered position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i> */}
        </Form.Group>
        <div className="d-flex align-items-center gap-1">
          <button type="button" className="bg-transparent border-0" onClick={onView}>
            <span className="material-symbols-outlined fs-4 text-primary">add</span>
          </button>
          <button type="button" className="bg-transparent border-0" onClick={onEdit}>
            <span className="material-symbols-outlined fs-4 text-body">edit</span>
          </button>
          <button type="button" className="bg-transparent border-0" onClick={onDelete}>
            <span className="material-symbols-outlined fs-4 text-danger">delete</span>
          </button>
        </div>
      </div>
    </Form.Group>
  );
};

export default PublicReplySelector;
