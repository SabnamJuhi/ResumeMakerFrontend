import React, { useState } from "react";
import Resume from "./basic-details";
import ProfessionalSummary from "./professional-summary";
import SkillSet from "./skill-set";
import EducationDetails from "./education-details";
import Workexperience from "./work-experience";
import { Button, Form } from "antd";
import axios from "axios";
import "./all-details.css";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const AllDetails = () => {
  // const [formData, setFormData] = useState([]);
  // const { updateTableData } = useData();

  const [showPresentDate, setShowPresentDate] = useState(false);

  const navigate = useNavigate();

  const [resume, setResume] = useState({
    name: "",
    email: "",
    title: "",
    linkedln: "",
    mNumber: "",
    address: "",
    gender: "",
    mStatus: "",
  });

  const [professionalSummary, setProfessinalSummary] = useState([]);
  // const [skill, setSkill] = useState([]);
  const [skillSet, setSkillSet] = useState({
    technology: "",
    language: "",
    tools: "",
    databaseName: "",
    operatingSys: "",
    ideUsed: "",
    webServer: "",
    skills: [],
  });

  const [educationDetails, setEducationDetails] = useState({
    hQualification: "",
    university: "",
    passingYear: "",
  });

  // work-Experience
  const workInitialData = {
    company: "",
    designation: "",
    startDates: "",
    endDates: "",
    projects: [
      {
        projectName: "",
        projectTechnology: "",
        projectDescription: "",
        responsibilities: [],
      },
    ],
  };

  const [workExp, setWorkExp] = useState([workInitialData]);
  const [responsibility, setResponsibility] = useState([]);

  const handleAddExp = () => {
    setWorkExp([...workExp, workInitialData]);
  };

  const handleAddProject = (index) => {
    const data = workExp;
    const newProject = data.map((exp, i) => {
      if (index === i) {
        exp.projects = [
          ...exp.projects,
          {
            projectName: "",
            projectTechnology: "",
            projectDescription: "",
            responsibilities: [],
          },
        ];
      }
      return exp;
    });
    setWorkExp(newProject);
  };

  const handleAddResponsibility = (outerIndex, pIndex) => {
    const data = workExp;
    const updatedData = [...data];
    const projectResponsibility = responsibility.map((res) => res);
    const flattenedResponsibility = projectResponsibility.flat();
    updatedData[outerIndex].projects[pIndex].responsibilities.push(
      ...flattenedResponsibility
    );
    setWorkExp(updatedData);
    setResponsibility([]);
  };
  const handleWorkExpChange = (e, index) => {
    const { name, value } = e.target;
    const newData = workExp.map((exp, i) => {
      if (i === index) {
        exp[name] = value;
      }
      return exp;
    });
    setWorkExp(newData);
  };
  const handleWorkDateChange = (date, dateString, index, dateType) => {
    console.log(date, dateString);
    const newData = workExp.map((exp, i) => {
      if (i === index) {
        exp[dateType] = dateString;
      }
      return exp;
    });

    setWorkExp(newData);
  };

  // const handleWorkDateChange = (date, dateString, index, dateType) => {
  //   console.log(date, dateString);
  //   const newData = workExp.map((exp, i) => {
  //     if (i === index) {
  //       exp[dateType] = showPresentDate ?  'present' : dateString ;
  //     }
  //     return exp;
  //   });

  //   setWorkExp(newData);
  // };

  // const handleWorkDateChange = (date, dateString, index, dateType) => {
  //   const newData = workExp.map((exp, i) => {
  //     if (i === index) {
  //       if (dateType === "startDates") {
  //         exp.startDates = showPresentDate ? dateString : dateString;
  //       } else if (dateType === "endDates") {
  //         exp.endDates = showPresentDate ? 'present' : dateString;
  //       }
  //     }
  //     return exp;
  //   });

  //   setWorkExp(newData);
  // };

  const onChangeCheckbox = (e) => {
    console.log(`checked = ${e.target.checked}`);
    setShowPresentDate(e.target.checked);
  };

  const handleProjectChange = (e, outerIndex, pIndex) => {
    const { name, value } = e.target;
    const data = workExp;
    const newData = data.map((exp, index) => {
      if (index === outerIndex) {
        exp.projects.map((project, i) => {
          if (i === pIndex && typeof project[name] === "string") {
            project[name] = value;
          }
          if (i === pIndex && Array.isArray(project[name])) {
            project[name] = [...project[name], value];
          }
          return project;
        });
      }
      return exp;
    });
    setWorkExp(newData);
  };

  const handleRespoChange = (e, pIndex) => {
    const { value } = e.target;

    // Create a copy of the current responsibility array
    const updatedResponsibility = [...responsibility];

    // Update the value at the specified index
    updatedResponsibility[pIndex] = value;

    // Set the updated responsibility array in the state
    setResponsibility(updatedResponsibility);
  };
  const handleRespDelete = (companyIndex, projectIndex, respIndex) => {
    const updatedWorkExp = [...workExp];
    updatedWorkExp[companyIndex].projects[projectIndex].responsibilities.splice(
      respIndex,
      1
    );
    setWorkExp(updatedWorkExp);
  };
  const handleRespEdit = (companyIndex, projectIndex, respIndex) => {
    const editedResponsibility = prompt("Enter the edited responsibility:");

    if (editedResponsibility !== null) {
      const updatedWorkExp = [...workExp];
      updatedWorkExp[companyIndex].projects[projectIndex].responsibilities[
        respIndex
      ] = editedResponsibility;
      setWorkExp(updatedWorkExp);
    }
  };

  const handleDeleteCompany = (companyIndex) => {
    console.log("Deleting company at index:", companyIndex);
    setWorkExp((prevWorkExp) => {
      // Filter out the company at the specified index
      const updatedWorkExp = prevWorkExp.filter(
        (_, index) => index !== companyIndex
      );
      console.log("Updated workExp:", updatedWorkExp);
      return updatedWorkExp;
    });
  }; // Pass this function from the parent component
  const handleDeleteProject = ({ companyIndex, projectIndex }) => {
    console.log(
      "Deleting project at company index:",
      companyIndex,
      "and project index:",
      projectIndex
    );
    setWorkExp((prevWorkExp) => {
      const updatedWorkExp = [...prevWorkExp];
      // Filter out the project at the specified company index and project index
      updatedWorkExp[companyIndex].projects = updatedWorkExp[
        companyIndex
      ].projects.filter((_, index) => index !== projectIndex);
      console.log("Updated workExp:", updatedWorkExp);
      return updatedWorkExp;
    });
  };

  // to handlechange all the components
  const handleChange = (e, component, data, index) => {
    if (component === "resume") {
      const { name, value } = e.target;
      setResume({ ...resume, [name]: value });
    }
    if (component === "resume-gender" || component === "resume-mStatus") {
      const { name, value } = e;
      setResume({ ...resume, [name]: value });
    }
    if (component === "professional-summary") {
      const { value } = e.target;
      setProfessinalSummary([...professionalSummary, value]);
    }
    if (component === "skill-set") {
      const { name, value } = e.target;
      setSkillSet({ ...skillSet, [name]: value });
    }
    if (component === "education-details") {
      const { name, value } = e.target;
      setEducationDetails({ ...educationDetails, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");
    // alert()
    // console.log(responsibility);
    // console.log(
    //   resume,
    //   professionalSummary,
    //   skillSet,
    //   educationDetails,
    //   workExp
    // );

    // const newData = {
    //   key: new Date().toISOString(),
    //   name: e.name,
    //   designation: e.title,
    //   skills: e.skills,
    //    // Set the created date
    // };
    // // setFormData([...formData, newData]);
    // updateTableData(newData);

    const finalObj = {
      userId: userId,
      name: resume.name,
      email: resume.email,
      title: resume.title,
      linkedln: resume.linkedln,
      mNumber: resume.mNumber,
      address: resume.address,
      gender: resume.gender,
      mStatus: resume.mStatus,
      professionalSummary: professionalSummary,
      skillSet: {
        technology: skillSet.technology,
        language: skillSet.language,
        tools: skillSet.tools,
        databaseName: skillSet.databaseName,
        operatingSys: skillSet.operatingSys,
        ideUsed: skillSet.ideUsed,
        webServer: skillSet.webServer,
        skills: skillSet.skills.map((skills) => ({
          value1: skills.value1,
          value2: skills.value2,
        })),
      },
      educationDetails: {
        hQualification: educationDetails.hQualification,
        university: educationDetails.university,
        passingYear: educationDetails.passingYear,
      },
      workExp: workExp.map((exp, index) => ({
        company: exp.company,
        designation: exp.designation,
        startDates: exp.startDates,
        endDates: showPresentDate && index === 0 ? "present" : exp.endDates,
        // endDates: exp.endDates,
        projects: exp.projects.map((project) => ({
          projectDescription: project.projectDescription,
          projectName: project.projectName,
          projectTechnology: project.projectTechnology,
          responsibilities: project.responsibilities.map((res) => res),
        })),
      })),
    };

    if (token) {
      try {
        const response = await axios.post(
          "https://resume-maker-backend-pied.vercel.app/api/v1/submit-data",
          finalObj,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, 
            },
          }
        );

        if (response.status === 200) {
          navigate("/home");
          console.log("Form data sent successfully.");
        } else {
          console.error("Form data submission failed.");
        }
      } catch (error) {
        console.error("An error occurre d ", error);
      }
    }
  };

  return (
    <div>
      <Form
        className="resume-main-div"
        onFinish={handleSubmit}
        scrollToFirstError
      >
        <Resume data={resume} handleChange={handleChange} />
        <div className="details-title">Professional Summary</div>
        <ProfessionalSummary
          professionalSummary={professionalSummary}
          setProfessinalSummary={setProfessinalSummary}
          handleChange={handleChange}
        />
        <div className="details-title">Skill Set</div>
        <SkillSet
          data={skillSet}
          handleChange={handleChange}
          setSkillSet={setSkillSet}
        ></SkillSet>
        <div className="details-title">Education Details</div>
        <EducationDetails
          data={educationDetails}
          handleChange={handleChange}
        ></EducationDetails>
        <div className="details-title">Work Experience</div>
        <Workexperience
          workExp={workExp}
          responsibility={responsibility}
          handleWorkExpChange={handleWorkExpChange}
          handleProjectChange={handleProjectChange}
          handleRespoChange={handleRespoChange}
          handleAddProject={handleAddProject}
          handleAddResponsibilities={handleAddResponsibility}
          handleRespDelete={handleRespDelete}
          handleRespEdit={handleRespEdit}
          handleWorkDateChange={handleWorkDateChange}
          handleDeleteCompany={handleDeleteCompany}
          handleDeleteProject={handleDeleteProject}
          showPresentDate={showPresentDate}
          onChangeCheckbox={onChangeCheckbox}
        />

        <div>
          <Button type="primary" className="add-company" onClick={handleAddExp}>
            ADD COMPANY
          </Button>
        </div>
        <div>
          <Button type="primary" className="submit-data" htmlType="submit">
            SUBMIT DATA
          </Button>
        </div>
      </Form>
      {/* <BodyTable data={formData} /> */}
    </div>
  );
};

export default AllDetails;
