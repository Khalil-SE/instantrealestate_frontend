// "use client";

// import { Row, Col, Form } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { ROUTES } from "../../../config/routes";

// import { COMPANY_SIZES } from "../../../config/values";
// const SignUpForm = () => {
//   return (
//     <>
//       <div className="auth-main-content m-auto m-1230 px-3">
//         <Row className="align-items-center">
//           <Col lg={6} className="d-none d-lg-block">
//             <img
//               src="/images/register.jpg"
//               className="rounded-3"
//               alt="register"
//               width={646}
//               height={804}
//             />
//           </Col>

//           <Col lg={6}>
//             <div className="mw-600 ms-lg-auto">
//               <div className="d-inline-block mb-4">
//                 <img
//                   src="/images/logo.svg"
//                   className="rounded-3 for-light-logo"
//                   alt="login"
//                   width={100}
//                   height={26}
//                 />
//                 <img
//                   src="/images/white-logo.svg"
//                   className="rounded-3 for-dark-logo"
//                   alt="login"
//                   width={100}
//                   height={26}
//                 />
//               </div>

//               <h3 className="fs-28 mb-2">
//                 Sign up to InstantRealEstate Dashboard
//               </h3>
//               <p className="fw-medium fs-16 mb-4">
//                 Sign up with social account or enter your details
//               </p>

//               <div className="row justify-content-center">
//                 <div className="col-lg-6 col-sm-6">
//                   <a
//                     href="https://www.google.com/"
//                     target="_blank"
//                     rel="noreferrer"
//                     className="btn btn-outline-secondary bg-transparent w-100 py-2 hover-bg mb-4"
//                     style={{
//                       borderColor: "#D6DAE1",
//                     }}
//                   >
//                     <img
//                       src="/images/google.svg"
//                       alt="google"
//                       width={25}
//                       height={25}
//                     />
//                   </a>
//                 </div>

//                 <div className="col-lg-6 col-sm-6">
//                   <a
//                     href="https://www.facebook.com/"
//                     target="_blank"
//                     rel="noreferrer"
//                     className="btn btn-outline-secondary bg-transparent w-100 py-2 hover-bg mb-4"
//                     style={{
//                       borderColor: "#D6DAE1",
//                     }}
//                   >
//                     <img
//                       src="/images/facebook2.svg"
//                       alt="facebook2"
//                       width={25}
//                       height={25}
//                     />
//                   </a>
//                 </div>
//               </div>

//               <Form>
//                 <Row>
//                   <Col lg={6} className="mb-3">
//                     <Form.Group className="mb-3">
//                       <label className="label text-secondary">First Name</label>
//                       <Form.Control
//                         type="text"
//                         className="h-55"
//                         placeholder="Enter your first name"
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col lg={6} className="mb-3">
//                     <Form.Group className="mb-3">
//                       <label className="label text-secondary">Last Name</label>
//                       <Form.Control
//                         type="text"
//                         className="h-55"
//                         placeholder="Enter your last name"
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col lg={6} className="mb-3">
//                     <Form.Group className="mb-3">
//                       <label className="label text-secondary">
//                         Email Address
//                       </label>
//                       <Form.Control
//                         type="email"
//                         className="h-55"
//                         placeholder="example@trezo.com"
//                       />
//                     </Form.Group>
//                   </Col>

//                   <Col lg={6} className="mb-3">
//                     <Form.Group className="mb-3">
//                       <label className="label text-secondary">Password</label>
//                       <Form.Control
//                         type="password"
//                         className="h-55"
//                         placeholder="Type password"
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col lg={6} className="mb-3">
//                     <Form.Group className="mb-4">
//                       <label className="label text-secondary">State</label>
//                       {/* <Form.Group className="position-relative"> */}
//                       <Form.Select
//                         className="form-control h-55"
//                         aria-label="Default select example"
//                       >
//                         {Object.entries(COMPANY_SIZES).map(([key, label]) => (
//                           <option key={key} value={key} className="text-dark">
//                             {label}
//                           </option>
//                         ))}
//                       </Form.Select>
//                       {/* <i className="ri-font-size position-absolute top-50 start-0 translate-middle-y fs-20 ps-20"></i>
//                       </Form.Group> */}
//                     </Form.Group>
//                   </Col>

//                   <Col lg={6} className="mb-3">
//                     <Form.Group className="mb-3">
//                       <label className="label text-secondary">
//                         Opt-in Terms
//                       </label>

