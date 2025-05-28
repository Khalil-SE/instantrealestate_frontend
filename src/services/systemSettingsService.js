// import  axios from 'axios';
// import API_ROUTES from '../config/apiRoutes';
// import useAuth from '../store/useAuth';

// export const getSystemSettings = async () => {
//     const accessToken = useAuth.getState().accessToken;
  
//     try {
//       const response = await axios.get(
//         API_ROUTES.BASE_URL + API_ROUTES.ADMIN.SYSYTEM_SETTINGS,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching system settings", error);
//       throw error.response?.data || { detail: "Failed to fetch settings" };
//     }
//   };
  
//   export const updateSystemSettings = async (data) => {
//     const accessToken = useAuth.getState().accessToken;
  
//     try {
//       const response = await axios.patch(
//         API_ROUTES.BASE_URL + API_ROUTES.ADMIN.SYSYTEM_SETTINGS,
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Error updating system settings", error);
//       throw error.response?.data || { detail: "Failed to update settings" };
//     }
//   };

// services/SystemSettingsService.js
import axiosInstance from './axiosInstance'; 
import API_ROUTES from '../config/apiRoutes';

export const getSystemSettings = async () => {
  try {
    const response = await axiosInstance.get(API_ROUTES.ADMIN.SYSYTEM_SETTINGS);
    return response.data;
  } catch (error) {
    console.error("Error fetching system settings", error);
    throw error.response?.data || { detail: "Failed to fetch settings" };
  }
};

export const updateSystemSettings = async (data) => {
  try {
    const response = await axiosInstance.patch(API_ROUTES.ADMIN.SYSYTEM_SETTINGS, data);
    return response.data;
  } catch (error) {
    console.error("Error updating system settings", error);
    throw error.response?.data || { detail: "Failed to update settings" };
  }
};
