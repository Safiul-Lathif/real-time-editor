import React, { useState } from "react";
// import { useRouter } from 'next/router';
import styles from "../getStartNow/getStartNow.module.css"; // Import CSS module
import googleLogo from "../../assets/google.png";
import appleLogo from "../../assets/apple-logo.png";
import appLogo from "../../assets/app_logo.png";
import { DateRange, EmailOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const GetStartNow = () => {
  const navigate = useNavigate();
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
              <input
                type="email"
                id="email"
                placeholder="Enter your email id"
                required
              />
            </div>
          </div>
          <button
            className={styles.login}
            type="submit"
            onClick={async (event) => {
              event.preventDefault();
              const email = document.getElementById("email").value;
              localStorage.setItem("email", email);
              try {
                const response = await fetch(
                  "http://pocapi.researchpick.com/api/getEmailId",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ emailid: email }),
                  }
                );

                if (response.ok) {
                  const data = await response.json();
                  if (data.status === true) {
                    alert(data.message);
                    if (data.screen == "login") {
                      return;
                    }
                    navigate("/checkEmail");
                  } else {
                    alert(data.message);
                  }
                } else {
                  console.error("Login failed.");
                }
              } catch (error) {
                console.error("Login error:", error);
              }
            }}
          >
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
        <Link to="/login" className={styles.createAccount}>
          Sign in to an existing workspace
        </Link>
      </div>
    </div>
  );
};

export default GetStartNow;
