import axiosInstance from "./axiosInstance";
import { API_ROUTES } from "../config/apiRoutes";

export const getAllProperties = async (params) => {
  const response = await axiosInstance.get(
    `${API_ROUTES.BASE_URL}${API_ROUTES.USERS.PROPERTY.LIST}`,
    { params }
  );
  return response.data;
};

export const updateProperty = async (id, payload) => {
  const response = await axiosInstance.patch(
    `${API_ROUTES.BASE_URL}${API_ROUTES.USERS.PROPERTY.DETAIL(id)}`,
    payload
  );
  return response.data;
};

export const deleteProperty = async (id) => {
  return await axiosInstance.delete(
    `${API_ROUTES.BASE_URL}${API_ROUTES.USERS.PROPERTY.DETAIL(id)}`
  );
};

export const getProperty = async (id) => {
  const response = await axiosInstance.get(`${API_ROUTES.USERS.PROPERTIES.DETAIL}${id}/`);
  return response.data;
};

export const createProperty = async (payload) => {
  const response = await axiosInstance.post(API_ROUTES.USERS.PROPERTY.LIST, payload);
  return response.data;
};



