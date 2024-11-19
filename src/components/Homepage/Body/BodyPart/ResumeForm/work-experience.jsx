import React, { useState } from "react";
import "./all-details.css";
import { Button, Input, Modal, DatePicker, Checkbox } from "antd";
import { CloseOutlined, EditOutlined, DeleteFilled } from "@ant-design/icons";

const Workexperience = ({
  workExp,
  responsibility,
  handleWorkExpChange,
  handleProjectChange,
  handleRespoChange,
  handleAddProject,
  handleAddResponsibilities,
  handleRespDelete,
  handleRespEdit,
  handleWorkDateChange,
  handleDeleteCompany,
  handleDeleteProject,
  onChangeCheckbox,
  showPresentDate,
}) => {
  const [deleteCompanyModalVisible, setDeleteCompanyModalVisible] =
    useState(false);
  const [deleteCompanyIndex, setDeleteCompanyIndex] = useState(null);

  const [deleteProjectModalVisible, setDeleteProjectModalVisible] =
    useState(false);
  const [deleteProjectIndexes, setDeleteProjectIndexes] = useState({
    companyIndex: null,
    projectIndex: null,
  });

  const getRespo = (responsibility) => {
    const arr = [];
    for (const key in responsibility) {
      const ele = responsibility[key];
      arr.push(ele);
    }
    return arr;
  };

  const showDeleteCompanyModal = (companyIndex) => {
    setDeleteCompanyIndex(companyIndex);
    setDeleteCompanyModalVisible(true);
  };

  const handleDeleteCompanyOk = () => {
    setDeleteCompanyModalVisible(false);
    handleDeleteCompany(deleteCompanyIndex);
    setDeleteCompanyIndex(null);
  };
  const handleDeleteCompanyCancel = () => {
    setDeleteCompanyModalVisible(false);
  };

  const showDeleteProjectModal = (companyIndex, projectIndex) => {
    setDeleteProjectIndexes({ companyIndex, projectIndex });
    setDeleteProjectModalVisible(true);
  };
  const handleDeleteProjectOk = () => {
    setDeleteProjectModalVisible(false);
    setDeleteProjectModalVisible(false);
    handleDeleteProject(deleteProjectIndexes);
    setDeleteProjectIndexes({
      companyIndex: null,
      projectIndex: null,
    });
  };

  const handleDeleteProjectCancel = () => {
    setDeleteProjectModalVisible(false);
  };

  return (
    <div>
      {workExp.map((ele, companyIndex) => (
        <div key={companyIndex} className="form-details">
          <div>
            <Checkbox className="checkbox" onChange={onChangeCheckbox}>
              Currently working here?
            </Checkbox>
          </div>
          <div className="company-main-div">
            <div>
              <span>
                <DeleteFilled
                  className="delete-button"
                  onClick={() => showDeleteCompanyModal(companyIndex)}
                />
                <Modal
                  title="Confirmation"
                  visible={deleteCompanyModalVisible}
                  onOk={handleDeleteCompanyOk}
                  onCancel={handleDeleteCompanyCancel}
                >
                  <p>Do you want to save changes?</p>
                </Modal>
              </span>
            </div>
            <div className="work-experience-common-div">
              <span className="work-experience-title">Company:</span>
              <span>
                <Input
                  placeholder="Company"
                  className="company-input"
                  onChange={(e) => handleWorkExpChange(e, companyIndex)}
                  name="company"
                  value={ele.company}
                />
              </span>
            </div>
            <div className="work-experience-common-div">
              <span className="work-experience-title">Designation:</span>
              <div className="designation-div">
                <span>
                  <Input
                    placeholder="Designation"
                    className="designation-input"
                    onChange={(e) => handleWorkExpChange(e, companyIndex)}
                    name="designation"
                    value={ele.designation}
                  />
                </span>
                <span>
                  <DatePicker
                    onChange={(date, dateString) =>
                      handleWorkDateChange(
                        date,
                        dateString,
                        companyIndex,
                        "startDates"
                      )
                    }
                    style={{ height: "3rem" }}
                    name="startDates"
                    picker="month"
                  />
                </span>
                <span
                  style={{
                    border: "1px solid lightgrey",
                    borderRadius: "9%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {showPresentDate ? (
                    <Input
                      name="endDates"
                      value="Present"
                      style={{
                        border: "none",
                        background: "none",
                        width: "8.5rem",
                      }}
                    />
                  ) : (
                    <DatePicker
                      onChange={(date, dateString) =>
                        handleWorkDateChange(
                          date,
                          dateString,
                          companyIndex,
                          "endDates"
                        )
                      }
                      style={{ border: "none", background: "none" }}
                      name="endDates"
                      picker="month"
                    />
                  )}
                </span>
              </div>
            </div>
            {ele.projects.map((project, projectIndex) => (
              <div key={projectIndex} className="company-main-div extra-div">
                <div>
                  <span>
                    <DeleteFilled
                      className="delete-button"
                      onClick={() =>
                        showDeleteProjectModal(companyIndex, projectIndex)
                      }
                    />
                    <Modal
                      title="Confirmation"
                      visible={deleteProjectModalVisible}
                      onOk={handleDeleteProjectOk}
                      onCancel={handleDeleteProjectCancel}
                    >
                      <p>Do you want to save changes?</p>
                    </Modal>
                  </span>
                </div>
                <div className="work-experience-common-div">
                  <span className="work-experience-title">Projects:</span>
                  <div className="designation-main-div">
                    <div className="designation-1">
                      <span>
                        <Input
                          placeholder="Project Name"
                          className="project-input1"
                          onChange={(e) =>
                            handleProjectChange(e, companyIndex, projectIndex)
                          }
                          name="projectName"
                          value={project.projectName}
                          disabled={false}
                        />
                      </span>
                      <span>
                        <Input
                          placeholder="Project Technology"
                          className="project-input1"
                          onChange={(e) =>
                            handleProjectChange(e, companyIndex, projectIndex)
                          }
                          name="projectTechnology"
                          value={project.projectTechnology}
                          disabled={false}
                        />
                      </span>
                    </div>
                    <div>
                      <span>
                        <Input
                          placeholder="Project Description"
                          className="project-input2"
                          onChange={(e) =>
                            handleProjectChange(e, companyIndex, projectIndex)
                          }
                          name="projectDescription"
                          value={project.projectDescription}
                          disabled={false}
                        />
                      </span>
                    </div>

                    <div>
                      <ul>
                        {project.responsibilities.map((resp, respIndex) => (
                          <li key={respIndex}>
                            <span>{getRespo(resp)}</span>
                            <Button
                              onClick={() =>
                                handleRespEdit(
                                  companyIndex,
                                  projectIndex,
                                  respIndex
                                )
                              }
                              style={{ marginLeft: "2rem" }}
                            >
                              <EditOutlined />
                            </Button>
                            <Button
                              onClick={() =>
                                handleRespDelete(
                                  companyIndex,
                                  projectIndex,
                                  respIndex
                                )
                              }
                              style={{ marginLeft: "1rem" }}
                            >
                              <CloseOutlined />
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="designation-3">
                      <span>
                        <Input
                          type="text"
                          id={`resp-${companyIndex}`}
                          name="responsibilities"
                          placeholder="Project Responsibilities"
                          className="project-input3"
                          onChange={(e) => handleRespoChange(e, projectIndex)}
                          value={responsibility[projectIndex] || ""}
                          disabled={false}
                        />
                      </span>

                      <span>
                        <Button
                          type="primary"
                          className="project-button3"
                          onClick={() =>
                            handleAddResponsibilities(
                              companyIndex,
                              projectIndex
                            )
                          }
                        >
                          ADD
                        </Button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <span>
            <Button
              type="primary"
              className="add-projects"
              onClick={() => handleAddProject(companyIndex)}
            >
              ADD PROJECTS
            </Button>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Workexperience;
