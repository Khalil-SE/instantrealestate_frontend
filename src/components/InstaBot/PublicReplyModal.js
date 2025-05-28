import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import EmojiTextInput from "./EmojiTextInput";

const PublicReplyModal = ({
  show,
  onClose,
  onSave,
  initialData = null,
  loading = false,
}) => {
  const [name, setName] = useState("");
  const [replies, setReplies] = useState([""]);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setReplies(initialData.replies?.map((r) => r.text) || [""]);
    } else {
      setName("");
      setReplies([""]);
    }
  }, [initialData]);

  const handleReplyChange = (index, value) => {
    const updated = [...replies];
    updated[index] = value;
    setReplies(updated);
  };

  const handleAddReply = () => {
    setReplies([...replies, ""]);
  };

  const handleRemoveReply = (index) => {
    setReplies(replies.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const replyObjects = replies.filter((t) => t.trim()).map((text) => ({ text }));
    onSave({ name, replies: replyObjects });
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? "Edit Template" : "Add Template"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EmojiTextInput label="Template Name" value={name} onChange={setName} />
        <label className="label text-secondary">Replies</label>
        {replies.map((text, idx) => (
          <div key={idx} className="mb-3 d-flex align-items-center">
            <EmojiTextInput
              value={text}
              onChange={(val) => handleReplyChange(idx, val)}
              placeholder={`Reply ${idx + 1}`}
            />
            {replies.length > 1 && (
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => handleRemoveReply(idx)}
                className="ms-2 mt-3"
              >
                Remove
              </Button>
            )}
          </div>
        ))}
        <Button size="sm" variant="outline-primary" onClick={handleAddReply}>
          + Add Reply
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PublicReplyModal;
