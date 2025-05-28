"use client";

import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const Notifications = () => {
  // Static data for notifications
  const notificationsData = [
    {
      icon: "sms",
      iconColor: "text-primary",
      message: "You have requested to withdrawal",
      time: "2 hrs ago",
      unseen: false,
    },
    {
      icon: "person",
      iconColor: "text-info",
      message: "A new user added in Trezo",
      time: "3 hrs ago",
      unseen: true,
    },
    {
      icon: "mark_email_unread",
      iconColor: "text-success",
      message: "You have requested to withdrawal",
      time: "1 day ago",
      unseen: false,
    },
    {
      icon: "sms",
      iconColor: "text-primary",
      message: "You have requested to withdrawal",
      time: "2 hrs ago",
      unseen: false,
    },
  ];

  return (
    <Dropdown className="dropdown notifications noti">
      <Dropdown.Toggle
        variant="secondary"
        id="dropdown-basic"
        className="border-0 p-0 position-relative badge"
      >
        <i className="material-symbols-outlined">notifications</i>
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-lg p-0 border-0 p-0 dropdown-menu-end">
        <div className="d-flex justify-content-between align-items-center title">
          <span className="fw-semibold fs-15 text-secondary">
            Notifications{" "}
            <span className="fw-normal text-body fs-14">
              ({notificationsData.length})
            </span>
          </span>
          <button className="p-0 m-0 bg-transparent border-0 fs-14 text-primary">
            Clear All
          </button>
        </div>

        <div className="max-h-217 scrollbar">
          {notificationsData.map((notification, index) => (
            <div
              className={`notification-menu ${
                notification.unseen ? "unseen" : ""
              }`}
              key={index}
            >
              <Link to="/notifications" className="dropdown-item">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <i
                      className={`material-symbols-outlined ${notification.iconColor}`}
                    >
                      {notification.icon}
                    </i>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <p>{notification.message}</p>
                    <span className="fs-13">{notification.time}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <Link
          to="/notifications"
          className="dropdown-item text-center text-primary d-block view-all fw-medium rounded-bottom-3"
        >
          <span>See All Notifications</span>
        </Link>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Notifications;
