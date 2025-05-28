// import axios from 'axios';
// import { API_ROUTES } from './/../config/apiRoutes';

// // POST login → get access + refresh tokens
// export const loginUser = (email, password) => {
//   return axios.post(API_ROUTES.BASE_URL + API_ROUTES.AUTH.LOGIN, { email, password });
// };

// // GET /me/ → get logged-in user profile
// export const getUserProfile = (accessToken) => {
//   return axios.get(API_ROUTES.BASE_URL + API_ROUTES.COMMON_USER_ADMIN.ME, {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });
// };

// // POST LOGOUT → logout user
// // This endpoint requires the refresh token to be sent in the request body
// // and the access token to be sent in the Authorization header.
// export const logoutUser = (refreshToken, accessToken) => {
//   return axios.post(
//     API_ROUTES.BASE_URL + API_ROUTES.AUTH.LOGOUT,
//     { refresh: refreshToken },
//     {
//       headers: {
//         Authorization: `Bearer ${accessToken}`
//       }
//     }
//   );
// };

// services/authService.js
import axios from 'axios'; // For public requests like login
import axiosInstance from './axiosInstance'; // For authenticated requests
import { API_ROUTES } from '../config/apiRoutes';


export const signupUser = async (data) => {
  try {
    const response = await axios.post(API_ROUTES.BASE_URL + API_ROUTES.AUTH.SIGNUP, data);
    return response;
  } catch (error) {
    console.error("Signup error:", error);
    throw error.response?.data || { detail: "Signup failed. Please try again." };
  }
};

export const verifyEmail = async (email, code) => {
  try {
    const response = await axios.post(API_ROUTES.BASE_URL + API_ROUTES.AUTH.VERIFY_EMAIL, {
      email,
      code,
    });
    return response;
  } catch (error) {
    console.error("Email verification error:", error);
    throw error.response?.data || { detail: "Verification failed. Please try again." };
  }
};

export const resendVerificationCode = async (email) => {
  try {
    const response = await axios.post(API_ROUTES.BASE_URL + API_ROUTES.AUTH.RESEND_VERIFICATION, {
      email,
    });
    return response.data;
  } catch (error) {
    console.error("Resend verification code error:", error);
    throw error.response?.data || { detail: "Failed to resend code. Please try again." };
  }
};

export const requestPasswordReset = async (email) => {
  try {
    const response = await axios.post(API_ROUTES.BASE_URL + API_ROUTES.AUTH.RESET_PASSWORD_REQUEST, {
      email,
    });
    return response.data;
  } catch (error) {
    console.error("Reset code request error:", error);
    throw error.response?.data || { detail: "Failed to request reset code." };
  }
};

export const resetPassword = async (email, code, newPassword) => {
  try {
    const response = await axios.post(API_ROUTES.BASE_URL + API_ROUTES.AUTH.RESET_PASSWORD, {
      email,
      code,
      new_password: newPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Reset password error:", error);
    throw error.response?.data || { detail: "Failed to reset password." };
  }
};

// POST login → public route, uses plain axios
export const loginUser = (email, password) => {
  return axios.post(API_ROUTES.BASE_URL + API_ROUTES.AUTH.LOGIN, { email, password });
};

// GET /me/ → authenticated route, uses axiosInstance
export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get(API_ROUTES.COMMON_USER_ADMIN.ME);
    return response;
  } catch (error) {
    console.error("Failed to get user profile", error);
    throw error.response?.data || { detail: "Failed to get profile" };
  }
};

// POST logout → uses axiosInstance (token headers are auto-attached)
export const logoutUser = async (refreshToken) => {
  try {
    const response = await axiosInstance.post(API_ROUTES.AUTH.LOGOUT, {
      refresh: refreshToken,
    });
    return response.data;
  } catch (error) {
    console.error("Logout failed", error);
    throw error.response?.data || { detail: "Failed to logout" };
  }
};



// Social login with Google
export const socialLoginGoogle = async (id_token) => {
  try {
    const response = await axios.post(API_ROUTES.BASE_URL + API_ROUTES.AUTH.SOCIAL_LOGIN_GOOGLE, {
      id_token,
    });
    return response.data;
  } catch (error) {
    console.error("Google social login error:", error);
    throw error.response?.data || { detail: "Google login failed." };
  }
};

export const socialLoginFacebook = async (accessToken) => {}