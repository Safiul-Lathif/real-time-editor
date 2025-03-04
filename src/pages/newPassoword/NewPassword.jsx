import React, { useState } from "react";
// import { useRouter } from 'next/router';
import styles from "./newPassword.module.css"; // Import CSS module
import googleLogo from "../../assets/google.png";
import appleLogo from "../../assets/apple-logo.png";
import appLogo from "../../assets/app_logo.png";
import { EmailOutlined, LockOpen, Password } from "@mui/icons-material";
// import {
//   EmailOutline,
//   Lock,
//   LockAlert,
//   LockOpenOutline,
//   LockOutline,
// } from "mdi-material-ui";

const NewPassword = () => {
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
        <h1 className={styles.welcome}>Set a new password</h1>
        <p>
          Create a new password. Ensure it differs from pervious ones for
          security
        </p>
        <form className={styles.forms} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Password</label>
            <div className={styles.wrapper}>
              <div className={styles.icon}>{<LockOpen />}</div>
              <input
                type="password"
                id="password"
                required
                placeholder="Enter your new password"
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Conform Password</label>
            <div className={styles.wrapper}>
              <div className={styles.icon}>{<LockOpen />}</div>
              <input
                type="password"
                id="password"
                required
                placeholder="Reenter password"
              />
            </div>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button className={styles.login} type="submit">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
