import React, { useState } from "react";
import styles from "../login/login.module.css"; // Import CSS module
import googleLogo from "../../assets/google.png";
import appleLogo from "../../assets/apple-logo.png";
import appLogo from "../../assets/app_logo.png";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { LockOpenOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import AppleSignin from "react-apple-signin-auth";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(`Email: ${email}, Password: ${password}`);
    fetch("http://pocapi.researchpick.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle successful login response
        console.log("Login successful:", data);
        if (data.status === false) {
          alert(data.message);
        } else if (data.token) {
          localStorage.setItem("token", data.token);
          alert("Login successful");
          navigate("/");
        }
      })
      .catch((error) => {
        // Handle login error
        console.error("Login error:", error);
      });
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
          .then((response) => response.json())
          .then((data) => {
            fetch("http://pocapi.researchpick.com/api/Signinwithgooleapple", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                emailid: data.email,
                loginfrom: "google",
                name: data.name,
                imageurl: data.picture,
                sub: data.sub,
              }),
            })
              .then((response) => response.json())
              .then((data) => {
                // Handle successful login response
                console.log("Login successful:", data);
                if (data.status === false) {
                  alert(data.message);
                } else if (data.token) {
                  localStorage.setItem("token", data.token);
                  alert("Login successful");
                  navigate("/");
                }
              })
              .catch((error) => {
                // Handle login error
                console.error("Login error:", error);
              });
          });
        //Handle user information. Store it in state, local storage, send to your backend etc.
      } catch (err) {
        console.log(err);
      }
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  const loginApple = async (data) => {
    try {
      const response = await axios.post("/api/apple-login", {
        identityToken: data.authorization.id_token,
      });
      console.log("Backend response:", response.data);
      // Handle successful login (e.g., store token, redirect).
    } catch (error) {
      console.error("Apple login error:", error);
      // Handle error.
    }
  };

  const handleError = (error) => {
    console.error("Apple signin error", error);
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
                placeholder="Enter your email id"
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
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          <div className={styles.forgotPassword}>
            <Link to="/forgetPassword">Forget Password?</Link>
          </div>
          <button className={styles.login} type="submit" onClick={handleLogin}>
            Login
          </button>
        </form>
        <div className={styles.orDivider}>
          <span>OR</span>
        </div>
        <div className={styles.socialLogin}>
          <button
            onClick={() => login()}
            className={`${styles.socialLogin} ${styles.googleBtn}`}
          >
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
          {/* <AppleSignin
            clientId="YOUR_SERVICE_ID"
            scope="name email"
            responseType="id_token" // Only need id_token
            responseMode="form_post"
            usePopup={true}
            onSuccess={loginApple}
            onError={handleError}
            nonce="YOUR_NONCE" // Generate a unique nonce
            state="YOUR_STATE" // generate a unique state
            buttonText="Sign in with Apple"
          /> */}
        </div>
        <p>New to Research Pick?</p>
        <Link className={styles.createAccount} to="/getStartNow">
          Create an account
        </Link>
      </div>
    </div>
  );
};

export default Login;
