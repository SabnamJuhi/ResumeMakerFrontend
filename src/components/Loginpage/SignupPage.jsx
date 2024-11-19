import React from "react";
import { Form, Input, Button } from "antd";
import { GoArrowRight } from "react-icons/go";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import "./SignupPage.css";

const SignupPage = () => {
  const redirectToPage = () => {
    window.location.href = "/";
  };

  const onFinish = async (values) => {
    const { email, password, username } = values;

    try {
      const response = await fetch("https://resume-maker-backend-pied.vercel.app/api/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password , username}),
      });

      if (response.ok) {
        const data = await response.json(); // Parse JSON response
        console.log(data, data.username)
        localStorage.setItem("username", data.username);
        // Show success toast if signup is successful
        toast.success(data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log("Signup successful");
      } else {
        const errorMessage = await response.json();
        toast.error(errorMessage.message || "Signup failed", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.error(`Signup failed: ${errorMessage.message}`);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <Form
      onFinish={onFinish}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
    >
      <div className="signup-main">
      <span
          style={{
            textAlign: "left",
            fontSize: "40px",
            fontFamily: 'cursive',
            marginBottom: "2rem",
            fontweight: "extra-bold",
          }}
        >
          Sign Up
        </span>
      <Form.Item
          name="username"
          label="User Name"
          style={{ textAlign: "left" }}
          rules={[
            // {
            //   type: "text",
            //   message: (<span style={{color: '#52b775'}}>The input is not valid E-mail!</span>),
            // },
            {
              required: true,
              message: (<span style={{color: '#52b775'}}>Please input your User Name!</span>),
            },
          ]}
        >
          <Input
            placeholder="Enter Your User Name"
            style={{ height: "3rem", width: "25rem", background: "gray-200" }}
          />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
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
            style={{ height: "3rem", width: "25rem", background: "gray-200" }}
          />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          style={{ textAlign: "left" }}
          rules={[
            {
              required: true,
              message: (<span style={{color: '#52b775'}}>Please input your password!</span>),
            },
          ]}
          hasFeedback
        >
          <Input.Password
            placeholder="Enter Your Password"
            style={{ height: "3rem", width: "25rem", background: "gray-200" }}
          />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          style={{ textAlign: "left" }}
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: (<span style={{color: '#52b775'}}>Please confirm your password!</span>),
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
            placeholder="Enter Your Password again"
            style={{ height: "3rem", width: "25rem", background: "gray-200" }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            style={{ width: "6rem", height: "2.5rem" }}
            type="primary"
            htmlType="submit"
          >
            Sign Up
          </Button>
        </Form.Item>
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "blue",
            gap: "1rem",
          }}
        >
          <span style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <span>Already have an Account?</span>
            <GoArrowRight />
          </span>
          <Button
            style={{ width: "6rem", height: "2.5rem" }}
            onClick={redirectToPage}
          >
            Click here
          </Button>
        </span>
      </div>

      {/* Toast Container to display notifications */}
      <ToastContainer />
    </Form>
  );
};

export default SignupPage;
