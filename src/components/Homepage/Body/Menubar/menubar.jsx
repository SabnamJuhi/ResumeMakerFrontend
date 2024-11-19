import React, { useEffect, useState } from "react";
import { Menu, Dropdown } from "antd";
import "./menubar.css";

const Menubar = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    console.log(storedUsername)
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  
  const redirectToPage = () => {
    window.location.href = "/";
  };

  const handleMenuClick = ({ key }) => {
    if (key === "forgotPassword") {
      window.location.href = "/forgot-password";
      // window.location.href = "/home/reset-password";
    } else if (key === "logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("id"); // Remove any other user-related data if stored
      redirectToPage();
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="forgotPassword">Change Password</Menu.Item>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );
   // Extract the first letter of the username and convert it to uppercase
   const firstLetter = username ? username.charAt(0).toUpperCase() : "";
  return (
    <div className="menu-div">
      <div className="menu-div-left">Welcome, {username}</div>
      <div className="menu-div-right">
        <Dropdown overlay={menu} trigger={["click"]}>
          <span
            style={{ cursor: "pointer" }}
            className="ant-dropdown-link"
            onClick={(e) => e.preventDefault()}
          >
            {firstLetter}
          </span>
        </Dropdown>
      </div>
    </div>
  );
};

export default Menubar;
