import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./Loginpage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";

const Loginpage = () => {
  const redirectToPage = () => {
    window.location.href = "/signup";
  };
  const redirectToHomePage = () => {
    window.location.href = "/home";
  };
  const redirectToForgotPassword = () => {
    window.location.href = "/forgot-password";
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const onFinish = async () => {
    try {
      setEmail("");
      setPassword("");

      const response = await axios.post("https://resume-maker-backend-pied.vercel.app/api/v1/login", {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userid", response.data.user.id);
        
        // localStorage.setItem('id', )
        // console.log(response.data.user.id);
        redirectToHomePage();

        console.log("Login successful");
      } else {
        console.log("Login failed");
        setLoginError(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
      // console.log("Login failed");
      // setLoginError(true);
    }
  };
  return (
    <Form onFinish={onFinish}>
      <div className="login-right-inner">
        <span
          style={{
            textAlign: "left",
            fontSize: "60px",
            fontFamily: 'cursive',
            marginBottom: "2rem",
            fontweight: "extra-bold",
          }}
        >
          WELCOME
        </span>
        <div>
          {loginError && (
            <div style={{ color: "#52b775", textAlign: "left" }}>
              Login failed. Please check your credentials.
            </div>
          )}
          <Form.Item
            style={{ marginBottom: 0, textAlign: "left" }}
            name="email"
            rules={[
              {
                type: "email",
                message:(<span style={{color: '#52b775'}}>The input is not valid E-mail!</span>) ,
              },
              {
                required: true,
                message: (<span style={{color: '#52b775'}}>Please input your E-mail!</span>),
              },
            ]}
          >
            <Input
              type="email"
              placeholder="Company Email"
              style={{ height: "3rem", width: "25rem", background: "gray-200" }}
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item
            style={{ marginBottom: 0, textAlign: "left" }}
            name="password"
            rules={[
              {
                type: "password",
                message: (<span style={{color: '#52b775'}}>The input is not valid Password !</span>),
              },
              {
                required: true,
                message: (<span style={{color: '#52b775'}}>Please input your Password !</span>),
              },
            ]}
          >
            <Input.Password
              placeholder="input password"
              style={{ height: "3rem", width: "25rem" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
        </div>
        <span
          style={{
            textAlign: "left",
            color: "blue",
            fontweight: "bolder",
            cursor: "pointer",
          }}
          onClick={redirectToForgotPassword}
        >
          Forgot Password ?
        </span>
        <div style={{ textAlign: "right" }}>
          <Button
            style={{ width: "6rem", height: "2.5rem", marginRight: "8px" }}
            onClick={redirectToPage}
          >
            Signup
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            style={{ width: "6rem", height: "2.5rem" }}
          >
            Login
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default Loginpage;