//                       <Form.Check
//                         type="checkbox"
//                         name="opt_terms"
//                         label="Agree to our Terms & Privacy Policy."
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Form.Group className="mb-3">
//                   <button
//                     type="submit"
//                     className="btn btn-primary fw-medium py-2 px-3 w-100"
//                   >
//                     <div className="d-flex align-items-center justify-content-center py-1">
//                       <span className="material-symbols-outlined fs-20 text-white me-2">
//                         person_4
//                       </span>
//                       <span>Sign Up</span>
//                     </div>
//                   </button>
//                 </Form.Group>

//                 <Form.Group>
//                   <p>
//                     By confirming your email, you agree to our{" "}
//                     <Link
//                       href="/terms-conditions"
//                       className="fw-medium text-decoration-none"
//                     >
//                       Terms of Service
//                     </Link>{" "}
//                     and that you have read and understood our{" "}
//                     <Link
//                       to="/privacy-policy"
//                       className="fw-medium text-decoration-none"
//                     >
//                       Privacy Policy
//                     </Link>
//                     .
//                   </p>

//                   <p>
//                     Already have an account.{" "}
//                     <Link
//                       to={ROUTES.AUTHENTICATION.SIGN_IN}
//                       className="fw-medium text-primary text-decoration-none"
//                     >
//                       Sign In
//                     </Link>
//                   </p>
//                 </Form.Group>
//               </Form>
//             </div>
//           </Col>
//         </Row>
//       </div>
//     </>
//   );
// };

// export default SignUpForm;

"SignUpForm.js";

