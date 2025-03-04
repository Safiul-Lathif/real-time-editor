import React, { useState } from "react";
// import Link from "next/link";
// import { useRouter } from 'next/router';
import styles from "../login/login.module.css"; // Import CSS module
import googleLogo from "../../assets/google.png";
import appleLogo from "../../assets/apple-logo.png";
import appLogo from "../../assets/app_logo.png";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { LockOpenOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
// import {
//   EmailOutline,
//   Lock,
//   LockAlert,
//   LockOpenOutline,
//   LockOutline,
// } from "mdi-material-ui";

const Login = () => {
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
        <h1 className={styles.welcome}>Welcome back!</h1>
        <p>Enter your Credentials to access your account</p>
        <form className={styles.forms}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <div className={styles.wrapper}>
              <div className={styles.icon}>{<MailOutlineIcon />}</div>
              <input
                type="email"
                id="email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.wrapper}>
              <div className={styles.icon}>{<LockOpenOutlined />}</div>
              <input
                type="password"
                id="password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className={styles.forgotPassword}>
            <Link to="/register">Forget Password?</Link>
          </div>
          <button className={styles.login} type="submit">
            Login
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
        <p>New to Research Pick?</p>
        <Link className={styles.createAccount} to="/register">
          Create an account
        </Link>
      </div>
    </div>
  );
};

export default Login;
