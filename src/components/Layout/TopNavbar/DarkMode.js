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
      <button
        className="light-mode-btn p-0 bg-transparent border-0"
        onClick={handleToggle}
      >
        <span className="light_mode">
          <i className="material-symbols-outlined">light_mode</i>
        </span>
        <span className="dark_mode">
          <i className="material-symbols-outlined">dark_mode</i>
        </span>
      </button>
    </>
  );
};

export default DarkMode;
