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

// "SignUpForm.js";

// Old SignUp Form

// import { Row, Col, Form, Spinner } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import { ROUTES } from "../../../config/routes";
// import { COMPANY_SIZES } from "../../../config/values";
// import { useState } from "react";
// import { signupUser } from "../../../services/authService";

// import FacebookLoginButton from "../SocialLogInButtons/FacebookLoginButton";
// import GoogleLoginButton from "../SocialLogInButtons/GoogleLoginButton";

// const SignUpForm = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     password: "",
//     sizeOfCompany: Object.keys(COMPANY_SIZES)[0],
//     opt_terms: false,
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.first_name) newErrors.first_name = "First name is required";
//     if (!formData.last_name) newErrors.last_name = "Last name is required";
//     if (!formData.email) newErrors.email = "Email is required";
//     if (!formData.password) newErrors.password = "Password is required";
//     if (formData.opt_terms === false)
//       newErrors.opt_terms = "You must agree to the terms and conditions";
//     return newErrors;
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await signupUser(formData);
//       if (response.status === 201) {
//         // Handle successful signup, e.g., show a success message or redirect
//         // Redirect to confirmation page or show a success message
//         // console.log(formData.email);
//         navigate(ROUTES.AUTHENTICATION.CONFIRM_EMAIL, {
//           state: {
//             email: formData.email,
//           },
//         });
//       }
//     } catch (error) {
//       setErrors(error); //{ general: error.detail || "Signup failed." }
//     } finally {
//       setLoading(false);
//     }
//   };

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
//                   src="/images/IRE-logo-HighResLightBg-1024x384.png"
//                   className="rounded-3 for-light-logo"
//                   alt="login"
//                   width={200}
//                   height={60}
//                 />
//                 <img
//                   src="/images/IRE-logo-HighResLightBg-1024x384.png"
//                   className="rounded-3 for-dark-logo"
//                   alt="login"
//                   width={200}
//                   height={60}
//                 />
//               </div>

//               <h3 className="fs-28 mb-2">
//                 Sign up to InstantRealEstate Dashboard
//               </h3>
//               <p className="fw-medium fs-16 mb-4">
//                 Sign up with social account or enter your details
//               </p>

//               <Form onSubmit={handleSubmit}>
//                 <Row>
//                   <Col lg={6} className="mb-3">
//                     <Form.Group className="mb-3">
//                       <label className="label text-secondary">First Name</label>
//                       <Form.Control
//                         name="first_name"
//                         value={formData.first_name}
//                         onChange={handleChange}
//                         type="text"
//                         className="h-55"
//                         placeholder="Enter your first name"
//                       />
//                       {errors.first_name && (
//                         <div className="text-danger mt-1">
//                           {errors.first_name}
//                         </div>
//                       )}
//                     </Form.Group>
//                   </Col>
//                   <Col lg={6} className="mb-3">
//                     <Form.Group className="mb-3">
//                       <label className="label text-secondary">Last Name</label>
//                       <Form.Control
//                         name="last_name"
//                         value={formData.last_name}
//                         onChange={handleChange}
//                         type="text"
//                         className="h-55"
//                         placeholder="Enter your last name"
//                       />
//                       {errors.last_name && (
//                         <div className="text-danger mt-1">
//                           {errors.last_name}
//                         </div>
//                       )}
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
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         type="email"
//                         className="h-55"
//                         placeholder="example@trezo.com"
//                       />
//                       {errors.email && (
//                         <div className="text-danger mt-1">{(errors.email[0].includes("custom user with this email already exists") ? "user with this email already exists" : errors.email )}</div>
//                       )}
//                     </Form.Group>
//                   </Col>
//                   <Col lg={6} className="mb-3">
//                     <Form.Group className="mb-3">
//                       <label className="label text-secondary">
//                         Create Password
//                       </label>
//                       <Form.Control
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         type="password"
//                         className="h-55"
//                         placeholder="Type password"
//                       />
//                       {errors.password && (
//                         <div className="text-danger mt-1">
//                           {errors.password}
//                         </div>
//                       )}
//                     </Form.Group>
//                   </Col>
//                 </Row>
//                 <Row>
//                   {/* Company Size */}
//                   {/* <Col lg={6} className="mb-3">
//                     <Form.Group className="mb-4">
//                       <label className="label text-secondary">
//                         Company Size
//                       </label>
//                       <Form.Select
//                         name="sizeOfCompany"
//                         value={formData.sizeOfCompany}
//                         onChange={handleChange}
//                         className="form-control h-55"
//                       >
//                         {Object.entries(COMPANY_SIZES).map(([key, label]) => (
//                           <option key={key} value={key} className="text-dark">
//                             {label}
//                           </option>
//                         ))}
//                       </Form.Select>
//                     </Form.Group>
//                   </Col> */}

