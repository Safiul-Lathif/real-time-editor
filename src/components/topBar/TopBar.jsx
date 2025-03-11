import { NotificationAdd } from "@mui/icons-material";
import React from "react";

export const TopBar = () => {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "10px",
        padding: "0px 15px 15px 15px",
        borderBottom: "2px solid #ccc",
      }}
      onClick={() => (window.location.href = "/profile")}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <img
          src="https://media.licdn.com/dms/image/v2/C4D03AQFdX9FHzdCSYg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1646324063549?e=1744243200&v=beta&t=0fWXGZOdxmZ8Xh255N5WSQB6jrfjGpS4i0dpX2sn2lE"
          alt="User Avatar"
          className="avatar"
        />
        <span className="user-name">Safiul Lathif</span>
      </div>
      <div
        style={{
          height: "45px",
          width: "45px",
          borderRadius: "50%",
          backgroundColor: "white",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <NotificationAdd />
      </div>
    </header>
  );
};
