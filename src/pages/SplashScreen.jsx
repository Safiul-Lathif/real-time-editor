import React from "react";
import logo from "../assets/app_logo.png";

const SplashScreen = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <img
        src={logo}
        alt="splash screen"
        style={{
          width: "20%",
        }}
      />
    </div>
  );
};

export default SplashScreen;
