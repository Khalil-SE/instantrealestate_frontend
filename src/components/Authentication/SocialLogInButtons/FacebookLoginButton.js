import React, { useEffect, useState } from "react"; // 
import { useNavigate } from "react-router-dom";
import { socialLoginFacebook, getUserProfile } from "../../../services/authService";
import useAuth from "../../../store/useAuth";
import { loadFacebookSdk } from "../../../utils/loadFacebookSdk"; //  
import { ROUTES } from "../../../config/routes";


const FacebookLoginButton = () => {
  const setTokens = useAuth((state) => state.setTokens);
  const setUser = useAuth((state) => state.setUser);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false); //  loading state
  const [error, setError] = useState(null); //  error state

  useEffect(() => {
    loadFacebookSdk(); //  Load the SDK once when component mounts
  }, []);

  const handleFacebookLogin = () => {
    if (!window.FB) {
      console.error("Facebook SDK not loaded");
      setError("Facebook SDK not loaded. Please try again.");
      return;
    }

    setLoading(true);
    setError(null);

    window.FB.login(
      (response) => {
        if (response.authResponse) {
          handleFacebookResponse(response.authResponse);
        } else {
          console.error("Facebook login cancelled or failed.");
          setError("Facebook login was cancelled or failed.");
          setLoading(false);
        }
      },
      { scope: "public_profile,email" }
    );
  };

  const handleFacebookResponse = async (authResponse) => {
    try {
      const { accessToken } = authResponse;
      const tokens = await socialLoginFacebook(accessToken);

      setTokens(tokens.access, tokens.refresh);

      const userProfile = await getUserProfile(tokens.access);
      setUser(userProfile, true);

      if (userProfile.role === "admin") {
        navigate(ROUTES.ADMIN.DASHBOARD);
      } else {
        navigate(ROUTES.USER.DASHBOARD);
      }
    } catch (error) {
      console.error("Facebook login failed:", error);
      setError("Something went wrong during Facebook login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleFacebookLogin}
        className="btn btn-outline-secondary bg-transparent w-100 py-2 hover-bg mb-4"
        style={{
          borderColor: "#D6DAE1",
          position: "relative",
          opacity: loading ? 0.7 : 1,
        }}
        disabled={loading}
      >
        {loading ? (
          <div className="d-flex justify-content-center">
          <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
        </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <img
              src="/images/facebook2.svg"
              alt="facebook2"
              width={25}
              height={25}
              style={{ marginRight: "8px" }}
            />
            <span className="text-secondary">Login with Facebook</span>
          </div>
        )}
      </button>

      {error && ( // 👈 Show error if exists
        <div className="alert alert-danger mt-2 text-center" role="alert">
          {error}
        </div>
      )}
    </>
  );
};

export default FacebookLoginButton;
