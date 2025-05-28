
export const ROUTES = {
    INDEX : '/',
    AUTHENTICATION: {
        SIGN_IN: '/sign-in',
        SIGN_UP: '/sign-up',
        RESET_PASSWORD: '/reset-password',
        CONFIRM_EMAIL: '/email-confirmation',
        FORGOT_PASSWORD: '/forgot-password'
      },
      ERROR: {
        NOT_FOUND: '/not-found',
        UNAUTHORIZED: '/unauthorized',
      },
      ADMIN: {
        DASHBOARD: '/admin',
        // DASHBOARD_INDEX: '/admin/dashboard',
        PROFILE: '/admin/profile',
        SYSTEM_SETTINGS: '/admin/system-settings',
        USERS_MANAGEMENT: '/admin/users-management',
        
      },
      USER: {
        DASHBOARD: '/user',
        // DASHBOARD_INDEX: '/user/dashboard',
        PROFILE: '/user/profile',
        SUBSCRIPTION: '/user/subscription',
        INSTABOT: {
          INSTABOTS: '/user/instabot',
          CREATE_INSTABOT: '/user/instabot/create',
          EDIT_INSTABOT: (id) => `/user/instabot/edit/edit/${id}`,
          INSTABOT_DETAILS: '/user/instabot/details/:id',
        },
        PRIVACY_POLICY: '/user/privacy-policy',
        TERMS_CONDITIONS: '/user/terms-conditions',
        LOFTY_PROPERTIES: '/user/lofty-properties',
      },
};