

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Form, Col, Row, Spinner } from "react-bootstrap";
import {
  verifyEmail,
  resendVerificationCode,
} from "../../services/authService";
import { ROUTES } from "../../config/routes";

const ConfirmEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: location.state?.email || "",
    verificationCode: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const [isVerified, setIsVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.verificationCode)
      newErrors.verificationCode = "Verification code is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    setServerError("");
    try {
      const response = await verifyEmail(
        formData.email,
        formData.verificationCode
      );
      if (response.status === 200) {
        setIsVerified(true);
        setTimeout(() => {
          navigate(ROUTES.AUTHENTICATION.SIGN_IN);
        }, 3000); // navigate after 3 seconds
      }
    } catch (error) {
      setServerError(error.detail || error.non_field_errors || "Verification failed.");
      // console.log(error.non_field_errors);
      
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!formData.email) {
      setErrors({ email: "Email is required to resend verification." });
      return;
    }
    setResendLoading(true);
    try {
      await resendVerificationCode(formData.email);
      alert("Verification code resent successfully!");
    } catch (error) {
      alert(error.detail || "Failed to resend verification code.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <>
      <div className="main-wrapper-content active">
        <div className="main-content d-flex flex-column">
          <div className="auth-main-content m-auto  m-1230 px-3">
            <Row style={{ width: "550px" }} className="mx-auto">
              <Col lg={12}>
                <Card className="bg-white border-0 rounded-10 mb-4 ">
                  <Card.Body className="p-4">

                  {!isVerified ? (
                    <>
                    <div className="text-center mb-3 mb-md-4">
                      <div className="mb-3 mb-md-4">
                        <img
                          src="/images/logo.svg"
                          alt="logo"
                          width={100}
                          height={26}
                        />
                      </div>
                      
                        
                        <img
                        src="/images/message.svg"
                        className="mb-3 mb-md-4"
                        alt="message"
                        width={124}
                        height={124}
                      />
                      
                      <h4 className="fs-20 fw-semibold mb-2">
                        "Email verification!"
                      </h4>
                    </div>
                    {location.state && (
                      <p className="mb-4">
                        A email has been send to{" "}
                        <strong> {formData.email} </strong>. Please check for an
                        email from company and use the code to verify the
                        account.
                      </p>
                    )}
                    {serverError && (
                      <div className="alert alert-danger" role="alert">
                        {serverError}
                      </div>
                    )}
                    <Form style={{ maxWidth: "550px" }} className="mx-auto">
                      <Row>
                        <Col lg={12} className="mb-3">
                          <Form.Group className="mb-3">
                            <label className="label text-secondary">
                              Email
                            </label>
                            <Form.Control
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              type="text"
                              className="h-55"
                              placeholder="Enter your email"
                              isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.email}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>

                        <Col lg={12} className="mb-3">
                          <Form.Group className="mb-3">
                            <label className="label text-secondary">
                              Verification Code
                            </label>
                            <Form.Control
                              name="verificationCode"
                              value={formData.verificationCode}
                              onChange={handleChange}
                              type="text"
                              className="h-55"
                              placeholder="Enter your verification code"
                              isInvalid={!!errors.verificationCode}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.verificationCode}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>

                      <button
                        type="button"
                        className="btn btn-primary fs-16 fw-medium text-dark py-2 px-4 text-white w-100"
                        onClick={handleSubmit}
                        disabled={loading}
                      >
                        {loading ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          "Confirm Mail"
                        )}
                      </button>

                      <Form.Group className="mb-3 mt-4 text-center">
                        <p className="mb-0 text-secondary fs-14 fw-normal">
                          Didn’t receive the code?{" "}
                          <button
                            type="button"
                            className="btn btn-link text-primary p-0"
                            onClick={handleResend}
                            disabled={resendLoading}
                          >
                            {resendLoading ? (
                              <Spinner animation="border" size="sm" />
                            ) : (
                              "Resend"
                            )}
                          </button>
                        </p>
                        
                      </Form.Group>
                      
                    </Form>
                    </>
                  ) : (
                    <>
                      <i style={{fontSize:"124px"}} className="material-symbols-outlined" >Verified</i>
                      <h4 className="fs-20 fw-semibold mb-2">Email Verified Successful</h4>
                      <p className="text-secondary">
                        Your email has been Verified. Redirecting to login page...
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
    </>
  );
};

export default ConfirmEmail;
