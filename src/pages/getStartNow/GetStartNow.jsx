import React, { useState } from "react";
// import { useRouter } from 'next/router';
import styles from "../getStartNow/getStartNow.module.css"; // Import CSS module
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
import { Link } from "react-router-dom";

const GetStartNow = () => {
  //   const [email, setEmail] = useState('');
  //   const [password, setPassword] = useState('');
  //   const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Handle login logic here (e.g., send data to server)
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Successful login
        const data = await response.json();
        // Store user data (e.g., in local storage or using a library like NextAuth.js)
        // router.push('/dashboard'); // Redirect to dashboard
      } else {
        // Handle login errors (e.g., display error messages)
        console.error("Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <img src={appLogo} alt="Research Pick Logo" className={styles.logo} />
        <h1 className={styles.welcome}>Get Start Now</h1>
        <p>We Suggest using the email address you use at work</p>
        <form className={styles.forms}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <div className={styles.wrapper}>
              <div className={styles.icon}>
                <EmailOutlined />
              </div>
              <input type="email" id="email" required />
            </div>
          </div>
          <button className={styles.login} type="submit">
            Continue
          </button>
        </form>
        <div className={styles.orDivider}>
          <span>OR</span>
        </div>
        <div className={styles.socialLogin}>
          <button className={`${styles.socialLogin} ${styles.googleBtn}`}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img src={googleLogo} alt="Google Logo" width={20} height={20} />{" "}
              Sign in with Google
            </div>
          </button>
          <button className={`${styles.socialLogin} ${styles.appleBtn}`}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img src={appleLogo} alt="Apple Logo" width={20} height={20} />{" "}
              Sign in with Apple
            </div>
          </button>
        </div>
        <p>Already using research pick?</p>
        <Link to="/register" className={styles.createAccount}>
          Sign in to an existing workspace
        </Link>
      </div>
    </div>
  );
};

export default GetStartNow;
