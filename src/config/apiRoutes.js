
export const API_ROUTES = {
  BASE_URL : process.env.REACT_APP_BACKEND_URL,
  AUTH: {
    LOGIN: 'users/login/',
    SIGNUP: 'users/signup/',
    LOGOUT: 'users/logout/',
    VERIFY_EMAIL: 'users/verify-email/',
    RESEND_VERIFICATION: 'users/resend-verification-code/',
    RESET_PASSWORD_REQUEST: 'users/request-reset-password/',
    RESET_PASSWORD: 'users/reset-password/',
    REFRESH_TOKEN: 'users/token/refresh/',

    SOCIAL_LOGIN_GOOGLE: 'users/social-login/google/'
  },
  COMMON_USER_ADMIN: {
    ME: 'users/me/',
    ME_UPDATE: 'users/me/update/',
    UPLOAD_PICTURE: 'users/upload-picture/',
  },
  USERS: {
    LOFTY_PROPERTIES: 'lofty/fetch-properties/',
    SUBSCRIPTIONS: {
      ME: 'subscriptions/me/',
      PLANS: 'subscriptions/plans/',
      HISTORY: 'subscriptions/history/',
      CANCEL: 'subscriptions/cancel/',
      SESSION_CHECKOUT: 'subscriptions/create-checkout-session/',
      OPEN_BILLING_PORTAL: 'subscriptions/open-billing-portal/',
    },
    INSTABOT: {
      INSTABOTS: 'instabot/instabots/',
      PUBLIC_REPLY_TEMPLATES: 'instabot/public-reply-templates/',
      
      KEYWORD_CHECK: 'shared/check-keyword/',
    },
  },
  ADMIN: {
    USERS: 'users/admin/users/',
    SYSYTEM_SETTINGS: 'system/settings/',
  },

  PUBLIC: {
    DATA_BY_KEY: 'users/data-by-key/', // Needs <api_key> appended
  },
};

export default API_ROUTES;
