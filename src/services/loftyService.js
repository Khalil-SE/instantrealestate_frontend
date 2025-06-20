// src/services/loftyService.js
import API_ROUTES from '../config/apiRoutes';
import axiosInstance from './axiosInstance';

export const getLoftyRedirectUrl = async () => {
  try {
    const response = await axiosInstance.get(API_ROUTES.BASE_URL + API_ROUTES.USERS.PROPERTY.CONNECT_LOFTY, {
      withCredentials: true,
      maxRedirects: 0,
      validateStatus: (status) => status >= 200 && status < 400, // Handle redirect manually
    });

    return response.headers.location || null;
  } catch (error) {
    console.error('Error fetching Lofty redirect URL:', error);
    throw error;
  }
};

export const fetchLoftyProperties = async () => {
  const response = await axiosInstance.get(API_ROUTES.USERS.PROPERTY.LOFTY_PROPERTIES);
  return response.data;
};

export const getLoftyProperties = async () => {
  console.log("Here ---->");
  
  const res = await axiosInstance.get(API_ROUTES.BASE_URL + API_ROUTES.USERS.PROPERTY.LOFTY_PROPERTIES);
  return res.data;
};

export const markLoftyPropertyImported = async (listingId) => {
  const response = await axiosInstance.patch( API_ROUTES.BASE_URL + API_ROUTES.USERS.PROPERTY.LOFTY_PROPERTY_IMPORTED(listingId) );
  return response.data;
};