import React, { useState } from "react";
// import { useRouter } from 'next/router';
import styles from "./checkEmail.module.css"; // Import CSS module
import googleLogo from "../../assets/google.png";
import appleLogo from "../../assets/apple-logo.png";
import appLogo from "../../assets/app_logo.png";
import { EmailOutlined } from "@mui/icons-material";
import PinField from "react-pin-field";
// import {
//   EmailOutline,
//   Lock,
//   LockAlert,
//   LockOpenOutline,
//   LockOutline,
// } from "mdi-material-ui";

const CheckEmail = () => {
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
        <h1 className={styles.welcome}>Check your email for a code </h1>
        <p>
          We've send a 6-character code to safiullathif65@gmail.com. The code
          expires shortly, so please enter it soon. 6-digit confirmation code
        </p>
        <form className={styles.forms} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <div className={styles.formGroupRow}>
              <PinField
                length={6} // Set the desired PIN length
                type="text" // or "password" for masking
                inputMode="numeric" // Use numeric keyboard on mobile
                validate={/^[0-9]*$/} // Optional: validate only numbers
                autoFocus // Optional: focus the first input field
                style={{
                  border: "1px solid rgb(91, 3, 91)",
                  borderRadius: "8px",
                  height: "10px",
                  padding: "20px",
                  marginRight: "20px",
                  fontSize: "16px",
                  width: "10px",
                }}
              />
            </div>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button className={styles.login} type="submit">
            Verify
          </button>
          <p
            style={{
              marginTop: "50px",
            }}
          >
            Can't find your code?Check your spam folder
          </p>
        </form>
      </div>
    </div>
  );
};

export default CheckEmail;
