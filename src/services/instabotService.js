import axiosInstance from "./axiosInstance";
import { API_ROUTES } from "../config/apiRoutes";


export const createInstaBot = async (payload) => {
  const response = await axiosInstance.post(
    API_ROUTES.BASE_URL + API_ROUTES.USERS.INSTABOT.INSTABOTS,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
export const getInstaBotById = async (id) => {
  const response = await axiosInstance.get(
    `${API_ROUTES.BASE_URL}${API_ROUTES.USERS.INSTABOT.INSTABOTS}${id}/`
  );
  return response.data;
};
export const updateInstaBot = async (id, payload) => {
  const response = await axiosInstance.patch(
    `${API_ROUTES.BASE_URL}${API_ROUTES.USERS.INSTABOT.INSTABOTS}${id}/`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const deleteInstaBot = async (id) => {
  const response = await axiosInstance.delete(
    `${API_ROUTES.BASE_URL}${API_ROUTES.USERS.INSTABOT.INSTABOTS}${id}/`
  );
  return response.data;
};

export const getAllInstaBots = async ({
  page = 1,
  search = "",
  ordering = "-id",
}) => {
  const params = new URLSearchParams();
  params.append("page", page);
  if (search) params.append("search", search);
  if (ordering) params.append("ordering", ordering);

  const response = await axiosInstance.get(
    `${API_ROUTES.BASE_URL}${API_ROUTES.USERS.INSTABOT.INSTABOTS}?${params.toString()}`
  );
  return response.data; // returns { count, results, next, previous }
};




// export const createInstaBot = async (formData) => {
//   const response = await axiosInstance.post(API_ROUTES.BASE_URL + API_ROUTES.USERS.INSTABOT.INSTABOTS, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
//   return response.data;
// };
// export const updateInstaBotImageUrl = async (instabotId, imageUrl) => {
//   const response = await axiosInstance.patch(
//     `${API_ROUTES.BASE_URL}${API_ROUTES.USERS.INSTABOT.INSTABOTS}/${instabotId}/`,
//     { image_url: imageUrl }
//   );
//   return response.data;
// };


export const checkKeywordAvailability = async (keywordText) => {
  
  try {
    const response = await axiosInstance.get(
      `${API_ROUTES.BASE_URL + API_ROUTES.USERS.INSTABOT.KEYWORD_CHECK}?text=${keywordText}`
    );
    
    return response.data.available;
  } catch (err) {
    console.error(" Keyword availability check failed:", err);
    return false;
  }
};
// export const checkKeywordAvailability = async (keywordText) => {
//   console.log("Keyword text -->", keywordText);
//   console.log(`${API_ROUTES.BASE_URL + API_ROUTES.INSTABOT.KEYWORD_CHECK}?text=${keywordText}`);
  
//   const response = await axiosInstance.get(
//     `${API_ROUTES.BASE_URL + API_ROUTES.INSTABOT.KEYWORD_CHECK}?text=${keywordText}`
//   );
//   console.log("Keyword text", keywordText);
//   return response.data.available;
// };




export const fetchPublicReplyTemplates = async () => {
  try {
    const response = await axiosInstance.get(API_ROUTES.BASE_URL + API_ROUTES.USERS.INSTABOT.PUBLIC_REPLY_TEMPLATES);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching public reply templates:", error);
    throw error;
  }
};
export const deletePublicReplyTemplate = async (templateId) => {
  if (!templateId) throw new Error("Template ID is required");

  const url = `${API_ROUTES.BASE_URL}${API_ROUTES.USERS.INSTABOT.PUBLIC_REPLY_TEMPLATES}${templateId}/`;
  return await axiosInstance.delete(url);
};
export const createPublicReplyTemplate = async (data) => {
  const response = await axiosInstance.post(API_ROUTES.BASE_URL + API_ROUTES.USERS.INSTABOT.PUBLIC_REPLY_TEMPLATES, data);
  return response.data;
};

export const updatePublicReplyTemplate = async (id, data) => {
  const response = await axiosInstance.put(
    `${API_ROUTES.BASE_URL + API_ROUTES.USERS.INSTABOT.PUBLIC_REPLY_TEMPLATES}${id}/`,
    data
  );
  return response.data;
};


// export const createInstaBot = async (data) => {
//   const response = await axiosInstance.post(BASE, data);
//   return response.data;
// };

// export const fetchInstaBots = async () => {
//   const response = await axiosInstance.get(BASE);
//   return response.data;
// };

// export const getInstaBot = async (id) => {
//   const response = await axiosInstance.get(`${BASE}${id}/`);
//   return response.data;
// };

// export const updateInstaBot = async (id, data) => {
//   const response = await axiosInstance.put(`${BASE}${id}/`, data);
//   return response.data;
// };

// export const deleteInstaBot = async (id) => {
//   const response = await axiosInstance.delete(`${BASE}${id}/`);
//   return response.data;
// };

// // (Optional: Keyword check function)
// export const checkKeywordAvailability = async (text) => {
//   const response = await axiosInstance.get(`${API_ROUTES.BASE_URL + API_ROUTES.INSTABOT.KEYWORD_CHECK}?text=${text}`);
//   return response.data;
// };