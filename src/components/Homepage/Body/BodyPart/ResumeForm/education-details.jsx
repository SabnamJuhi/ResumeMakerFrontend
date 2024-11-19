import React from "react";
import { Form, Input } from "antd";

const Educationdetails = ({ data, handleChange }) => {
  const { hQualification, university, passingYear } = data;
  return (
    <div>
      <div className="form-details">
        <div className="education-details-main-div">
          <div className="education-details-sub-div">
            <span className="education-details-title">
              Higher Qualification:
            </span>
            <span>
              <Form.Item
                name="hQualification"
                rules={[
                  {
                    required: true,
                    message: "Please input your Higher Qualification!",
                  },
                ]}
              >
                <Input
                  placeholder="Higher Qualification *"
                  className="education-details-input"
                  onChange={(e) => handleChange(e, "education-details")}
                  name="hQualification"
                  value={hQualification}
                />
              </Form.Item>
            </span>
          </div>
          <div className="education-details-sub-div">
            <span className="education-details-title">University:</span>
            <span>
              <Form.Item
                name="university"
                rules={[
                  {
                    required: true,
                    message: "Please input your University!",
                  },
                ]}
              >
                <Input
                  placeholder="University *"
                  className="education-details-input"
                  onChange={(e) => handleChange(e, "education-details")}
                  name="university"
                  value={university}
                />
              </Form.Item>
            </span>
          </div>
          <div className="education-details-sub-div">
            <span className="education-details-title">Passing Year:</span>
            <span>
              <Form.Item
                name="passingYear"
                rules={[
                  {
                    required: true,
                    message: "Please input your Passing Year!",
                  },
                ]}
              >
                <Input
                  placeholder="Passing Year*"
                  className="education-details-input"
                  onChange={(e) => handleChange(e, "education-details")}
                  name="passingYear"
                  value={passingYear}
                />
              </Form.Item>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Educationdetails;
