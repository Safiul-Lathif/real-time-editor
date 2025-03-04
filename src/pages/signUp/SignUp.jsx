import React from "react";

// import { useRouter } from 'next/router';
import styles from "../signUp/signUp.module.css"; // Import CSS module
import googleLogo from "../../assets/google.png";
import appleLogo from "../../assets/apple-logo.png";
import appLogo from "../../assets/app_logo.png";
// import {
//   EmailOutline,
//   Lock,
//   LockAlert,
//   LockOpenOutline,
//   LockOutline,
// } from "mdi-material-ui";

import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { LockOpenOutlined } from "@mui/icons-material";

const SignUp = () => {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <img src={appLogo} alt="Research Pick Logo" className={styles.logo} />
        <h1 className={styles.welcome}>Sign up</h1>
        <p>Almost Done Fill in your Credentials</p>
        <form className={styles.forms}>
          <div className={styles.formGroupIcon}>
            <label htmlFor="email">Email</label>
            <div className={styles.wrapper}>
              <div className={styles.icon}>{<MailOutlineIcon />}</div>
              <input
                type="email"
                id="email"
                required
                placeholder="Enter email address"
              />
            </div>
          </div>
          <div className={styles.formGroupIcon}>
            <label htmlFor="password">Password</label>
            <div className={styles.wrapper}>
              <div className={styles.icon}>{<LockOpenOutlined />}</div>
              <input
                type="password"
                id="password"
                required
                placeholder="Enter password"
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">First Name*</label>
            <div className={styles.wrapper}>
              <input
                type="name"
                id="firstName"
                placeholder="Enter first name"
                required
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="lastName">Last Name*</label>
            <div className={styles.wrapper}>
              <input
                type="name"
                id="lastName"
                placeholder="Enter last name"
                required
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="universityName">University Name</label>
            <div className={styles.wrapper}>
              <input
                type="name"
                id="universityName"
                placeholder="Enter university name"
                required
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="department">Department</label>
            <div className={styles.wrapper}>
              <input
                type="name"
                id="department"
                placeholder="Enter department"
                required
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="speciality">Speciality</label>
            <div className={styles.wrapper}>
              <input
                type="name"
                id="speciality"
                placeholder="Enter speciality"
                required
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="location">Location</label>
            <div className={styles.wrapper}>
              <input
                type="name"
                id="location"
                placeholder="Enter location"
                required
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="country">Country</label>
            <div className={styles.wrapper}>
              <select id="country" required>
                <option value="">Select country</option>
                {["United States", "India", "United Kingdom"].map(
                  (country, index) => (
                    <option key={index} value={country}>
                      {country}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="timezone">Timezone</label>
            <div className={styles.wrapper}>
              <select id="timezone" required>
                <option value="">Select timezone</option>
                {["UTC", "EST", "CST", "MST", "PST"].map((timezone, index) => (
                  <option key={index} value={timezone}>
                    {timezone}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            paddingLeft: "50px",
            marginTop: "20px",
          }}
        >
          <input
            type="checkbox"
            id="terms"
            required
            style={{ marginRight: "10px", height: "20px", width: "20px" }}
          />
          <label htmlFor="terms" className={styles.terms}>
            I have read and agreed to the terms of Services and Privacy Policy
          </label>
        </div>
        <button className={styles.login} type="submit">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
