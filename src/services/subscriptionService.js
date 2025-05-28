import axiosInstance from './axiosInstance';
import API_ROUTES from '../config/apiRoutes';



export const fetchPlans = async () => {
  const response = await axiosInstance.get(API_ROUTES.USERS.SUBSCRIPTIONS.PLANS);
  return response.data.results;
};

export const fetchCurrentSubscription = async () => {
  const response = await axiosInstance.get(API_ROUTES.USERS.SUBSCRIPTIONS.ME);
  return response.data;
};

export async function fetchSubscriptionHistory() {
  const res = await axiosInstance.get(API_ROUTES.USERS.SUBSCRIPTIONS.HISTORY);
  return res.data;
}

export const cancelSubscription = async () => {
  const res = await axiosInstance.post(API_ROUTES.USERS.SUBSCRIPTIONS.CANCEL);
  return res.data;
};

export const openBillingPortal = async () => {
  const response = await axiosInstance.post(API_ROUTES.USERS.SUBSCRIPTIONS.OPEN_BILLING_PORTAL);
  if (response.data?.url) {
    window.location.href = response.data.url;
  }
};

export async function createCheckoutSession(planId) {
  try {
    const response = await axiosInstance.post(API_ROUTES.USERS.SUBSCRIPTIONS.SESSION_CHECKOUT, {
      plan_id: planId,
    });
    return response.data; // contains { checkout_url: ... }
  } catch (error) {
    console.error("Failed to create checkout session:", error);
    throw error;
  }
}