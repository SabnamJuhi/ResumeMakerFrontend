import React from "react";
import { Form, Input, Select } from "antd";
import "./all-details.css";

const BasicDetails = ({ data, handleChange }) => {
  const { name, email, title, linkedln, mNumber, address, gender, mStatus } =
    data;
  const { Option } = Select;
  return (
    <>
      <span className="title">Resume</span>
      <div className="form-details">
        <div className="input-div-box">
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your Name!",
                whitespace: true,
              },
            ]}
          >
            <Input
              value={name}
              onChange={(e) => handleChange(e, "resume")}
              className="input"
              placeholder="Name *"
              name="name"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              type="email"
              placeholder="Email *"
              className="input"
              onChange={(e) => handleChange(e, "resume")}
              name="email"
              value={email}
            />
          </Form.Item>
        </div>
        <div className="input-div-box">
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: "Please input your Title!",
              },
            ]}
          >
            <Input
              value={title}
              onChange={(e) => handleChange(e, "resume")}
              className="input"
              placeholder="Title *"
              name="title"
            />
          </Form.Item>
          <Form.Item
            name="mNumber"
            rules={[
              {
                required: true,
                message: "Please input your Mobile No!",
              },
            ]}
          >
            <Input
              type="text"
              placeholder="Mobile No *"
              className="input"
              onChange={(e) => handleChange(e, "resume")}
              name="mNumber"
              value={mNumber}
            />
          </Form.Item>
        </div>
        <div className="input-div-box">
          <Form.Item
            name="linkedln"
            rules={[
              {
                required: true,
                message: "Please input your Linkedln URL!",
              },
            ]}
          >
            <Input
              placeholder="Linkedln URL"
              className="input"
              onChange={(e) => handleChange(e, "resume")}
              name="linkedln"
              value={linkedln}
            />
          </Form.Item>
          <Form.Item
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your Address!",
              },
            ]}
          >
            <Input
              placeholder="Address *"
              className="input"
              onChange={(e) => handleChange(e, "resume")}
              name="address"
              value={address}
            />
          </Form.Item>
        </div>
        <div className="input-div-box">
          <span className="input">
            <Form.Item
              name="gender"
              style={{ height: "3rem" }}
              rules={[
                {
                  required: true,
                  message: "Please input your Gender!",
                },
              ]}
            >
              <Select
                placeholder="gender *"
                value={gender}
                allowClear
                onChange={(value) => {
                  handleChange(
                    {
                      name: "gender",
                      value, // Set the selected gender
                    },
                    "resume-gender"
                  );
                }}
              >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
          </span>
          <span className="input">
            <Form.Item
              name="mStatus"
              rules={[
                {
                  required: true,
                  message: "Please input your Marital Status!",
                },
              ]}
            >
              <Select
                placeholder="Marital Status *"
                value={mStatus}
                allowClear
                onChange={(value) => {
                  handleChange(
                    {
                      name: "mStatus",
                      value, // Set the selected marital status
                    },
                    "resume-mStatus"
                  );
                }}
              >
                <Option value="married">Married</Option>
                <Option value="unmarried">Unmarried</Option>
              </Select>
            </Form.Item>
          </span>
        </div>
      </div>
    </>
  );
};

export default BasicDetails;
