// // ResetPassword.js
// import React, { useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { Form, Input, Button } from "antd";
// import "./auth-reset.css";

// const ResetPassword = () => {
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const { userEmail, resetToken } = useParams();

//   console.log("User Email:", userEmail);
//   console.log("reset token:", resetToken);

//   const handleChangePassword = async (values) => {
//     const { password } = values;
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.post(
//         "http://localhost:8007/api/v1/reset-password",
//         { newPassword: password }, // Use the correct field name
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       console.log(response.data);
//     } catch (error) {
//       console.error("Error changing password:", error);
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         console.error("Server responded with an error:", error.response.data);
//       } else if (error.request) {
//         // The request was made but no response was received
//         console.error("No response received from the server:", error.request);
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         console.error("Error setting up the request:", error.message);
//       }
//     }
//   };

//   return (
//     <div>
//       <div className="reset-password">
//         <Form className="reset-password-inner" onFinish={(values) => handleChangePassword(values.password)}>
//           <h1>Reset Password</h1>
//           <span>
//             <Form.Item
//               name="password"
//               label="Password"
//               style={{ textAlign: "left" }}
//               rules={[
//                 {
//                   required: true,
//                   message: "Please input your password!",
//                 },
//               ]}
//               hasFeedback
//             >
//               <Input.Password
//                 placeholder="Enter Your Password"
//                 style={{ height: "3rem" }}
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//               />
//             </Form.Item>

//             <Form.Item
//               name="confirm"
//               label="Confirm Password"
//               style={{ textAlign: "left" }}
//               dependencies={["password"]}
//               hasFeedback
//               rules={[
//                 {
//                   required: true,
//                   message: "Please confirm your password!",
//                 },
//                 ({ getFieldValue }) => ({
//                   validator(_, value) {
//                     if (!value || getFieldValue("password") === value) {
//                       return Promise.resolve();
//                     }
//                     return Promise.reject(
//                       new Error(
//                         "The new password that you entered do not match!"
//                       )
//                     );
//                   },
//                 }),
//               ]}
//             >
//               <Input.Password
//                 placeholder="Enter Your Password again"
//                 style={{ height: "3rem" }}
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//             </Form.Item>
//           </span>
//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Change Password
//             </Button>
//             <p style={{ color: "red" }}>{message}</p>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;
