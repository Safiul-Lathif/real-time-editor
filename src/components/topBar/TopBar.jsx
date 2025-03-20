import { NotificationAdd, Notifications, NotificationsOutlined } from "@mui/icons-material";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


export const TopBar = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    profile_image: "",
    user_first_name: "",
    user_last_name: "",
  });
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const getUserDetails = async () => {
      let token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `http://pocapi.researchpick.com/api/getuserdetails`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const result = await response.json();
          console.log(result);
          setUserDetails(result.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const getNotificationCount = async () => {
      let token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `http://pocapi.researchpick.com/api/getNotificationcount`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const result = await response.json();
          console.log(result);
          setNotificationCount(result.count);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getNotificationCount();
    getUserDetails();
  }, []);

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
    >
      <Link
        style={{
          color: "black",
          textDecoration: "none",
        }}
        to="/profile">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <img
            src={
              userDetails.profile_image
                ? userDetails.profile_image
                : "https://th.bing.com/th/id/OIP.hGSCbXlcOjL_9mmzerqAbQHaHa?rs=1&pid=ImgDetMain"
            }
            alt="User Avatar"
            className="avatar"
          />
          <span className="user-name">
            {userDetails.user_first_name} {userDetails.user_last_name}
          </span>
        </div>
      </Link>
      <div
        style={{
          position: "relative",
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
        <NotificationsOutlined />
        {notificationCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-3px",
              right: "-3px",
              backgroundColor: "#fec000",
              color: "white",
              borderRadius: "50%",
              padding: "2px 6px",
              fontSize: "12px",
            }}
          >
            {notificationCount}
          </span>
        )}
      </div>
    </header>
  );
};
