import React from "react";
import Login from "./Loginpage";
import Signup from "./SignupPage";
import ForgotPassword from "./ForgotPassword";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./Loginpage.css";

import login from './login.avif'

const Loginpage = () => {
  return (
    <div className="main-login">
      <div className="login-left">
        {/* <span style={{fontWeight: "rem"}}>Scale Orange</span> */}
        <img src={login} alt="" style={{ overflow: "none" }}></img>
      </div>
      <div className="login-right">
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </div>
  );
};

export default Loginpage;
