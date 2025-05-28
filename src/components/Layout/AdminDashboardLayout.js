import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import AdminLeftSidebar from "./AdminLeftSidebar";
import AdminTopNavbar from "./TopNavbar/AdminTopNavbar";
import ScrollToTop from "./ScrollToTop";
import Footer from "./Footer";




const AdminDashboardLayout = () => {
  const [active, setActive] = useState(false);
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(window.location.pathname); // Get the current path
  }, []);

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
        
              <AdminLeftSidebar toggleActive={toggleActive} />
           

          <div className="main-content d-flex flex-column">
            <ScrollToTop />

            
            <AdminTopNavbar toggleActive={toggleActive} />
              

            <Outlet />

            {/* {!isAuthPage && <Footer />} */}
          </div>
        <Footer />
      </div> 
    </>
  );
};
export default AdminDashboardLayout;
