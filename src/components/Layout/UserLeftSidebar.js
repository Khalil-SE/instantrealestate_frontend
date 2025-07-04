"use client";

import React from "react";
import { Accordion } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../config/routes";
// import BackgroundGradient from "./DesigningBG/BackgroundGradient";
// import GradientBackground from "./DesigningBG/GradientBackground";
import GradientBackgroundSideBar from "./DesigningBG/GradientBackgroundSideBar";

const UserLeftSidebar = ({ toggleActive }) => {
  const location = useLocation(); // Use `useLocation` to get the current path
  const pathname = location.pathname; // Extract `pathname` from location

  // Enable the dark sidebar exclusively for the /dashboard/beauty-salon/ page URL.
  // const [isDark, setIsDark] = useState(false);

  // useEffect(() => {}, []);

  return (
    <>
      {/* <div className={`sidebar-area ${isDark ? "dark" : ""}`}> */}
      {/* background: "radial-gradient(circle,rgb(203, 200, 244),rgba(241, 209, 225, 0.55), #f8f9fa)" */}
      {/* backgroundColor: "#f8f9fa"  */}
      <div
        className={`sidebar-area shadow-sm`}
        style={{ backgroundColor: "#ffffff" }}
        // style={{ backgroundColor: "#f8f9fa" }}
      >
        {/* <BackgroundGradient /> */}
        <GradientBackgroundSideBar >

        <div className="logo position-relative">
          <Link
            to="/dashboard/ecommerce"
            className="d-block text-decoration-none position-relative"
          >
            <img
              src="/images/IRE-logo-HighResLightBg-1024x384.png"
              alt="logo-icon"
              width={150}
              height={60}
            />
            {/* <span className="logo-text fw-bold text-dark">IRE</span> */}
          </Link>
          <button
            className="sidebar-burger-menu bg-transparent p-0 border-0 opacity-0 z-n1 position-absolute top-50 end-0 translate-middle-y"
            onClick={toggleActive}
          >
            <i className="material-symbols-outlined fs-24">close</i>
          </button>
        </div>

        <div className="sidebar-menu">
          {/* <BackgroundGradient /> */}
          <div className="menu-title small text-uppercase">
            <span className="menu-title-text">MAIN</span>
          </div>

          <Accordion defaultActiveKey="0" flush>
            <div className="menu-item">
              <Link
                to={ROUTES.USER.DASHBOARD}
                className={`menu-link ${
                  pathname === ROUTES.USER.DASHBOARD ? "active" : ""
                }`}
              >
                <i className="material-symbols-outlined">Dashboard</i>
                <span className="title fw-bold">Dashboard</span>
              </Link>
            </div>
            <div className="menu-item">
              <Link
                to={ROUTES.USER.PROPERTY.PROPERTIES}
                className={`menu-link ${
                  pathname === ROUTES.USER.PROPERTY.PROPERTIES ? "active" : ""
                }`}
              >
                <i className="material-symbols-outlined">Home</i>
                <span className="title">Properties</span>
              </Link>
            </div>

            <div className="menu-item">
              <Link
                to={ROUTES.USER.INSTABOT.INSTABOTS}
                className={`menu-link ${
                  pathname === ROUTES.USER.INSTABOT.INSTABOTS ? "active" : ""
                }`}
              >
                <i className="material-symbols-outlined">Rocket</i>
                <span className="title">InstaBots</span>
              </Link>
            </div>

            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <i className="material-symbols-outlined">settings</i>
                <span className="title">Settings</span>
                {/* <span className="count">25</span> */}
              </Accordion.Header>
              <Accordion.Body>
                <ul className="sub-menu">
                  <li className="menu-item">
                    <Link
                      to={ROUTES.USER.PROFILE}
                      className={`menu-link ${
                        pathname === ROUTES.USER.PROFILE ? "active" : ""
                      }`}
                    >
                      <i className="material-symbols-outlined">
                        account_circle
                      </i>
                      <span className="title">My Profile</span>
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link
                      to={ROUTES.USER.SUBSCRIPTION}
                      className={`menu-link ${
                        pathname === ROUTES.USER.SUBSCRIPTION ? "active" : ""
                      }`}
                    >
                      <i className="material-symbols-outlined">
                        credit_card_heart
                      </i>
                      <span className="title">Subscription</span>
                    </Link>
                  </li>

                  {/* <li className="menu-item">
                    <Link
                      to={ROUTES.USER.PRIVACY_POLICY}
                      className={`menu-link ${
                        pathname === ROUTES.USER.PRIVACY_POLICY ? "active" : ""
                      }`}
                    >
                      <i className="material-symbols-outlined">Policy</i>
                      <span className="title">Privacy Policy</span>
                    </Link>
                  </li> */}

                  {/* <li className="menu-item">
                    <Link
                      to={ROUTES.USER.TERMS_CONDITIONS}
                      className={`menu-link ${
                        pathname === ROUTES.USER.TERMS_CONDITIONS
                          ? "active"
                          : ""
                      }`}
                    >
                      <i className="material-symbols-outlined">Conditions</i>
                      <span className="title">Terms & Conditions</span>
                    </Link>
                  </li> */}
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <div className="menu-item">
              <a
                href="/authentication/logout"
                className={`menu-link ${
                  pathname === "/authentication/logout" ? "active" : ""
                }`}
              >
                <i className="material-symbols-outlined">logout</i>
                <span className="title">Logout</span>
              </a>
            </div>
          </Accordion>
        </div>

        </GradientBackgroundSideBar>
      </div>
    </>
  );
};

export default UserLeftSidebar;
