// SignUp page
import React from "react"; 
import SignUpForm from "../../components/Authentication/SignUpForm";

const SignUp = () => {
  return (
    <>
    <div className="main-wrapper-content active">
    <div className="main-content d-flex flex-column" style={{background: "linear-gradient(135deg, #f8f9ff 0%, #e8ecff 50%, #ddd9ff 100%)"}}> 
      <SignUpForm />
    </div>
    </div>
    {/* <ScrollToTop /> */}
    </>
  );
};

export default SignUp;
