// import React, { useState } from "react";
// import { GoogleLogin } from "@react-oauth/google";
// import { Spinner } from "react-bootstrap";
// import { socialLoginGoogle, getUserProfile } from "../../../services/authService";
// import { useNavigate } from "react-router-dom";
// import useAuth from "../../../store/useAuth";
// import { ROUTES } from "../../../config/routes";

// const GoogleLoginButton = () => {
//   const [loading, setLoading] = useState(false);
//   const setTokens = useAuth((state) => state.setTokens);
//   const setUser = useAuth((state) => state.setUser);
//   const navigate = useNavigate();

//   const handleGoogleSuccess = async (credentialResponse) => {
//     if (!credentialResponse?.credential) {
//       console.error("No credential returned from Google");
//       return;
//     }

//     try {
//       setLoading(true);
//       const tokens = await socialLoginGoogle(credentialResponse.credential);

//       setTokens(tokens.access, tokens.refresh);

//       const userProfile = await getUserProfile(tokens.access);
//       setUser(userProfile.data, true);

//       if (userProfile.data.role === "admin") {
//         navigate(ROUTES.ADMIN.DASHBOARD);
//       } else {
//         navigate(ROUTES.USER.DASHBOARD);
//       }
//     } catch (error) {
//       console.error("Google login failed:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleFailure = (error) => {
//     console.error("Google login error:", error);
//   };

//   return (
//     <GoogleLogin
//       onSuccess={handleGoogleSuccess}
//       onError={handleGoogleFailure}
//       useOneTap
//       render={({ onClick, disabled }) => (
//         <button
//           type="button"
//           onClick={onClick}
//           disabled={loading || disabled}
//           className="btn btn-outline-secondary bg-transparent w-100 py-2 hover-bg mb-4 d-flex align-items-center justify-content-center"
//           style={{ borderColor: "#D6DAE1" }}
//         >
//           {loading ? (
//             <Spinner animation="border" size="sm" />
//           ) : (
//             <>
//               <img
//                 src="/images/google.svg"
//                 alt="google"
//                 width={25}
//                 height={25}
//                 className="me-2"
//               />
//               <span className="text-secondary">Login with Google</span>
//             </>
//           )}
//         </button>
//       )}
//     />
//   );
// };

// export default GoogleLoginButton;

// import React, { useState } from "react";
// import { GoogleLogin } from "@react-oauth/google";
// import { useNavigate } from "react-router-dom";
// // import { Spinner } from "react-bootstrap";
// import { socialLoginGoogle, getUserProfile } from "../../../services/authService";
// import useAuth from "../../../store/useAuth";
// import { ROUTES } from "../../../config/routes";

// const GoogleLoginButton = () => {
//   const setTokens = useAuth((state) => state.setTokens);
//   const setUser = useAuth((state) => state.setUser);
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false); // Local loading
//   const [error, setError] = useState(null); // Local error

//   const handleGoogleSuccess = async (credentialResponse) => {
//     if (!credentialResponse?.credential) {
//       console.error("No credential returned from Google");
//       setError("Google login failed. Please try again.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);

//       const tokens = await socialLoginGoogle(credentialResponse.credential);

//       setTokens(tokens.access, tokens.refresh);

//       const userProfile = await getUserProfile(tokens.access);
//       setUser(userProfile.data, true);

//       if (userProfile.data.role === "admin") {
//         navigate(ROUTES.ADMIN.DASHBOARD);
//       } else {
//         navigate(ROUTES.USER.DASHBOARD);
//       }
//     } catch (error) {
//       console.error("Google login failed:", error);
//       setError("Something went wrong during Google login. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleFailure = (error) => {
//     console.error("Google login error:", error);
//     setError("Google login failed. Please try again.");
//   };

//   return (
//     <>
//       <GoogleLogin
//         onSuccess={handleGoogleSuccess}
//         onError={handleGoogleFailure}
//         useOneTap
//         render={({ onClick, disabled }) => (
//           <button
//             type="button"
//             onClick={onClick}
//             disabled={loading || disabled}
//             className="btn btn-outline-secondary bg-transparent w-100 py-2 hover-bg mb-4"
//             style={{
//               borderColor: "#D6DAE1",
//               position: "relative",
//               opacity: loading ? 0.7 : 1,
//             }}
//           >
//             {loading ? (
//               <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
//             ) : (
//               <div className="d-flex justify-content-center align-items-center">
//                 <img
//                   src="/images/google.svg"
//                   alt="google"
//                   width={25}
//                   height={25}
//                   style={{ marginRight: "8px" }}
//                 />
//                 <span className="text-secondary">Login with Google</span>
//               </div>
//             )}
//           </button>
//         )}
//       />

//       {error && ( // 👈 Show error if exists
//         <div className="alert alert-danger mt-2 text-center" role="alert">
//           {error}
//         </div>
//       )}
//     </>
//   );
// };

// export default GoogleLoginButton;

import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { socialLoginGoogle, getUserProfile } from "../../../services/authService";
import useAuth from "../../../store/useAuth";
import { ROUTES } from "../../../config/routes";

const GoogleLoginButton = () => {
  const setTokens = useAuth((state) => state.setTokens);
  const setUser = useAuth((state) => state.setUser);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleSuccess = async (credentialResponse) => {
    if (!credentialResponse?.credential) {
      setError("Google login failed. Please try again.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const tokens = await socialLoginGoogle(credentialResponse.credential);
      setTokens(tokens.access, tokens.refresh);

      const userProfile = await getUserProfile(tokens.access);
      setUser(userProfile.data, true);

      navigate(userProfile.data.role === "admin" ? ROUTES.ADMIN.DASHBOARD : ROUTES.USER.DASHBOARD);
    } catch (error) {
      setError("Something went wrong during Google login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleFailure = (error) => {
    setError("Google login failed. Please try again.");
  };

  return (
    <>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleFailure}
        useOneTap
        render={({ onClick, disabled }) => (
          <button
            type="button"
            onClick={onClick} // Directly trigger Google login
            disabled={loading || disabled}
            className="btn btn-outline-secondary bg-transparent w-100 py-2 hover-bg mb-4"
            style={{
              borderColor: "#D6DAE1",
              position: "relative",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
              </div>
            ) : (
              <div className="d-flex justify-content-center align-items-center">
                <img src="/images/google.svg" alt="google" width={25} height={25} style={{ marginRight: "8px" }} />
                <span className="text-secondary">Login with Google</span>
              </div>
            )}
          </button>
        )}
      />

      {error && (
        <div className="alert alert-danger mt-2 text-center" role="alert">
          {error}
        </div>
      )}
    </>
  );
};

export default GoogleLoginButton;
