import React, { useState } from "react";
// import { useRouter } from 'next/router';
import styles from "../forgetPassword/forgetPassword.module.css"; // Import CSS module
import googleLogo from "../../assets/google.png";
import appleLogo from "../../assets/apple-logo.png";
import appLogo from "../../assets/app_logo.png";
import { EmailOutlined } from "@mui/icons-material";
// import {
//   EmailOutline,
//   Lock,
//   LockAlert,
//   LockOpenOutline,
//   LockOutline,
// } from "mdi-material-ui";

const ForgetPassword = () => {
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
    <div className={styles.container}>
      <div className={styles.form}>
        <img src={appLogo} alt="Research Pick Logo" className={styles.logo} />
        <h1 className={styles.welcome}>Forgot Password</h1>
        <p>Please Enter Your Email to reset the password</p>
        <form className={styles.forms} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <div className={styles.wrapper}>
              <div className={styles.icon}>{<EmailOutlined />}</div>
              <input
                type="email"
                id="email"
                value={email}
                placeholder="type your email address"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button
            className={styles.login}
            onClick={async (event) => {
              event.preventDefault();
              const email = document.getElementById("email").value;
              const body = JSON.stringify({
                emailid: email,
              });
              console.log(body);
              try {
                const response = await fetch(
                  `http://pocapi.researchpick.com/api/TriggerOTP`,
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: body,
                  }
                );
                if (response.ok) {
                  // Successful login
                  const data = await response.json();
                  console.log(data);
                  if (data.status === true) {
                    window.location.href = "/register";
                  } else {
                    alert(data.message);
                  }
                } else {
                  setError("Login failed.");
                }
              } catch (error) {
                setError("Login error:");
              }
            }}
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
