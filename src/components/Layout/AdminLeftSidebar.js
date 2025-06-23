"use client";

import React from "react";
import { Accordion } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

import GradientBackgroundSideBar from "./DesigningBG/GradientBackgroundSideBar";

import { ROUTES } from "../../config/routes";

const AdminLeftSidebar = ({ toggleActive }) => {
  const location = useLocation(); // Use `useLocation` to get the current path
  const pathname = location.pathname; // Extract `pathname` from location

  // Enable the dark sidebar exclusively for the /dashboard/beauty-salon/ page URL.
  // const [isDark, setIsDark] = useState(false);

  // useEffect(() => {}, []);

  return (
    <>
      {/* <div className={`sidebar-area ${isDark ? "dark" : ""}`}> */}
      <div className={`sidebar-area shadow-sm`}>
        <GradientBackgroundSideBar>
        <div className="logo position-relative">
          <Link
            to="/dashboard/ecommerce"
            className="d-block text-decoration-none position-relative"
          >
            <img
              src="/images/IRE-logo-HighResLightBg-1024x384.png"
              alt="logo-icon"
              width={150}
              height={40}
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
          <div className="menu-title small text-uppercase">
            <span className="menu-title-text">MAIN</span>
          </div>

          <Accordion defaultActiveKey="0" flush>
            <div className="menu-item">
              <Link
                to={ROUTES.ADMIN.DASHBOARD}
                className={`menu-link ${
                  pathname === ROUTES.ADMIN.DASHBOARD ? "active" : ""
                }`}
              >
                <i className="material-symbols-outlined">Dashboard</i>
                <span className="title fw-semibold">Dashboard</span>
              </Link>
            </div>

            <div className="menu-item">
              <Link
                to={ROUTES.ADMIN.USERS_MANAGEMENT}
                className={`menu-link ${
                  pathname === ROUTES.ADMIN.USERS_MANAGEMENT ? "active" : ""
                }`}
              >
                <i className="material-symbols-outlined">Groups</i>
                <span className="title">Users Managment</span>
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
                      to={ROUTES.ADMIN.PROFILE}
                      className={`menu-link ${
                        pathname === ROUTES.ADMIN.PROFILE ? "active" : ""
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
                      to={ROUTES.ADMIN.SYSTEM_SETTINGS}
                      className={`menu-link ${
                        pathname === ROUTES.ADMIN.SYSTEM_SETTINGS ? "active" : ""
                      }`}
                    >
                      <i className="material-symbols-outlined">
                        settings_suggest
                      </i>
                      <span className="title">System Settings</span>
                    </Link>
                  </li>
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

export default AdminLeftSidebar;
