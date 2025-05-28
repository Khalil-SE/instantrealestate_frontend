"use client";

import { Dropdown } from "react-bootstrap";

const ChooseLanguage = () => {
  // Static data for languages
  const languages = [
    {
      name: "English",
      code: "en",
      img: "/images/usa.svg",
      alt: "united-states",
    },
    {
      name: "Canada",
      code: "ca",
      img: "/images/canada.svg",
      alt: "canada",
    },
    {
      name: "Germany",
      code: "de",
      img: "/images/germany.svg",
      alt: "germany",
    },
    {
      name: "Portugal",
      code: "pt",
      img: "/images/portugal.svg",
      alt: "portugal",
    },
    {
      name: "Spain",
      code: "es",
      img: "/images/spain.svg",
      alt: "spain",
    },
  ];

  return (
    <Dropdown className="dropdown notifications language">
      <Dropdown.Toggle
        variant="secondary"
        id="dropdown-basic"
        className="border-0 p-0 position-relative"
      >
        <i className="material-symbols-outlined">translate</i>
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-menu dropdown-lg p-0 border-0 dropdown-menu-end">
        <span className="fw-semibold fs-15 text-secondary title">
          Choose Language
        </span>
        <div className="max-h-275">
          {languages.map((language, index) => (
            <div className="notification-menu" key={index}>
              <Dropdown.Item href="#" className="dropdown-item">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <img
                      src={language.img}
                      className="wh-30 rounded-circle"
                      alt={language.alt}
                      width={30}
                      height={30}
                    />
                  </div>
                  <div className="flex-grow-1 ms-2">
                    <span className="text-secondary fw-medium fs-14">
                      {language.name}
                    </span>
                  </div>
                </div>
              </Dropdown.Item>
            </div>
          ))}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ChooseLanguage;
