"use client";

import { Dropdown } from "react-bootstrap";

const AppsMenu = () => {
  // Static data for apps
  const appsData = [
    { name: "Figma", url: "https://www.figma.com/", img: "/images/figma.svg" },
    {
      name: "Dribbble",
      url: "https://www.dribbble.com/",
      img: "/images/dribbble.svg",
    },
    {
      name: "Spotify",
      url: "https://www.spotify.com/",
      img: "/images/spotify.svg",
    },
    {
      name: "Github",
      url: "https://www.github.com/",
      img: "/images/github.svg",
    },
    {
      name: "GDrive",
      url: "https://www.google.com/drive/",
      img: "/images/gdrive.svg",
    },
    {
      name: "Trello",
      url: "https://www.trello.com/",
      img: "/images/trello.svg",
    },
    { name: "Slack", url: "https://www.slack.com/", img: "/images/slak.svg" },
    {
      name: "Pinterest",
      url: "https://www.pinterest.com/",
      img: "/images/pinterest.svg",
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/",
      img: "/images/facebook.svg",
    },
    {
      name: "Linkedin",
      url: "https://www.linkedin.com/",
      img: "/images/linkedin.svg",
    },
  ];

  return (
    <Dropdown className="dropdown notifications apps">
      <Dropdown.Toggle
        variant="secondary"
        id="dropdown-basic"
        className="border-0 p-0 position-relative"
      >
        <i className="material-symbols-outlined">apps</i>
      </Dropdown.Toggle>

      <Dropdown.Menu
        className="dropdown-menu dropdown-lg p-0 border-0 py-4 px-3 max-h-312"
        data-simplebar
      >
        <div className="notification-menu d-flex flex-wrap justify-content-between gap-4">
          {appsData.map((app, index) => (
            <a
              href={app.url}
              target="_blank"
              className="dropdown-item p-0 text-center"
              rel="noreferrer"
              key={index}
            >
              <img
                src={app.img}
                alt={app.name}
                className="wh-25"
                width={25}
                height={25}
              />
              <span>{app.name}</span>
            </a>
          ))}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default AppsMenu;
