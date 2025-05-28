"use client";

import React, { useState, useEffect } from "react";

const DarkMode = () => {
  // Light/Dark Mode
  // Initialize state based on localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Retrieve the user's preference from local storage
    const storedPreference = localStorage.getItem("theme");
    return storedPreference === "dark";
  });

  useEffect(() => {
    // Update the class on the <html> element based on the current state
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      if (isDarkMode) {
        htmlElement.classList.add("dark");
      } else {
        htmlElement.classList.remove("dark");
      }
    }

    // Update the user's preference in local storage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]); // Run whenever isDarkMode changes

  const handleToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <>
      <span className="title">Light/Dark Mode</span>

      <button
        className="switch-btn light-dark-btn bg-transparent border-none"
        onClick={handleToggle}
      >
        <div className="first">
          <div className="box">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="sub-title">
            <div className="dot-checkbox"></div>
            <span style={{ display: "block", fontWeight: "600" }}>Light</span>
          </div>
        </div>

        <div className="second">
          <div className="box">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="sub-title">
            <div className="dot-checkbox"></div>
            <span style={{ display: "block", fontWeight: "600" }}>Dark</span>
          </div>
        </div>
      </button>
    </>
  );
};

export default DarkMode;
