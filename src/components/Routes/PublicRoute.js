import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../store/useAuth";
import { ROUTES } from "../../config/routes";

import {  Spinner } from "react-bootstrap";

const PublicRoute = ({ children, restricted = false }) => {
  const user = useAuth((state) => state.user);
  const accessToken = useAuth((state) => state.accessToken);
  const isHydrated = useAuth((state) => state.isHydrated);

  if (!isHydrated) {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 vw-100">
        <h3>Loading...</h3>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (restricted && accessToken && user) {
    // If user already logged in and tries to access /sign-in, /sign-up etc
    if (user.role === "admin") {
      return <Navigate to={ROUTES.ADMIN.DASHBOARD} replace />;
    } else if (user.role === "user") {
      return <Navigate to={ROUTES.USER.DASHBOARD} replace />;
    }
  }

  return children;
};

export default PublicRoute;
