// SignUp page
import React from "react"; 
import SignUpForm from "../../components/Authentication/SignUpForm";

const SignUp = () => {
  return (
    <>
    <div className="main-wrapper-content active">
    <div className="main-content d-flex flex-column"> 
      <SignUpForm />
    </div>
    </div>
    {/* <ScrollToTop /> */}
    </>
  );
};

export default SignUp;
