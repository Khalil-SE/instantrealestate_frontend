import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../store/useAuth";
import { ROUTES } from "../../config/routes";

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const user = useAuth((state) => state.user);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (user?.role === "admin") {
        navigate(ROUTES.ADMIN.DASHBOARD);
      } else if (user?.role === "user") {
         navigate(ROUTES.USER.DASHBOARD);
      } else {
         navigate(ROUTES.AUTHENTICATION.SIGN_IN);
      }
    }, 3000); //  3 seconds

    return () => clearTimeout(timeout); // cleanup if component unmounts
  }, [navigate, user]);
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 vw-100">
        <div className="not-found-content text-center">
        <img
          src="/images/unauthorized-401.png"
          className="mb-4"
          alt="error"
          width={400}
          height={400}
        />
    
        <h3 className="fs-24 mb-3">
          Looks like you are not authorized to this page.
        </h3>
    
        <p className="mb-4">
          But no worries! We will redirect you to your dashboard.
        </p>
    
        
        </div>
      </div>
      );
}
export default UnauthorizedPage;