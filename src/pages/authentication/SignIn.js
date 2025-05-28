import React from "react"; 
import SignInForm from "../../components/Authentication/SignInForm";
// import { Container } from "react-bootstrap";
// import ScrollToTop from "../../components/Layout/ScrollToTop";


const SignIn = () => {
  return (
    <div className="main-wrapper-content active">
      <div className="main-content d-flex flex-column"> 
        
        <SignInForm />
        
        
       </div>
     </div>
  );
};

export default SignIn;
