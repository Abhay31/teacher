import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import AsyncSelect from "react-select/async";
import "./AddAward.css";
import axios from "axios";

const AddAward = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeName, setEmployeeName] = useState("");
  const [gender, setGender] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [awardDescription, setAwardDescription] = useState([]);
  const [otherAwardReason, setOtherAwardReason] = useState("");
  const [showOtherField, setShowOtherField] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [fieldsVisible, setFieldsVisible] = useState(false); // New state for field visibility
  const navigate = useNavigate();

  // Load employees based on input
  const loadOptions = async (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
      return;
    }
    try {
      const response = await axios.get("http://localhost:5000/api/teacher");
      const filteredEmployees = response.data
        .filter(
          (employee) =>
            !employee.awardDescription &&
            !employee.otherAwardReason &&
            (employee.pranno.toLowerCase().includes(inputValue.toLowerCase()) ||
              employee.empname.toLowerCase().includes(inputValue.toLowerCase()))
        )
        .map((employee) => ({
          value: employee.pranno,
          label: `${employee.pranno}`,
          empname: employee.empname,
          gender: employee.gender || "",
          schoolName: employee.schname || "",
          awardDescription: employee.awardDescription || "",
          otherAwardReason: employee.otherAwardReason || "",
        }));
      callback(filteredEmployees);
    } catch (error) {
      console.error("Error fetching employee data", error);
      setError(
        "An error occurred while fetching employee data. Please try again."
      );
      callback([]);
    }
  };

  // Handle changes in award description selection
  const handleAwardChange = (event) => {
    const options = event.target.options;
    const selectedOptions = [];
    let otherSelected = false;

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedOptions.push(options[i].value);
        if (options[i].value === "Others") {
          otherSelected = true;
        }
      }
    }

    setAwardDescription(selectedOptions);
    setShowOtherField(otherSelected);
  };

  // Handle employee selection
  const handleEmployeeChange = (selectedOption) => {
    if (selectedOption) {
      setSelectedEmployee(selectedOption);
      setEmployeeName(selectedOption.empname);
      setGender(selectedOption.gender);
      setSchoolName(selectedOption.schoolName);
      setAwardDescription(
        selectedOption.awardDescription
          ? selectedOption.awardDescription.split(", ")
          : []
      );
      setOtherAwardReason(selectedOption.otherAwardReason || "");
      setShowOtherField(
        selectedOption.awardDescription &&
          selectedOption.awardDescription.includes("Others")
      );
      setFieldsVisible(true); // Show fields when an employee is selected
      setIsEditing(true);
    } else {
      setSelectedEmployee(null);
      setEmployeeName("");
      setGender("");
      setSchoolName("");
      setAwardDescription([]);
      setOtherAwardReason("");
      setShowOtherField(false);
      setFieldsVisible(false); // Hide fields when no employee is selected
      setIsEditing(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      awardDescription: awardDescription.join(", "),
      otherAwardReason: showOtherField ? otherAwardReason : "",
    };

    console.log("Submitting form data:", formData);
    console.log("Selected Employee:", selectedEmployee);
    console.log("isEditing:", isEditing);

    try {
      if (isEditing && selectedEmployee) {
        // Update award
        const response = await axios.put(
          `http://localhost:5000/api/award/${selectedEmployee.value}`,
          formData
        );
        console.log("Server response:", response.data);
        navigate("/award"); // Navigate to award page after successful update
      } else {
        console.log("No employee selected or not in edit mode.");
      }
    } catch (error) {
      console.error("Error submitting form data", error);
      setError(
        "An error occurred while submitting the form. Please try again."
      );
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-2 mt-5">
        <Link to="/award" className="btn btn-link mx-3 mt-5">
          <FaArrowLeft size={26} style={{ color: "rgb(0, 37, 92)" }} />
        </Link>
        <div className="flex-grow-1 text-center mt-5">
          <h2 className="AddAward">Add Award</h2>
        </div>
      </div>
      <div className="container mt-4">
        <div
          className="rounded-2 box card-custom-height1 mb-0"
          style={{ backgroundColor: "#F2F0EC" }}
        >
          <form
            onSubmit={handleSubmit}
            className="form-container"
            style={{ backgroundColor: "#F2F0EC", padding: "25px" }}
          >
            <div className="mb-3 form-group">
              <label htmlFor="formPranno" className="form-label text-black">
                PRAN / PF NO.
              </label>
              <AsyncSelect
                id="formPranno"
                value={selectedEmployee}
                onChange={handleEmployeeChange}
                loadOptions={loadOptions}
                placeholder="Select PF No. (Ex- PR12345)"
                isClearable
                cacheOptions
                defaultOptions={false}
                noOptionsMessage={() => null}
                required
              />
            </div>
            {fieldsVisible && (
              <>
                <div className="mb-3 form-group">
                  <label htmlFor="formEmployeeName" className="form-label">
                    Employee Name
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-1"
                    id="formEmployeeName"
                    value={employeeName}
                    readOnly
                  />
                </div>
                <div className="mb-3 form-group">
                  <label htmlFor="formGender" className="form-label">
                    Gender
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-1"
                    id="formGender"
                    value={gender}
                    readOnly
                  />
                </div>
                <div className="mb-3 form-group">
                  <label htmlFor="formSchoolName" className="form-label">
                    School Name
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-1"
                    id="formSchoolName"
                    value={schoolName}
                    readOnly
                  />
                </div>
              </>
            )}
            <div className="row">
              <div className="mb-3 form-group">
                <label htmlFor="formAwardDescription" className="form-label">
                  Award Description
                </label>
                <select
                  className="form-select rounded-1"
                  id="formAwardDescription"
                  value={awardDescription}
                  onChange={handleAwardChange}
                  required
                >
                  <option
                    style={{ fontSize: "14px", paddingBottom: "2px" }}
                    value=""
                  >
                    Select Award
                  </option>
                  <option
                    style={{ fontSize: "14px", paddingBottom: "2px" }}
                    value="Distric Council Award"
                  >
                    Distric Council Award
                  </option>
                  <option
                    style={{ fontSize: "14px", paddingBottom: "2px" }}
                    value="Division Council Award"
                  >
                    Division Council Award
                  </option>
                  <option
                    style={{ fontSize: "14px", paddingBottom: "2px" }}
                    value="Maharashtra State Government Award"
                  >
                    Maharashtra State Government Award
                  </option>
                  <option
                    style={{ fontSize: "14px", paddingBottom: "2px" }}
                    value="Others"
                  >
                    Others
                  </option>
                </select>
              </div>
              {showOtherField && (
                <div className="mb-3 form-group">
                  <label htmlFor="formOtherReason" className="form-label">
                    Please specify
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-2"
                    id="formOtherReason"
                    value={otherAwardReason}
                    onChange={(e) => setOtherAwardReason(e.target.value)}
                    placeholder="Enter the reason"
                    required
                  />
                </div>
              )}
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary mt-4">
                {isEditing ? "Update" : "Submit"}
              </button>
            </div>
          </form>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
      </div>
    </>
  );
};

export default AddAward;
