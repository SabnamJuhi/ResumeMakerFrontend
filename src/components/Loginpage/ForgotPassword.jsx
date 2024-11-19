import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import "./ForgotPassword.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ForgotPassword = () => {
  const redirectToPage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    window.location.href = "/";
  };
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    const { email, password  } = values;
    setLoading(true);

    try {
      // Send a request to your backend to initiate the password reset
      const response =await axios.post("https://resume-maker-backend-pied.vercel.app/api/v1/forgot-password", {
        email,
        newPassword: password
      });
      toast.success(response.data.message || "Password Updated Successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log("password updated successfully")
    } catch (error) {
      console.error("Error updating password:", error);
      // Display error message to the user
      message.error("Failed to update password. Please try again.");
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
    <ToastContainer />
      <Form onFinish={onFinish}>
        <div className="password-main">
          <span style={{ textAlign: "left", fontSize: "35px" }}>
            Forgot Your Password ?
          </span>
          <Form.Item
          name="email"
          style={{ textAlign: "left" }}
          rules={[
            {
              type: "email",
              message: (<span style={{color: '#52b775'}}>The input is not valid E-mail!</span>),
            },
            {
              required: true,
              message: (<span style={{color: '#52b775'}}>Please input your E-mail!</span>),
            },
          ]}
        >
          <Input
            placeholder="Enter Your Email"
            style={{ height: "3rem", background: "gray-200" }}
          />
        </Form.Item>
          <Form.Item
            name="password"
            hasFeedback
            style={{ textAlign: "left" }}
            rules={[
              {
                required: true,
                message: "Please Enter your New Password!",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter New Password"
              style={{ height: "3rem" }}
            />
          </Form.Item>
          <Form.Item
            name="confirm password"
            style={{ textAlign: "left" }}
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please Enter your Confirm New Password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirm New Password"
              style={{ height: "3rem" }}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Confirm
            </Button>
          </Form.Item>
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={redirectToPage}
          >
            Back to Login Page
          </span>
        </div>
      </Form>
    </div>
  );
};

export default ForgotPassword;
