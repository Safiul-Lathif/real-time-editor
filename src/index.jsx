import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { MyProvider } from "./context/editorContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <MyProvider>
    <React.StrictMode>
      <GoogleOAuthProvider clientId="1097080396066-asda6qqbi6jsqdeg4g4700bn9nhb4c1q.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </React.StrictMode>
  </MyProvider>
);
