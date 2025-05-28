import React from "react";
import {Navigate } from "react-router-dom";
import useAuth from "../../store/useAuth";
import {ROUTES} from "../../config/routes";

import { Container, Spinner } from "react-bootstrap";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const user = useAuth((state) => state.user);
    const accessToken = useAuth((state) => state.accessToken);
    const isHydrated = useAuth((state) => state.isHydrated);

    // console.log(allowedRoles);
    
  
    if(!isHydrated) {
      
      return (
        <Container style={{ textAlign: 'center', marginTop: '40px' }}>
          <h3>Loading...</h3>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
      );    
    }

    

    if (!accessToken || !user) {
      return <Navigate to={ROUTES.AUTHENTICATION.SIGN_IN} />;
    }

    
    
  
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return <Navigate to={ROUTES.ERROR.UNAUTHORIZED} />;
    }
  
    return children;
  };
  
  export default ProtectedRoute;