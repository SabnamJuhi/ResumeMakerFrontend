import React, { useState } from "react";
import "./all-details.css";
import { Input, Button } from "antd";

const Skillset = ({ data, handleChange, setSkillSet }) => {
  // const [val, setVal] = useState([]);
  const {
    technology,
    language,
    tools,
    databaseName,
    operatingSys,
    ideUsed,
    webServer,
    skills,
  } = data;
  const handleChangeSkill = (e, i, fieldName) => {
    const updatedSkills = [...skills];
    updatedSkills[i][fieldName] = e.target.value;
    setSkillSet((prevSkillSet) => ({
      ...prevSkillSet,
      skills: updatedSkills,
    }));
  };
  const handleDeleteSkill = (i) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(i, 1);
    setSkillSet((prevSkillSet) => ({
      ...prevSkillSet,
      skills: updatedSkills,
    }));
  };
  const handleAddSkills = () => {
    setSkillSet((prevSkillSet) => ({
      ...prevSkillSet,
      skills: [
        ...prevSkillSet.skills,
        { value1: "", value2: "" },
      ],
    }));
  };

  return (
    <div>
      {" "}
      <div className="form-details">
        <div className="skill-set">
          <div className="skill-set-div">
            <span className="skill-title">Technologies:</span>
            <span>
              <span>
                <Input
                  placeholder="Technology Name"
                  className="skill-set-input"
                  onChange={(e) => handleChange(e, "skill-set")}
                  name="technology"
                  value={technology}
                />
              </span>
            </span>
          </div>
          <div className="skill-set-div">
            <span className="skill-title">Languages:</span>
            <span>
              <span>
                <Input
                  placeholder="Languages Name"
                  className="skill-set-input"
                  onChange={(e) => handleChange(e, "skill-set")}
                  name="language"
                  value={language}
                />
              </span>
            </span>
          </div>
          <div className="skill-set-div">
            <span className="skill-title">Tools:</span>
            <span>
              <span>
                <Input
                  placeholder="Tools Name"
                  className="skill-set-input"
                  onChange={(e) => handleChange(e, "skill-set")}
                  name="tools"
                  value={tools}
                />
              </span>
            </span>
          </div>
          <div className="skill-set-div">
            <span className="skill-title">Database:</span>
            <span>
              <span>
                <Input
                  placeholder="Database Name"
                  className="skill-set-input"
                  onChange={(e) => handleChange(e, "skill-set")}
                  name="databaseName"
                  value={databaseName}
                />
              </span>
            </span>
          </div>
          <div className="skill-set-div">
            <span className="skill-title">Operating System:</span>
            <span>
              <span>
                <Input
                  placeholder="Operating System"
                  className="skill-set-input"
                  onChange={(e) => handleChange(e, "skill-set")}
                  name="operatingSys"
                  value={operatingSys}
                />
              </span>
            </span>
          </div>
          <div className="skill-set-div">
            <span className="skill-title">IDE Used</span>
            <span>
              <span>
                <Input
                  placeholder="IDE Used"
                  className="skill-set-input"
                  onChange={(e) => handleChange(e, "skill-set")}
                  name="ideUsed"
                  value={ideUsed}
                />
              </span>
            </span>
          </div>
          <div className="skill-set-div">
            <span className="skill-title">Web Server</span>
            <span>
              <span>
                <Input
                  placeholder="Web Server"
                  className="skill-set-input"
                  onChange={(e) => handleChange(e, "skill-set")}
                  name="webServer"
                  value={webServer}
                />
              </span>
            </span>
          </div>
          <div className="input-skill">
            {skills.map((data, i) => (
              <div key={i} className="input-row">
                <Input
                  value={data.value1}
                  style={{height: "3rem", width: "18rem"}}
                  placeholder={`Skill Name ${i + 1}`}
                  onChange={(e) => handleChangeSkill(e, i, "value1")}
                />
                <Input
                  value={data.value2}
                  style={{height: "3rem"}}
                  placeholder={`Description ${i + 1}`}
                  onChange={(e) => handleChangeSkill(e, i, "value2")}
                />
                <button onClick={() => handleDeleteSkill(i)}>X</button>
              </div>
            ))}
          </div>
          <div className="skill-set-button-div">
            <Button
              type="primary"
              className="skill-set-button"
              onClick={handleAddSkills}
            >
              ADD SKILLS
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skillset;
