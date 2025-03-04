import React, { useState } from "react";
import appLogo from "../assets/app_logo.png";
import { CheckCircle } from "@mui/icons-material";

const Success = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Store user data (e.g., in local storage or using a library like NextAuth.js)
        // router.push('/dashboard'); // Redirect to dashboard
      } else {
        setError("Login failed.");
      }
    } catch (error) {
      setError("Login error:");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "start",
        height: "100vh",
      }}
    >
      <img src={appLogo} alt="Research Pick Logo" />
      <div>
        <CheckCircle
          style={{
            color: "green",
            fontSize: "100px",
            paddingTop: "100px",
            paddingBottom: "100px",
          }}
        />
      </div>
      <h1>Successful</h1>
      <p>
        Congratulations! Your password has been Changed.Click continue to login
      </p>
    </div>
  );
};

export default Success;
