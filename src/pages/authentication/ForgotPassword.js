import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Col, Row, Spinner } from "react-bootstrap";
import { ROUTES } from "../../config/routes";
import { requestPasswordReset, resetPassword } from "../../services/authService";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // Step 1: request code, Step 2: reset password
  const [formData, setFormData] = useState({
    email: "",
    code: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRequestCode = async () => {
    setError({});
    if (!formData.email) {
      setError({ email: "Email is required" });
      return;
    }
    setLoading(true);
    try {
      await requestPasswordReset(formData.email);
      setStep(2);
    } catch (err) {
      setError({ email: err?.detail || "Failed to send reset code" });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setError({});
    if (!formData.code) {
      setError({ code: "Verification code is required" });
      return;
    }
    if (!formData.newPassword) {
      setError({ newPassword: "New password is required" });
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setError({ confirmPassword: "Passwords do not match" });
      return;
    }
    setLoading(true);
    try {
      await resetPassword(formData.email, formData.code, formData.newPassword);
      setSuccess(true);
      setTimeout(() => {
        navigate(ROUTES.AUTHENTICATION.SIGN_IN);
      }, 3000);
    } catch (err) {
      setError({ code: err?.detail || "Failed to reset password" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-wrapper-content active">
      <div className="main-content d-flex flex-column">
        <div className="auth-main-content m-auto m-1230 px-3">
          <Row style={{ width: "550px" }} className="mx-auto">
            <Col lg={12}>
              <Card className="bg-white border-0 rounded-10 mb-4">
                <Card.Body className="p-4 text-center">
                  
                  {!success ? (
                    <>
                      <img
                        src="/images/logo.svg"
                        alt="logo"
                        width={100}
                        height={26}
                        className="mb-4"
                      />

                      <h4 className="fs-20 fw-semibold mb-3">
                        {step === 1 ? "Reset your password" : "Enter reset code"}
                      </h4>

                      <Form className="mx-auto" style={{ maxWidth: "550px" }}>
                        <Form.Group className="mb-3 text-start">
                          <label className="label text-secondary">Email</label>
                          <Form.Control
                            name="email"
                            type="email"
                            className="h-55"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={step === 2}
                            isInvalid={!!error.email}
                          />
                          <Form.Control.Feedback type="invalid">{error.email}</Form.Control.Feedback>
                        </Form.Group>

                        {step === 2 && (
                          <>
                            <Form.Group className="mb-3 text-start">
                              <label className="label text-secondary">Verification Code</label>
                              <Form.Control
                                name="code"
                                type="text"
                                className="h-55"
                                placeholder="Enter verification code"
                                value={formData.code}
                                onChange={handleChange}
                                isInvalid={!!error.code}
                              />
                              <Form.Control.Feedback type="invalid">{error.code}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3 text-start">
                              <label className="label text-secondary">New Password</label>
                              <Form.Control
                                name="newPassword"
                                type="password"
                                className="h-55"
                                placeholder="Enter new password"
                                value={formData.newPassword}
                                onChange={handleChange}
                                isInvalid={!!error.newPassword}
                              />
                              <Form.Control.Feedback type="invalid">{error.newPassword}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3 text-start">
                              <label className="label text-secondary">Confirm Password</label>
                              <Form.Control
                                name="confirmPassword"
                                type="password"
                                className="h-55"
                                placeholder="Confirm new password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                isInvalid={!!error.confirmPassword}
                              />
                              <Form.Control.Feedback type="invalid">{error.confirmPassword}</Form.Control.Feedback>
                            </Form.Group>
                          </>
                        )}

                        <button
                          type="button"
                          className="btn btn-primary fs-16 fw-medium text-white py-2 px-4 w-100"
                          onClick={step === 1 ? handleRequestCode : handleResetPassword}
                          disabled={loading}
                        >
                          {loading ? (
                            <Spinner animation="border" size="sm" />
                          ) : step === 1 ? "Send Reset Code" : "Reset Password"}
                        </button>
                      </Form>
                    </>
                  ) : (
                    <>
                      <i style={{fontSize:"124px"}} className="material-symbols-outlined" >Verified</i>
                      <h4 className="fs-20 fw-semibold mb-2">Password Reset Successful</h4>
                      <p className="text-secondary">
                        Your password has been updated. Redirecting to login page...
                      </p>
                    </>
                  )}

                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