//                   {/* <Col lg={6} className="mb-3">
//                     <Form.Group className="mb-3">
//                       <label className="label text-secondary">
//                         Opt-in Terms
//                       </label>
//                       <Form.Check
//                         name="opt_terms"
//                         checked={formData.opt_terms}
//                         onChange={handleChange}
//                         type="checkbox"
//                         label="Agree to our Terms & Privacy Policy."
//                       />
//                       {errors.opt_terms && (
//                         <div className="text-danger mt-1">
//                           {errors.opt_terms}
//                         </div>
//                       )}
//                     </Form.Group>
//                   </Col> */}
//                 </Row>

//                 {errors.general && (
//                   <div className="alert alert-danger">{errors.general}</div>
//                 )}

//                 <Form.Group className="mb-3">
//                   <button
//                     type="submit"
//                     className="btn btn-primary fw-medium py-2 px-3 w-100"
//                     disabled={loading}
//                   >
//                     <div className="d-flex align-items-center justify-content-center py-1">
//                       {loading ? (
//                         <Spinner
//                           animation="border"
//                           size="sm"
//                           className="me-2"
//                         />
//                       ) : (
//                         <span className="material-symbols-outlined fs-20 text-white me-2">
//                           person_4
//                         </span>
//                       )}
//                       <span>Sign Up</span>
//                     </div>
//                   </button>
//                 </Form.Group>

// {errors.opt_terms && (
//                         <div className="text-danger mt-1">
//                           {errors.opt_terms}
//                         </div>
//                       )}
//                 <Form.Group >

//                   <div className="d-flex gap-2">
//                     <Form.Check
//                         name="opt_terms"
//                         checked={formData.opt_terms}
//                         onChange={handleChange}
//                         type="checkbox"
//                         className=""
//                         label=""
//                       />

//                   <p>

//                     By creating your account, you agree to our{" "}
//                     <Link
//                       to="/terms-conditions"
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
//                   </div>

//                   <div className="row justify-content-center">
//                     <div className="col-lg-6 col-sm-6">
//                       <GoogleLoginButton/>
//                       {/* <a
//                         href="https://www.google.com/"
//                         target="_blank"
//                         rel="noreferrer"
//                         className="btn btn-outline-secondary bg-transparent w-100 py-2 hover-bg mb-4"
//                         style={{ borderColor: "#D6DAE1" }}
//                       >
//                         <img
//                           src="/images/google.svg"
//                           alt="google"
//                           width={25}
//                           height={25}
//                         />
//                       </a> */}
//                     </div>
//                     <div className="col-lg-6 col-sm-6">
//                       <FacebookLoginButton />
//                       {/* <a
//                         href="https://www.facebook.com/"
//                         target="_blank"
//                         rel="noreferrer"
//                         className="btn btn-outline-secondary bg-transparent w-100 py-2 hover-bg mb-4"
//                         style={{ borderColor: "#D6DAE1" }}
//                       >
//                         <img
//                           src="/images/facebook2.svg"
//                           alt="facebook2"
//                           width={25}
//                           height={25}
//                         />
//                       </a> */}
//                     </div>
//                   </div>

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

// New SignUp Form

// SignUpForm.js (Stripe-integrated version)
// import { useState } from "react";
// import { Row, Col, Form, Spinner } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   useStripe,
//   useElements,
//   CardNumberElement,
//   CardExpiryElement,
//   CardCvcElement,
// } from "@stripe/react-stripe-js";
// import {
//   createPaymentIntent,
//   confirmSignup,
// } from "../../../services/authService";

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

