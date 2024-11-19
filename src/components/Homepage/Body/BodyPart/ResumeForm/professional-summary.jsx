import React, { useState } from "react";
import "./all-details.css";
import { Button, Input } from "antd";
import { EditOutlined, PlusOutlined, CloseOutlined } from "@ant-design/icons";

const ProfessionalSummary = ({
  handleChange,
  professionalSummary,
  setProfessinalSummary,
}) => {
  const [pSummary, setPSummary] = useState("");
  
  const [editIndex, setEditIndex] = useState(null);

  const handleAddPSummary = () => {
    if (pSummary.trim() !== "") {
      if (editIndex !== null) {
        // Edit existing summary at the same index
        const updatedSummary = [...professionalSummary];
        updatedSummary.splice(editIndex, 1, pSummary);
        setProfessinalSummary(updatedSummary);
        setEditIndex(null);
      } else {
        // Add new summary
        setProfessinalSummary([...professionalSummary, pSummary]);
      }

      setPSummary("");
    }
  };

  const handleSummaryEdit = (index) => {
    setPSummary(professionalSummary[index]);
    setEditIndex(index);
  };
  const handleSummaryDelete = (index) => {
    if (professionalSummary) {
      const updatedSummary = professionalSummary.filter(
        (item) => item !== index
      );

      if (updatedSummary) {
        setProfessinalSummary(updatedSummary);
      }

      console.log(updatedSummary);
    }
  };

  return (
    <div>
      <div className="form-details">
        <div>
          <ul>
            {professionalSummary &&
              professionalSummary.map((item, index) => (
                <li key={index}>
                  {item}
                  <Button
                    onClick={() => handleSummaryEdit(index)}
                    style={{ marginLeft: "2rem" }}
                  >
                    <EditOutlined />
                  </Button>
                  <Button
                    onClick={() => handleSummaryDelete(item)}
                    style={{ marginLeft: "1rem" }}
                  >
                    <CloseOutlined />
                  </Button>
                </li>
              ))}
          </ul>
          <div className="professional-details">
            <div>
              <Input
                type="text"
                placeholder="Professional Summary *"
                className="professional-summary-input"
                value={pSummary}
                onChange={(e) => { setPSummary(e.target.value)}}
              />
            </div>
            <div
              className="professional-summary-button"
              onClick={handleAddPSummary}
            >
              {editIndex !== null ? "Save" : <PlusOutlined className="plus-icon" />}{" "}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalSummary;
