
import { create } from 'zustand';

const useAuth = create((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isHydrated: false,  //  Track hydration (Hydration means loading initial state from localStorage)
  sessionExpired: false, //  Track session expiration based on refresh token

  
  subscription: null, //  Track subscription state


  setUser: (user, persist = false) => {
    if (persist && user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
    set(() => ({ user: user || null }));
  },

  setTokens: (accessToken, refreshToken) => {
    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }

    set(() => ({
      accessToken: accessToken || null,
      refreshToken: refreshToken || null,
    }));
  },

  hydrateAuth: () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const userData = localStorage.getItem("user");

    set(() => ({
      accessToken: accessToken || null,
      refreshToken: refreshToken || null,
      user: userData ? JSON.parse(userData) : null,
      isHydrated: true,  //  Mark hydration complete
    }));
  },

  clearAuth: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    set(() => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isHydrated: true,  // Still mark as done
    }));
  },
  setSessionExpired: (expired) => set(() => ({ sessionExpired: expired })), //  Set session expiration state
  
  setSubscription: (subscription) => set({ subscription }),  //  Set subscription state
}));

export default useAuth;





// V1
// import { create } from 'zustand';



// const useAuth = create((set) => ({
//   user: null,
//   accessToken: null,
//   refreshToken: null,

//   setUser: (user) => set(() => ({ user })),
//   setTokens: (accessToken, refreshToken) =>
//     set(() => ({ accessToken, refreshToken })),
//   clearAuth: () =>
//     set(() => ({
//       user: null,
//       accessToken: null,
//       refreshToken: null,
//     })),
// }));

// export default useAuth;


// V2

// import { create } from 'zustand';

// const useAuth = create((set) => ({
//   user: null,
//   accessToken: null,
//   refreshToken: null,

//   //  Set user and optionally persist
//   setUser: (user, persist = false) => {
//     if (persist && user) {
//       localStorage.setItem("user", JSON.stringify(user));
//     }
//     set(() => ({ user: user || null }));
//   },

//   //  Set tokens and persist to localStorage
//   setTokens: (accessToken, refreshToken) => {
//     if (accessToken && refreshToken) {
//       localStorage.setItem("accessToken", accessToken);
//       localStorage.setItem("refreshToken", refreshToken);
//     } else {
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");
//     }

//     set(() => ({
//       accessToken: accessToken || null,
//       refreshToken: refreshToken || null,
//     }));
//   },

//   //  Hydrate auth state from localStorage
//   hydrateAuth: () => {
//     const accessToken = localStorage.getItem("accessToken");
//     const refreshToken = localStorage.getItem("refreshToken");
//     const userData = localStorage.getItem("user");

//     set(() => ({
//       accessToken: accessToken || null,
//       refreshToken: refreshToken || null,
//       user: userData ? JSON.parse(userData) : null,
//     }));
//   },

//   //  Logout and clean up everything
//   clearAuth: () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("user");

//     set(() => ({
//       user: null,
//       accessToken: null,
//       refreshToken: null,
//     }));
//   },
// }));

// export default useAuth;
