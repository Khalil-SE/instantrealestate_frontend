import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ROUTES } from "./config/routes";

import {
  SignIn,
  SignUp,
  ConfirmEmail,
  ForgotPassword,
} from "./pages/authentication";

import AdminDashboardLayout from "./components/Layout/AdminDashboardLayout";
import UserDashboardLayout from "./components/Layout/UserDashboardLayout";
import {
  ProtectedRoute,
  RequireSubscription,
  PublicRoute,
} from "./components/Routes";
import SessionExpiredModal from "./components/Modal/SessionExpiredModal";
import {
  AdminDashboard,
  AdminProfile,
  AdminSystemSettings,
  UsersManagment,
} from "./pages/admin";
import {
  UserDashboard,
  UserProfile,
  SubscriptionPage,
  PrivacyPolicy,
  TermsConditions,
} from "./pages/user";

// import  CreateInstaBot  from "./pages/user/instaBot/CreateEditInstaBot";
import { CreateEditInstaBot, InstaBotManagement } from "./pages/user/instaBot";

import LoftyProperties from "./pages/user/lofty/LoftyProperties";

import { UnauthorizedPage } from "./pages/Errors";

import useAuth from "./store/useAuth";

const App = () => {
  // console.log(process.env.REACT_APP_BASE_URL);
  // ROUTES.BASE_URL = process.env.REACT_APP_BASE_URL;
  // const isHydrated = useAuth((state) => state.isHydrated);
  const hydrateAuth = useAuth((state) => state.hydrateAuth);

  useEffect(() => {
    // Hydrate auth state from localStorage on app load
    // console.log("Hydrating auth state from localStorage...");
    hydrateAuth();
  }, []);

  return (
    <>
    
      {/* <div className={`main-wrapper-content ${active ? "active" : ""}`}> */}
      <Router>
        <SessionExpiredModal />
        <Routes>
          {/* Front Pages */}
          {/* <Route path= {ROUTES.INDEX} element={<SignIn />} /> */}

          <Route
            path={ROUTES.AUTHENTICATION.SIGN_IN}
            element={
              <PublicRoute restricted={true}>
                <SignIn />
              </PublicRoute>
            }
          />
          <Route
            path={ROUTES.AUTHENTICATION.SIGN_UP}
            element={
              <PublicRoute restricted={true}>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route
            path={ROUTES.AUTHENTICATION.CONFIRM_EMAIL}
            element={<ConfirmEmail />}
          />
          <Route
            path={ROUTES.AUTHENTICATION.FORGOT_PASSWORD}
            element={<ForgotPassword />}
          />

          {/* <ROUTES.ERROR.NOT_FOUND} element={<UnauthorizedPage />} /> */}
          <Route
            path={ROUTES.ERROR.UNAUTHORIZED}
            element={<UnauthorizedPage />}
          />

          {/* Admin Dashboard Routing */}
          <Route
            path={ROUTES.ADMIN.DASHBOARD}
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path={ROUTES.ADMIN.PROFILE} element={<AdminProfile />} />
            <Route
              path={ROUTES.ADMIN.SYSTEM_SETTINGS}
              element={<AdminSystemSettings />}
            />
            <Route
              path={ROUTES.ADMIN.USERS_MANAGEMENT}
              element={<UsersManagment />}
            />

            {/* <Route path={ROUTES.ERROR.UNAUTHORIZED} element={<UnauthorizedPage />} /> */}
          </Route>

          {/* User Dashboard Routing */}
          <Route
            path={ROUTES.USER.DASHBOARD}
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <UserDashboardLayout />
                
              </ProtectedRoute>
            }
          >
            <Route
              index
              path={ROUTES.USER.DASHBOARD_INDEX}
              // element={<UserDashboard />}
              element={<CreateEditInstaBot />}
              
            />

            {/* It will stay outside the Subscription Guard(RequireSubscription) */}
            <Route
              path={ROUTES.USER.SUBSCRIPTION}
              element={<SubscriptionPage />}
            />

            <Route element={<RequireSubscription />}>
              <Route path={ROUTES.USER.PROFILE} element={<UserProfile />} />
              <Route
                path={ROUTES.USER.INSTABOT.INSTABOTS}
                element={<InstaBotManagement />}
                />

                <Route
                path={ROUTES.USER.INSTABOT.CREATE_INSTABOT}
                element={<CreateEditInstaBot />}
                />
                <Route
                path={ROUTES.USER.INSTABOT.EDIT_INSTABOT(":id")}
                element={<CreateEditInstaBot />}
                />

              <Route
                path={ROUTES.USER.PRIVACY_POLICY}
                element={<PrivacyPolicy />}
              />

              <Route
                path={ROUTES.USER.TERMS_CONDITIONS}
                element={<TermsConditions />}
              />
              <Route
                path={ROUTES.USER.LOFTY_PROPERTIES}
                element={<LoftyProperties />}
              />

              {/* <Route path={ROUTES.ERROR.UNAUTHORIZED} element={<UnauthorizedPage />} /> */}
            </Route>
          </Route>
        </Routes>
      </Router>
      {/* </div>  */}

 <ToastContainer
        position="top-right"
        autoClose={3000}     // Default: 5000ms, you can customize it
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      
    </>
  );
};
export default App;