import { Row, Col, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../config/routes";
import { COMPANY_SIZES } from "../../../config/values";
import { useState } from "react";
import { signupUser } from "../../../services/authService";

import FacebookLoginButton from "../SocialLogInButtons/FacebookLoginButton";
import GoogleLoginButton from "../SocialLogInButtons/GoogleLoginButton";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    sizeOfCompany: Object.keys(COMPANY_SIZES)[0],
    opt_terms: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.first_name) newErrors.first_name = "First name is required";
    if (!formData.last_name) newErrors.last_name = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.opt_terms === false)
      newErrors.opt_terms = "You must agree to the terms and conditions";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      const response = await signupUser(formData);
      if (response.status === 201) {
        // Handle successful signup, e.g., show a success message or redirect
        // Redirect to confirmation page or show a success message
        // console.log(formData.email);
        navigate(ROUTES.AUTHENTICATION.CONFIRM_EMAIL, {
          state: {
            email: formData.email,
          },
        });
      }
    } catch (error) {
      setErrors(error); //{ general: error.detail || "Signup failed." }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth-main-content m-auto m-1230 px-3">
        <Row className="align-items-center">
          <Col lg={6} className="d-none d-lg-block">
            <img
              src="/images/register.jpg"
              className="rounded-3"
              alt="register"
              width={646}
              height={804}
            />
          </Col>

          <Col lg={6}>
            <div className="mw-600 ms-lg-auto">
              <div className="d-inline-block mb-4">
                <img
                  src="/images/IRE-logo-HighResLightBg-1024x384.png"
                  className="rounded-3 for-light-logo"
                  alt="login"
                  width={200}
                  height={60}
                />
                <img
                  src="/images/IRE-logo-HighResLightBg-1024x384.png"
                  className="rounded-3 for-dark-logo"
                  alt="login"
                  width={200}
                  height={60}
                />
              </div>

              <h3 className="fs-28 mb-2">
                Sign up to InstantRealEstate Dashboard
              </h3>
              <p className="fw-medium fs-16 mb-4">
                Sign up with social account or enter your details
              </p>

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col lg={6} className="mb-3">
                    <Form.Group className="mb-3">
                      <label className="label text-secondary">First Name</label>
                      <Form.Control
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        type="text"
                        className="h-55"
                        placeholder="Enter your first name"
                      />
                      {errors.first_name && (
                        <div className="text-danger mt-1">
                          {errors.first_name}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                  <Col lg={6} className="mb-3">
                    <Form.Group className="mb-3">
                      <label className="label text-secondary">Last Name</label>
                      <Form.Control
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        type="text"
                        className="h-55"
                        placeholder="Enter your last name"
                      />
                      {errors.last_name && (
                        <div className="text-danger mt-1">
                          {errors.last_name}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col lg={6} className="mb-3">
                    <Form.Group className="mb-3">
                      <label className="label text-secondary">
                        Email Address
                      </label>
                      <Form.Control
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        className="h-55"
                        placeholder="example@trezo.com"
                      />
                      {errors.email && (
                        <div className="text-danger mt-1">{(errors.email[0].includes("custom user with this email already exists") ? "user with this email already exists" : errors.email )}</div>
                      )}
                    </Form.Group>
                  </Col>
                  <Col lg={6} className="mb-3">
                    <Form.Group className="mb-3">
                      <label className="label text-secondary">
                        Create Password
                      </label>
                      <Form.Control
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type="password"
                        className="h-55"
                        placeholder="Type password"
                      />
                      {errors.password && (
                        <div className="text-danger mt-1">
                          {errors.password}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  {/* Company Size */}
                  {/* <Col lg={6} className="mb-3">
                    <Form.Group className="mb-4">
                      <label className="label text-secondary">
                        Company Size
                      </label>
                      <Form.Select
                        name="sizeOfCompany"
                        value={formData.sizeOfCompany}
                        onChange={handleChange}
                        className="form-control h-55"
                      >
                        {Object.entries(COMPANY_SIZES).map(([key, label]) => (
                          <option key={key} value={key} className="text-dark">
                            {label}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col> */}

                  {/* <Col lg={6} className="mb-3">
                    <Form.Group className="mb-3">
                      <label className="label text-secondary">
                        Opt-in Terms
                      </label>
                      <Form.Check
                        name="opt_terms"
                        checked={formData.opt_terms}
                        onChange={handleChange}
                        type="checkbox"
                        label="Agree to our Terms & Privacy Policy."
                      />
                      {errors.opt_terms && (
                        <div className="text-danger mt-1">
                          {errors.opt_terms}
                        </div>
                      )}
                    </Form.Group>
                  </Col> */}
                </Row>

                {errors.general && (
                  <div className="alert alert-danger">{errors.general}</div>
                )}

                <Form.Group className="mb-3">
                  <button
                    type="submit"
                    className="btn btn-primary fw-medium py-2 px-3 w-100"
                    disabled={loading}
                  >
                    <div className="d-flex align-items-center justify-content-center py-1">
                      {loading ? (
                        <Spinner
                          animation="border"
                          size="sm"
                          className="me-2"
                        />
                      ) : (
                        <span className="material-symbols-outlined fs-20 text-white me-2">
                          person_4
                        </span>
                      )}
                      <span>Sign Up</span>
                    </div>
                  </button>
                </Form.Group>

{errors.opt_terms && (
                        <div className="text-danger mt-1">
                          {errors.opt_terms}
                        </div>
                      )}
                <Form.Group >
                  
                  <div className="d-flex gap-2">
                    <Form.Check
                        name="opt_terms"
                        checked={formData.opt_terms}
                        onChange={handleChange}
                        type="checkbox"
                        className=""
                        label=""
                      />
                  
                  <p>
                    
                    By creating your account, you agree to our{" "}
                    <Link
                      to="/terms-conditions"
                      className="fw-medium text-decoration-none"
                    >
                      Terms of Service
                    </Link>{" "}
                    and that you have read and understood our{" "}
                    <Link
                      to="/privacy-policy"
                      className="fw-medium text-decoration-none"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                  </div>

                  <div className="row justify-content-center">
                    <div className="col-lg-6 col-sm-6">
                      <GoogleLoginButton/>
                      {/* <a
                        href="https://www.google.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline-secondary bg-transparent w-100 py-2 hover-bg mb-4"
                        style={{ borderColor: "#D6DAE1" }}
                      >
                        <img
                          src="/images/google.svg"
                          alt="google"
                          width={25}
                          height={25}
                        />
                      </a> */}
                    </div>
                    <div className="col-lg-6 col-sm-6">
                      <FacebookLoginButton />
                      {/* <a
                        href="https://www.facebook.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-outline-secondary bg-transparent w-100 py-2 hover-bg mb-4"
                        style={{ borderColor: "#D6DAE1" }}
                      >
                        <img
                          src="/images/facebook2.svg"
                          alt="facebook2"
                          width={25}
                          height={25}
                        />
                      </a> */}
                    </div>
                  </div>

                  <p>
                    Already have an account.{" "}
                    <Link
                      to={ROUTES.AUTHENTICATION.SIGN_IN}
                      className="fw-medium text-primary text-decoration-none"
                    >
                      Sign In
                    </Link>
                  </p>
                </Form.Group>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SignUpForm;