// const CARD_ELEMENT_OPTIONS = {
//   style: {
//     base: {
//       color: "#212529",
//       fontSize: "16px",
//       fontFamily: "system-ui, sans-serif",
//       "::placeholder": { color: "#adb5bd" },
//     },
//     invalid: {
//       color: "#dc3545",
//     },
//   },
// };

// const StripeSignUpInnerForm = () => {
//   const navigate = useNavigate();
//   const stripe = useStripe();
//   const elements = useElements();
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     password: "",
//     plan_id: 1,
//   });
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrors({});
//     try {
//       const paymentIntentData = await createPaymentIntent({
//         email: formData.email,
//         plan_id: formData.plan_id,
//       });

//       const { client_secret, customer_id, subscription_id } = paymentIntentData;

//       const result = await stripe.confirmCardPayment(client_secret, {
//         payment_method: {
//           card: elements.getElement(CardNumberElement),
//           billing_details: {
//             email: formData.email,
//             name: `${formData.first_name} ${formData.last_name}`,
//           },
//         },
//       });

//       if (result.error) {
//         setErrors({ general: result.error.message });
//         setLoading(false);
//         return;
//       }

//       const signupResponse = await confirmSignup({
//         ...formData,
//         customer_id,
//         subscription_id,
//       });

//       localStorage.setItem("access_token", signupResponse.access);
//       localStorage.setItem("refresh_token", signupResponse.refresh);

//       navigate("/dashboard");
//     } catch (err) {
//       setErrors({ general: err.detail || "Signup failed." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Form onSubmit={handleSubmit} className="p-3 border rounded bg-white">
//       <h3 className="mb-4">Sign Up & Subscribe</h3>

//       <Row>
//         <Col md={6}>
//           <Form.Group className="mb-3">
//             <Form.Label>First Name</Form.Label>
//             <Form.Control name="first_name" onChange={handleChange} required />
//           </Form.Group>
//         </Col>
//         <Col md={6}>
//           <Form.Group className="mb-3">
//             <Form.Label>Last Name</Form.Label>
//             <Form.Control name="last_name" onChange={handleChange} required />
//           </Form.Group>
//         </Col>
//       </Row>

//       <Form.Group className="mb-3">
//         <Form.Label>Email</Form.Label>
//         <Form.Control
//           type="email"
//           name="email"
//           onChange={handleChange}
//           required
//         />
//       </Form.Group>

//       <Form.Group className="mb-4">
//         <Form.Label>Password</Form.Label>
//         <Form.Control
//           type="password"
//           name="password"
//           onChange={handleChange}
//           required
//         />
//       </Form.Group>

//       <Form.Group className="mb-3">
//         <Form.Label>Card Number</Form.Label>
//         <div className="form-control p-2">
//           <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
//         </div>
//       </Form.Group>

//       <Row>
//         <Col md={6}>
//           <Form.Group className="mb-3">
//             <Form.Label>Expiry</Form.Label>
//             <div className="form-control p-2">
//               <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
//             </div>
//           </Form.Group>
//         </Col>
//         <Col md={6}>
//           <Form.Group className="mb-3">
//             <Form.Label>CVC</Form.Label>
//             <div className="form-control p-2">
//               <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
//             </div>
//           </Form.Group>
//         </Col>
//       </Row>

//       {errors.general && <p className="text-danger">{errors.general}</p>}

//       <button
//         type="submit"
//         className="btn btn-primary w-100"
//         disabled={!stripe || loading}
//       >
//         {loading ? <Spinner animation="border" size="sm" /> : "Sign Up & Pay"}
//       </button>
//     </Form>
//   );
// };

// const SignUpForm = () => (
//   <>
//     <div className="auth-main-content m-auto m-1230 px-3">
//       <Row className="align-items-center">
//         <Col lg={6} className="d-none d-lg-block">
//           <img
//             src="/images/register.jpg"
//             className="rounded-3"
//             alt="register"
//             width={646}
//             height={804}
//           />
//         </Col>

