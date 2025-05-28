"use client";

import { Dropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import useAuth from "../../../../store/useAuth";
import { logoutUser } from "../../../../services/authService";
import { ROUTES } from "../../../../config/routes";

const Profile = () => {
  const location = useLocation(); // Use `useLocation` to get the current path
  const pathname = location.pathname; // Extract `pathname` from location

  const user = useAuth((state) => state.user);
  // console.log("user", user.first_name);
  const accessToken = useAuth((state) => state.accessToken);
  const refreshToken = useAuth((state) => state.refreshToken);
  const clearAuth = useAuth((state) => state.clearAuth);

  // const { user, refreshToken, accessToken, clearAuth } = useAuth((state) => ({
    
  //   user: state.user,
  //   refreshToken: state.refreshToken,
  //   accessToken: state.accessToken,
  //   clearAuth: state.clearAuth
  // }));

  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();  //  Prevent <a> default jump
    try {
      if (refreshToken && accessToken) {
        await logoutUser(refreshToken, accessToken);
      }
    } catch (err) {
      console.warn('Logout failed or already expired');
    }

    if (useAuth.getState().user) {
      clearAuth();  //  Only clears state if user exists
    }
    navigate(ROUTES.AUTHENTICATION.SIGN_IN);
  };


  return (
    <>
      <Dropdown className="admin-profile">
        <Dropdown.Toggle className="d-xxl-flex align-items-center bg-transparent border-0 text-start p-0 cursor">
          <div className="flex-shrink-0">
            <img
              className="rounded-circle wh-40 administrator"
              src= {user?.picture? user.picture :   "/images/user-173.png"}
              alt="admin"
              width={40}
              height={40}
            />
          </div>

          <div className="flex-grow-1 ms-2">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-none d-xxl-block">
                <div className="d-flex align-content-center">
                  <h3>{user?.first_name}</h3>
                </div>
              </div>
            </div>
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu className="border-0 bg-white dropdown-menu-end">
          
          <div className="d-flex align-items-center info">
            <div className="flex-shrink-0">
              <img
                className="rounded-circle wh-30 administrator"
                src= "/images/user-173.png"
                alt="admin"
                width={30}
                height={30}
              />
            </div>
            <div className="flex-grow-1 ms-2">
              <h3 className="fw-medium">{ user?.first_name + " " + user?.last_name }</h3>
              <span className="fs-12">{ user?.email }</span>
            </div>
          </div>

          <ul className="admin-link ps-0 mb-0 list-unstyled">
            <li>
              <Link
                to="/my-profile"
                className={`dropdown-item d-flex align-items-center text-body ${
                  pathname === "/my-profile" ? "activeLink" : ""
                }`}
              >
                <i className="material-symbols-outlined">account_circle</i>
                <span className="ms-2">My Profile</span>
              </Link>
            </li>

            {/* <li>
              <Link
                to="/apps/chat"
                className={`dropdown-item d-flex align-items-center text-body ${
                  pathname === "/apps/chat" ? "activeLink" : ""
                }`}
              >
                <i className="material-symbols-outlined">chat</i>
                <span className="ms-2">Messages</span>
              </Link>
            </li>

            <li>
              <Link
                to="/apps/to-do-list"
                className={`dropdown-item d-flex align-items-center text-body ${
                  pathname === "/apps/to-do-list" ? "activeLink" : ""
                }`}
              >
                <i className="material-symbols-outlined">
                  format_list_bulleted
                </i>
                <span className="ms-2">My Task</span>
              </Link>
            </li>

            <li>
              <Link
                to="/ecommerce/checkout"
                className={`dropdown-item d-flex align-items-center text-body ${
                  pathname === "/ecommerce/checkout" ? "activeLink" : ""
                }`}
              >
                <i className="material-symbols-outlined">credit_card</i>
                <span className="ms-2">Billing</span>
              </Link>
            </li>
          </ul>

          <ul className="admin-link ps-0 mb-0 list-unstyled">
            <li>
              <Link
                to="/settings/account-settings"
                className={`dropdown-item d-flex align-items-center text-body ${
                  pathname === "/settings/account-settings" ? "activeLink" : ""
                }`}
              >
                <i className="material-symbols-outlined">settings</i>
                <span className="ms-2">Settings</span>
              </Link>
            </li>

            <li>
              <Link
                to="/helpdesk/tickets"
                className={`dropdown-item d-flex align-items-center text-body ${
                  pathname === "/helpdesk/tickets" ? "activeLink" : ""
                }`}
              >
                <i className="material-symbols-outlined">support</i>
                <span className="ms-2">Support</span>
              </Link>
            </li>

            <li>
              <a
                href="/authentication/lock-screen"
                className="dropdown-item d-flex align-items-center text-body"
              >
                <i className="material-symbols-outlined">lock</i>
                <span className="ms-2">Lock Screen</span>
              </a>
            </li> */}

            <li>
              <a
                href="/logout"
                className="dropdown-item d-flex align-items-center text-body"
                onClick={handleLogout}
              >
                <i className="material-symbols-outlined">logout</i>
                <span className="ms-2">Logout</span>
              </a>
            </li>
          </ul>
          
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default Profile;
