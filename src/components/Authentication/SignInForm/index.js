import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';


import { Row, Col, Form, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";



import FacebookLoginButton from "../SocialLogInButtons/FacebookLoginButton";


import useAuth from "../../../store/useAuth"; // Zustand store
import { loginUser, getUserProfile } from "../../../services/authService";
import { ROUTES } from "../../../config/routes";
import GoogleLoginButton from "../SocialLogInButtons/GoogleLoginButton";

const SignInForm = () => {

  const setUser = useAuth((state) => state.setUser);
  const setTokens = useAuth((state) => state.setTokens);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await loginUser(email, password);
      const { access, refresh } = res.data;
      setTokens(access, refresh);

      const profileRes = await getUserProfile(access);
      // console.log("Profile Response:", profileRes.data);
      setUser(profileRes.data, true); // Persist user data in localStorage

      
      
      if (profileRes.data.role === 'admin') {
        navigate(ROUTES.ADMIN.DASHBOARD);
      } else {
        navigate(ROUTES.USER.DASHBOARD);
      }
      
    } catch (err) {
      console.error("Login Error:", err);
      if (err.response?.data?.non_field_errors === 'Please verify your email to login.') {
        
        navigate(ROUTES.AUTHENTICATION.CONFIRM_EMAIL, { state: { email } });
        return;
      }
      setError(err.response?.data?.detail || err.response?.data?.non_field_errors || 'Login failed');
      // setError(err.response?.data?.detail || 'Login failed');
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
              src="/images/login.jpg"
              className="rounded-3"
              alt="login"
              width={646}
              height={804}
            />
          </Col>

          <Col lg={6}>
            <div className="mw-480 ms-lg-auto">
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

              <h3 className="fs-28 mb-2">Welcome back to Instant RealEstate!</h3>
              <p className="fw-medium fs-16 mb-4">
                Sign In with social account or enter your details
              </p>

              <div className="row justify-content-center">
                <div className="col-lg-6 col-sm-6">
                  
                {/* credentialResponse => {
                      console.log(credentialResponse);
                      // credentialResponse.credential is your id_token
                      // We will send it to your backend now
                      
                    } */}

                  
                  {/* <GoogleLogin /> */}
                  <GoogleLoginButton />

                  {/* <a
                    href="https://www.google.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-secondary bg-transparent w-100 py-2 hover-bg mb-4"
                    style={{
                      borderColor: "#D6DAE1",
                    }}
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
                  <FacebookLoginButton  />
                  {/* <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-secondary bg-transparent w-100 py-2 hover-bg mb-4"
                    style={{
                      borderColor: "#D6DAE1",
                    }}
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

              <Form onSubmit={handleLogin}>

                {error && <p className="text-danger small">{error }</p>}

                <Form.Group className="mb-4">
                  <label className="label text-secondary">Email Address</label>
                  <Form.Control
                    type="email"
                    className="h-55"
                    placeholder="myemail@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <label className="label text-secondary">Password</label>
                  <Form.Control
                    type="password"
                    className="h-55"
                    placeholder="Type password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Link
                    to={ ROUTES.AUTHENTICATION.FORGOT_PASSWORD }
                    className="fw-medium text-primary text-decoration-none"
                    
                  >
                    Forgot Password?
                  </Link>
                </Form.Group>

                <Form.Group className="mb-4">
                  <button
                    type="submit"
                    className="btn btn-primary fw-medium py-2 px-3 w-100"
                    disabled={loading}
                  >
                    <div className="d-flex align-items-center justify-content-center py-1">
                      { loading || 
                        <>
                          <span className="material-symbols-outlined fs-20 text-white me-2">
                            login
                          </span>
                          <span>Sign In</span>
                        </>
                      }
                      {loading &&
                        <span>
                          <Spinner animation="border" role="status" variant="light">
                            <span className="visually-hidden">Loading...</span>
                          </Spinner>
                        </span>
                      }

                    </div>
                  </button>
                </Form.Group>

                <Form.Group>
                  <p>
                    Don’t have an account.{" "}
                    <Link
                      to= { ROUTES.AUTHENTICATION.SIGN_UP }
                      className="fw-medium text-primary text-decoration-none"
                    >
                      Sign Up
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

export default SignInForm;
