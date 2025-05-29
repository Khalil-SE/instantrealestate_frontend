// src/components/ConnectLoftyButton.js
import React from "react";
import useAuth from "../../store/useAuth";
import { Button } from "react-bootstrap";

// import { getLoftyRedirectUrl } from "../../services/loftyService";

const ConnectLoftyButton = () => {
  const user = useAuth((state) => state.user);
  const isConnected = user?.is_lofty_connected;

  const handleConnectLofty = async () => {
    if (!user.api_key) {
      console.warn("User is missing API key!");
      return;
    }
    const redirectUrl = `http://127.0.0.1:8000/api/lofty/connect/?key=${user.api_key}`;
    window.location.href = redirectUrl;
    // try {
    //   const redirectUrl = await getLoftyRedirectUrl();
    //   if (redirectUrl) {
    //     window.location.href = redirectUrl;
    //   } else {
    //     alert("Unable to get Lofty login URL.");
    //   }
    // } catch (error) {
    //   alert("Failed to connect to Lofty. Check console for details.");
    // }
  };

  return (
    <>
      {/* <button
      onClick={handleConnectLofty}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      {isConnected ? "Lofty Connected" : "Connect Lofty Account"}

    </button>
    <Button
              variant="primary"
              className="bg-primary bg-opacity-10 fw-medium text-primary py-2 px-4"
            >
              Primary
            </Button>{" "} */}
      <Button
        onClick={handleConnectLofty}
        variant={isConnected ? "success" : "primary"}
        className={
          isConnected
            ? ""
            : "bg-primary bg-opacity-10 fw-medium text-primary py-2 px-4"
        }
      >
        {isConnected ? "Lofty Connected" : "Connect Lofty Account"}
      </Button>
    </>
  );
};

export default ConnectLoftyButton;
