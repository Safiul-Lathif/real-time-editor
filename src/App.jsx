import "./App.css";
import Home from "./pages/index.jsx";
import { BrowserRouter, Router, Routes, Route, Link } from "react-router-dom";
import EditorWithHighlightedChanges from "./pages/trackChanges.jsx";
import Login from "./pages/login/login.jsx";
import SignUp from "./pages/signUp/SignUp.jsx";
import GetStartNow from "./pages/getStartNow/GetStartNow.jsx";
import ForgetPassword from "./pages/forgetPassword/ForgotPassword.jsx";
import ResearchPick from "./pages/home/home.jsx";
import SplashScreen from "./pages/SplashScreen.jsx";
import EditProfileScreen from "./pages/editProfile/EditProfile.jsx";
import ProfileScreen from "./pages/profile/profile.jsx";
import CheckEmail from "./pages/checkEmail/CheckEmail.jsx";
import NewPassword from "./pages/newPassoword/NewPassword.jsx";
import Success from "./pages/Succes.jsx";
import Credits from "./pages/credits/Credits.jsx";
import ResearchPickPricing from "./pages/researchPickPricings/ResearchPickPrices.jsx";
import OtpScreen from "./pages/otpScreen/OtpScreen.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              localStorage.getItem("token") ? <ResearchPick /> : <Login />
            }
          />
          <Route path="/credits" element={<Credits />} />
          <Route path="/editProfile" element={<EditProfileScreen />} />
          <Route
            path="/researchPickPricing"
            element={<ResearchPickPricing />}
          />
          <Route path="/success" element={<Success />} />
          <Route path="/newPassword" element={<NewPassword />} />
          <Route path="/checkEmail" element={<CheckEmail />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/otpScreen" element={<OtpScreen />} />
          <Route path="/splashScreen" element={<SplashScreen />} />
          <Route path="/home" element={<ResearchPick />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/getStartNow" element={<GetStartNow />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/project/:id" element={<Home />} />
          <Route
            path="/trackChanges"
            element={<EditorWithHighlightedChanges />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
