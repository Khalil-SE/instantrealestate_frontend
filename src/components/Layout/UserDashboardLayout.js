import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import UserLeftSidebar from "./UserLeftSidebar";
import UserTopNavbar from "./TopNavbar/UesrTopNavbar";
import ScrollToTop from "./ScrollToTop";
import Footer from "./Footer";




const UserDashboardLayout = () => {
  const [active, setActive] = useState(false);
  // const [pathname, setPathname] = useState("");

  // useEffect(() => {
  //   setPathname(window.location.pathname); // Get the current path
  // }, []);

  const toggleActive = () => {
    setActive(!active);
  };

//   const isAuthPage = [
//     "/authentication/sign-in",
//     "/authentication/sign-up",
//     "/authentication/forgot-password",
//     "/authentication/reset-password",
//     "/authentication/confirm-email",
//     "/authentication/lock-screen",
//     "/authentication/logout",
//     "/not-found",
//     "/",
//     "/features",
//     "/team",
//     "/faq",
//     "/contact",
//   ].includes(pathname);

  return (
    <>
      <div className={`main-wrapper-content ${active ? "active" : ""}`}>
        
          <UserLeftSidebar toggleActive={toggleActive} />
           

          <div className="main-content d-flex flex-column">
            <ScrollToTop />

            
            <UserTopNavbar toggleActive={toggleActive} />
              

            <Outlet />

            {/* {!isAuthPage && <Footer />} */}
          </div>
        <Footer />
      </div> 
    </>
  );
};
export default UserDashboardLayout;
