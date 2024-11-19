import React from "react";
import "./index.css";
import Menubar from "./Menubar/menubar";
// import Bodypart from "./BodyPart/index";
import BodyTable from "./BodyPart/BodyTable/table";
// import ResumeForm from "./BodyPart/ResumeForm/index";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AllDetails from "./BodyPart/ResumeForm/all-details";
import ResetPassword from "./BodyPart/authReset/auth-reset";
import { Table } from "antd";

const index = () => {
  const token = localStorage.getItem("token");

  return (
    <div className="main">
      <Menubar />

      <div className="right-div-inner">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <React.Fragment>
                {" "}
                <div className="main-bodyTable">
                  <BodyTable />
                </div>
              </React.Fragment>
            }
          />
          <Route
            path="/resume"
            element={
              <React.Fragment>
                {" "}
                <div className="main-bodyResume">
                  <AllDetails />
                </div>
              </React.Fragment>
            }
          />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
    </div>
  );
};

export default index;
