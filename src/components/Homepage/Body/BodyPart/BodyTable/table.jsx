import React, { useState, useEffect } from "react";
import "./table.css";
import { Space, Table, Form, Button, Input } from "antd";

import axios from "axios";
import { SearchOutlined } from "@ant-design/icons";
const { Search } = Input;

const BodyTable = () => {
  const userId = localStorage.getItem("id");
  const [tableData, setTableData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [sortedInfo, setSortedInfo] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    console.log(storedUsername)
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  console.log(tableData);

  function redirectToPage() {
    window.location.href = "/home/resume";
  }

  const handleSearch = (value) => {
    setSearchInput(value);
  };

  useEffect(() => {
    const filtered = tableData.filter(
      (record) =>
        record.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        (record.skillSet.skills &&
          record.skillSet.skills.some(
            (skill) =>
              skill.value1.toLowerCase().includes(searchInput.toLowerCase()) ||
              skill.value2.toLowerCase().includes(searchInput.toLowerCase())
          ))
    );
    setFilteredData(filtered);
  }, [searchInput, tableData]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
        multiple: 4,
      },
    },
    {
      title: "Designation",
      dataIndex: "title",
      key: "title",
      sorter: {
        compare: (a, b) => a.title.localeCompare(b.title),
        multiple: 3,
      },
    },
    {
      title: "Skills",
      dataIndex: "skillsText",
      key: "skills",
      render: (_, record) => {
        console.log("Skills Data:", record);

        if (
          Array.isArray(record.skillSet.skills) &&
          record.skillSet.skills.length > 0
        ) {
          const skillsText = record.skillSet.skills
            .map((skill) => skill?.value1)
            .join(", ");
          console.log(`new data ${skillsText}`);
          return (
            <span>
              <p>{skillsText}</p>
            </span>
          );
        } else {
          return <p>No skills found</p>;
        }
      },
      sorter: {
        compare: (a, b) =>
          a.skillSet.skills[0]?.value1.localeCompare(
            b.skillSet.skills[0]?.value1
          ),
        multiple: 2,
      },
    },
    {
      title: "Created By",
      dataIndex: "createdby",
      key: "createdby",
      sorter: (a, b) => {
        const createdByA = a.createdby || "";
        const createdByB = b.createdby || "";

        return createdByA.localeCompare(createdByB);
      },
      render: (_, record) => <Space size="middle">{username}</Space>,
    },

    {
      title: "View",
      dataIndex: "_id",
      key: "_id",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => openPDF(record._id)}>view</a>
        </Space>
      ),
    },
    {
      title: "Download",
      dataIndex: "download",
      key: "download",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleDownload(record._id, record.name)}>
            Download
          </a>
        </Space>
      ),
    },
    {
      title: "Delete",
      key: "delete",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleDelete(record._id)}>Delete</a>
        </Space>
      ),
    },
  ];

  const openPDF = (id) => {
    window.open(
      `https://resume-maker-backend-pied.vercel.app/api/v1/get-data/${id}`,
      // ` http://localhost:8007/api/v1/get-data/${id}`,
      "_blank"
    );
  };

  const handleDownload = async (id, name) => {
    try {
      const response = await axios.get(
        `https://resume-maker-backend-pied.vercel.app/api/v1/get-data/${id}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = `${name}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `https://resume-maker-backend-pied.vercel.app/api/v1/delete-user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );

      if (response.status === 200) {
        fetchData();
        console.log("User deleted successfully");
      } else {
        console.error("Error deleting user:", response.data.message);
      }
    } catch (error) {
      console.error("An error occurred while deleting user:", error);
    }
  };

  var fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "https://resume-maker-backend-pied.vercel.app/api/v1/get-newdata",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );

      if (response.status) {
        console.log(response.data.user);
        setTableData(response.data.user);
      } else {
        console.error("Error fetching data from the backend");
      }
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    setSortedInfo(sorter);
  };
  const paginationConfig = {
    pageSize: 7,
    showSizeChanger: false,
    showTotal: (total) => `Total ${total} items`,
  };
  const getRowClassName = (record, index) => {
    return "custom-row";
  };

  return (
    <div className="body-outer-div">
      <div className="body-top">
        <div className="body-top-left">
          <Form>
            <Input.Search
              placeholder="Search Resume"
              name="search"
              allowClear
              onChange={(e) => handleSearch(e.target.value)}
              value={searchInput}
              style={{
                width: "270px",
                // height: "40px",
                lineHeight: "40px",
              }}
            />
          </Form>
        </div>
        <div className="body-top-right">
          <Button
            type="primary"
            className="resume-button"
            onClick={redirectToPage}
          >
            Create Resume
          </Button>
        </div>
      </div>
      <div className="pdf-holder">
        <Table
          columns={columns}
          dataSource={filteredData.length > 0 ? filteredData : tableData}
          className="custom-header-table"
          rowClassName={getRowClassName}
          onChange={onChange}
          pagination={paginationConfig}
        />
      </div>
    </div>
  );
};
export default BodyTable;