//         <Col lg={6}>
//           <div className="mw-600 ms-lg-auto">
//             <div className="d-inline-block mb-4">
//               <img
//                 src="/images/IRE-logo-HighResLightBg-1024x384.png"
//                 className="rounded-3 for-light-logo"
//                 alt="login"
//                 width={200}
//                 height={60}
//               />
//               <img
//                 src="/images/IRE-logo-HighResLightBg-1024x384.png"
//                 className="rounded-3 for-dark-logo"
//                 alt="login"
//                 width={200}
//                 height={60}
//               />
//             </div>

//             <h3 className="fs-28 mb-2">
//               Sign up to InstantRealEstate Dashboard
//             </h3>
//             <p className="fw-medium fs-16 mb-4">
//               Sign up with social account or enter your details
//             </p>

//             <Elements stripe={stripePromise}>
//               <StripeSignUpInnerForm />
//             </Elements>
//           </div>
//         </Col>
//       </Row>
//     </div>
//   </>
// );

// export default SignUpForm;


// SignUpForm.js (Multistep + Zustand + Bootstrap version)
// import { useState } from "react";
// import { Row, Col, Form, Spinner, Button, Alert } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   useStripe,
//   useElements,
//   CardNumberElement,
//   CardExpiryElement,
//   CardCvcElement,
// } from "@stripe/react-stripe-js";
// import {
//   createPaymentIntent,
//   confirmSignup,
//   checkEmailExists,
// } from "../../../services/authService";
// import useAuth from "../../../store/useAuth";

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

// const CARD_ELEMENT_OPTIONS = {
//   style: {
//     base: {
//       color: "#212529",
//       fontSize: "16px",
//       fontFamily: "system-ui, sans-serif",
//       "::placeholder": { color: "#adb5bd" },
//     },
//     invalid: {
//       color: "#dc3545",
//     },
//   },
// };

// const StripeSignUpInnerForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();
//   const { setUser, setTokens } = useAuth();

//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     password: "",
//     plan_id: 1,
//   });
//   const [step, setStep] = useState(1);
//   const [errors, setErrors] = useState({});
//   const [statusText, setStatusText] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const checkEmailAvailability = async () => {
//     setErrors({});
//     try {
//       await checkEmailExists({ email: formData.email });
//       setStep(2);
//     } catch (err) {
//       setErrors({ email: "Email already exists. Please use another." });
//     }
//   };

//   const handleBack = () => {
//     setStep(1);
//     setErrors({});
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors({});
//     setLoading(true);
//     setStatusText("Payment is in progress...");

//     try {
//       const paymentIntentData = await createPaymentIntent({
//         email: formData.email,
//         plan_id: formData.plan_id,
//       });

//       const { client_secret, customer_id, subscription_id } = paymentIntentData;

//       const result = await stripe.confirmCardPayment(client_secret, {
//         payment_method: {
//           card: elements.getElement(CardNumberElement),
//           billing_details: {
//             email: formData.email,
//             name: `${formData.first_name} ${formData.last_name}`,
//           },
//         },
//       });

//       if (result.error) {
//         setErrors({ general: result.error.message });
//         setLoading(false);
//         return;
//       }

//       setStatusText("Setting up your account...");

//       const signupResponse = await confirmSignup({
//         ...formData,
//         customer_id,
//         subscription_id,
//       });

//       setUser(signupResponse.user, true);
//       setTokens(signupResponse.access, signupResponse.refresh);
//       navigate("/dashboard");
//     } catch (err) {
//       setErrors({ general: err.detail || "Signup failed." });
//       setStatusText(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Form onSubmit={handleSubmit} className="p-3 border rounded bg-white">
//       <h3 className="mb-4">Sign Up & Subscribe</h3>

//       {step === 1 && (
//         <>
//           <Row>
//             <Col md={6}>
//               <Form.Group className="mb-3">
//                 <Form.Label>First Name</Form.Label>
//                 <Form.Control name="first_name" onChange={handleChange} required />
//               </Form.Group>
//             </Col>
//             <Col md={6}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Last Name</Form.Label>
//                 <Form.Control name="last_name" onChange={handleChange} required />
//               </Form.Group>
//             </Col>
//           </Row>

