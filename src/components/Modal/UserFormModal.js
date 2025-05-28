


import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Spinner } from "react-bootstrap";
import { COMPANY_SIZES, USER_STATUSES, USER_ROLES } from "../../config/values";
import { createUser, updateUser } from "../../services/userService";

const UserFormModal = ({ show, onHide, userData, mode, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    role: "user",
    status: "active",
    sizeOfCompany: "",
    opt_terms: false,
    chatBot_key: "",
    chatBot_user_id: "",
    api_key: ""
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    if (mode === "add") {
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        role: "user",
        status: "active",
        sizeOfCompany: "",
        opt_terms: false,
        chatBot_key: "",
        chatBot_user_id: "",
        api_key: ""
      });
      setError({});
    } else if (userData) {
      setFormData({
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        email: userData.email || "",
        phone_number: userData.phone_number || "",
        role: userData.role || "user",
        status: userData.status || "active",
        sizeOfCompany: userData.sizeOfCompany || "",
        opt_terms: userData.opt_terms || false,
        chatBot_key: userData.chatBot_key || "",
        chatBot_user_id: userData.chatBot_user_id || "",
        api_key: userData.api_key || ""
      });
      setError({});
    }
  }, [userData, mode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    setError({});
    try {
      if (mode === "edit" && userData?.id) {
        await updateUser(userData.id, formData);
      } else {
        await createUser(formData);
      }
      onSubmitSuccess();
    } catch (err) {
      setError(err);
    } finally {
      setIsSaving(false);
    }
  };

  const isUserRole = formData.role === "user";

  return (
    <Modal show={show} onHide={onHide} size="lg" backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{mode === "edit" ? "Edit User" : mode === "view" ? "View User" : "Add User"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isSaving && (
          <div className="d-flex justify-content-center mb-3">
            <Spinner animation="border" />
          </div>
        )}
        {error?.detail && (
          <div className="alert alert-danger" role="alert">
            {error.detail}
          </div>
        )}
        <Form>
          <Row>


            <Col md={6}>
              <Form.Group className="mb-3">
              <label className="label text-secondary">First Name</label>
                <Form.Group className="position-relative"> 
                <Form.Control
                // type="text"
                // className="text-dark ps-5 h-55"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                isInvalid={!!error?.first_name}
                  disabled={mode === "view"}
                />
                {/* <i className="ri-user-line position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i> */}
                </Form.Group>
                <Form.Control.Feedback type="invalid">
                  {error?.first_name?.[0]}
                </Form.Control.Feedback>
                
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
              <label className="label text-secondary">Last Name</label>
                <Form.Control
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  isInvalid={!!error?.last_name}
                  disabled={mode === "view"}
                />
                <Form.Control.Feedback type="invalid">
                  {error?.last_name?.[0]}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
              <label className="label text-secondary">Email</label>
                <Form.Control
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!error?.email}
                  disabled={mode === "view"}
                />
                <Form.Control.Feedback type="invalid">
                  {error?.email?.[0]}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
              <label className="label text-secondary">Phone Number</label>
                <Form.Control
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  isInvalid={!!error?.phone_number}
                  disabled={mode === "view"}
                />
                <Form.Control.Feedback type="invalid">
                  {error?.phone_number?.[0]}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
              <label className="label text-secondary">Role</label>
                <Form.Select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  isInvalid={!!error?.role}
                  disabled={mode === "view"}
                >
                  {Object.entries(USER_ROLES).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {error?.role?.[0]}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
              <label className="label text-secondary">Status</label>
                <Form.Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  isInvalid={!!error?.status}
                  disabled={mode === "view"}
                >
                  {Object.entries(USER_STATUSES).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {error?.status?.[0]}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {isUserRole && (
              <>
                <Col md={6}>
                  <Form.Group className="mb-3">
                  <label className="label text-secondary">Company Size</label>
                    <Form.Select
                      name="sizeOfCompany"
                      value={formData.sizeOfCompany}
                      onChange={handleChange}
                      disabled={mode === "view"}
                      isInvalid={!!error?.sizeOfCompany}
                    >
                      {Object.entries(COMPANY_SIZES).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {error?.sizeOfCompany?.[0]}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                  <label className="label text-secondary">Opt-in Terms</label>
                    <Form.Check
                      type="checkbox"
                      name="opt_terms"
                      label="Agreed to Terms"
                      checked={formData.opt_terms}
                      onChange={handleChange}
                      disabled={mode === "view"}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                  <label className="label text-secondary">ChatBot Key</label>
                    <Form.Control
                      name="chatBot_key"
                      value={formData.chatBot_key}
                      onChange={handleChange}
                      disabled={mode === "view"}
                      isInvalid={!!error?.chatBot_key}
                    />
                    <Form.Control.Feedback type="invalid">
                      {error?.chatBot_key?.[0]}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3">
                  <label className="label text-secondary">ChatBot User ID</label>
                    <Form.Control
                      name="chatBot_user_id"
                      value={formData.chatBot_user_id}
                      onChange={handleChange}
                      disabled={mode === "view"}
                      isInvalid={!!error?.chatBot_user_id}
                    />
                    <Form.Control.Feedback type="invalid">
                      {error?.chatBot_user_id?.[0]}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group className="mb-3">
                  <label className="label text-secondary">API Key</label>
                    <Form.Control
                      name="api_key"
                      value={formData.api_key}
                      disabled
                    />
                  </Form.Group>
                </Col>
              </>
            )}
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        {mode !== "view" && <Button onClick={handleSubmit} disabled={isSaving}>Save</Button>}
      </Modal.Footer>
    </Modal>
  );
};

export default UserFormModal;