//           <Form.Group className="mb-3">
//             <Form.Label>Email</Form.Label>
//             <Form.Control type="email" name="email" onChange={handleChange} required isInvalid={!!errors.email} />
//             <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
//           </Form.Group>

//           <Form.Group className="mb-4">
//             <Form.Label>Password</Form.Label>
//             <Form.Control type="password" name="password" onChange={handleChange} required />
//           </Form.Group>

//           <Button className="w-100" onClick={checkEmailAvailability} disabled={loading}>
//             {loading ? <Spinner animation="border" size="sm" /> : "Next"}
//           </Button>
//         </>
//       )}

//       {step === 2 && (
//         <>
//           <Form.Group className="mb-3">
//             <Form.Label>Card Number</Form.Label>
//             <div className="form-control p-2">
//               <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
//             </div>
//           </Form.Group>

//           <Row>
//             <Col md={6}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Expiry</Form.Label>
//                 <div className="form-control p-2">
//                   <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
//                 </div>
//               </Form.Group>
//             </Col>
//             <Col md={6}>
//               <Form.Group className="mb-3">
//                 <Form.Label>CVC</Form.Label>
//                 <div className="form-control p-2">
//                   <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
//                 </div>
//               </Form.Group>
//             </Col>
//           </Row>

//           {errors.general && <Alert variant="danger">{errors.general}</Alert>}
//           {statusText && <Alert variant="info">{statusText}</Alert>}

//           <Row>
//             <Col>
//               <Button variant="secondary" onClick={handleBack} disabled={loading}>
//                 Back
//               </Button>
//             </Col>
//             <Col>
//               <Button type="submit" className="w-100" disabled={!stripe || loading}>
//                 {loading ? <Spinner animation="border" size="sm" /> : "Pay & Sign Up"}
//               </Button>
//             </Col>
//           </Row>
//         </>
//       )}
//     </Form>
//   );
// };

// const SignUpForm = () => (
//   <div className="auth-main-content m-auto m-1230 px-3">
//     <Row className="align-items-center">
//       <Col lg={6} className="d-none d-lg-block">
//         <img
//           src="/images/register.jpg"
//           className="rounded-3"
//           alt="register"
//           width={646}
//           height={804}
//         />
//       </Col>

//       <Col lg={6}>
//         <div className="mw-600 ms-lg-auto">
//           <div className="d-inline-block mb-4">
//             <img
//               src="/images/IRE-logo-HighResLightBg-1024x384.png"
//               className="rounded-3"
//               alt="login"
//               width={200}
//               height={60}
//             />
//           </div>

//           <h3 className="fs-28 mb-2">Sign up to InstantRealEstate Dashboard</h3>
//           <p className="fw-medium fs-16 mb-4">
//             Sign up with social account or enter your details
//           </p>

//           <Elements stripe={stripePromise}>
//             <StripeSignUpInnerForm />
//           </Elements>
//         </div>
//       </Col>
//     </Row>
//   </div>
// );

// export default SignUpForm;

// SignUpForm.js (Validated Multistep + Zustand + Bootstrap version)
import { useState } from "react";
import { Row, Col, Form, Spinner, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import {
  createPaymentIntent,
  confirmSignup,
  checkEmailExists,
} from "../../../services/authService";
import useAuth from "../../../store/useAuth";
import { toast } from "react-toastify";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#212529",
      fontSize: "16px",
      fontFamily: "system-ui, sans-serif",
      "::placeholder": { color: "#adb5bd" },
    },
    invalid: {
      color: "#dc3545",
    },
  },
};

const StripeSignUpInnerForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { setUser, setTokens } = useAuth();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    plan_id: 1,
  });
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [statusText, setStatusText] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateStepOne = async () => {
    const newErrors = {};
    if (!formData.first_name.trim()) newErrors.first_name = "First name is required.";
    if (!formData.last_name.trim()) newErrors.last_name = "Last name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return false;

    try {
      let res = await checkEmailExists( formData.email);
      if(res)
      {
        setErrors((prev) => ({ ...prev, email: "A user with this email already exists." }));
        return false;
      }
      return true;
    } catch (err) {
      toast.error("Error in checking email availability.");
      return false;
    }
  };

  const handleNextStep = async () => {
    setLoading(true);
    const isValid = await validateStepOne();
    setLoading(false);
    if (isValid) setStep(2);
  };

  const handleBack = () => {
    setStep(1);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    setStatusText("Payment is in progress...");

    try {
      const paymentIntentData = await createPaymentIntent({
        email: formData.email,
        plan_id: formData.plan_id,
      });

      const { client_secret, customer_id, subscription_id } = paymentIntentData;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            email: formData.email,
            name: `${formData.first_name} ${formData.last_name}`,
          },
        },
        setup_future_usage: 'off_session',
      });

      if (result.error) {
        setErrors({ general: result.error.message });
        setLoading(false);
        return;
      }

      setStatusText("Setting up your account...");

      const signupResponse = await confirmSignup({
        ...formData,
        customer_id,
        subscription_id,
      });

      setUser(signupResponse.user, true);
      setTokens(signupResponse.access, signupResponse.refresh);
      navigate("/dashboard");
    } catch (err) {
      setErrors({ general: err.detail || "Signup failed." });
      setStatusText(null);
    } finally {
      setLoading(false);
      setStatusText(null);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="p-3 border rounded bg-white">
      {/* <h3 className="mb-4">Sign Up & Subscribe</h3> */}

      {step === 1 && (
        <>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  name="first_name"
                  onChange={handleChange}
                  value={formData.first_name}
                  isInvalid={!!errors.first_name}
                />
                <Form.Control.Feedback type="invalid">{errors.first_name}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  name="last_name"
                  onChange={handleChange}
                  value={formData.last_name}
                  isInvalid={!!errors.last_name}
                />
                <Form.Control.Feedback type="invalid">{errors.last_name}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>

          <Button className="w-100" onClick={handleNextStep} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Next"}
          </Button>
        </>
      )}

      {step === 2 && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Card Number</Form.Label>
            <div className="form-control p-2">
              <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
            </div>
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Expiry</Form.Label>
                <div className="form-control p-2">
                  <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
                </div>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>CVC</Form.Label>
                <div className="form-control p-2">
                  <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
                </div>
              </Form.Group>
            </Col>
          </Row>

          {errors.general && <Alert variant="danger">{errors.general}</Alert>}
          {statusText && <Alert variant="info">{statusText}</Alert>}

          <Row>
            <Col>
              <Button variant="secondary" onClick={handleBack} disabled={loading}>
                Back
              </Button>
            </Col>
            <Col>
              <Button type="submit" className="w-100" disabled={!stripe || loading}>
                {loading ? <Spinner animation="border" size="sm" /> : "Pay & Sign Up"}
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Form>
  );
};

const SignUpForm = () => (
  <div className="auth-main-content m-auto m-1230 px-3">
    <Row className="align-items-center">
      {/* <Col lg={6} className="d-none d-lg-block">
        <img
          src="/images/register.jpg"
          className="rounded-3"
          alt="register"
          width={646}
          height={804}
        />
      </Col> */}

      <Col lg={12}>
        <div className="mw-600 ms-lg-auto bg-white p-5 rounded-4 shadow">
          <div className="d-flex mb-4 align-items-center justify-content-center">
            <img
              src="/images/IRE-logo-HighResLightBg-1024x384.png"
              className="rounded-3"
              alt="login"
              width={200}
              height={60}
            />
          </div>

          <h3 className="fs-28 mb-2" style={{
                background: "linear-gradient(to right, #4f46e5, #9333ea)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text", // for Firefox
                //display: "inline-block", // Ensures the text behaves as an inline-block element
              }}>Sign up to InstantRealEstate Dashboard</h3>
          <p className="fw-medium fs-16 mb-4" >
            Sign up with social account or enter your details
          </p>

          <Elements stripe={stripePromise}>
            <StripeSignUpInnerForm />
          </Elements>
        </div>
      </Col>
    </Row>
  </div>
);

export default SignUpForm;
