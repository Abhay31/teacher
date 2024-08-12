import React, { useState, useEffect } from "react";
import "./AddTeacher.css";
import Taluka from "../Taluka/Taluka";
import AcadQual from "../AcadQual/AcadQual";
import MainQual from "../MainQual/MainQual";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const subject = [
  { value: "", label: "Select Subject Type" },
  { value: "Computer Science", label: "Computer Science" },
  { value: "History", label: "History" },
  { value: "Geography", label: "Geography" },
];

const medium = [
  { value: "", label: "Select Teaching Medium" },
  { value: "Hindi", label: "Hindi" },
  { value: "English", label: "English" },
];

const AddNewTeacher = () => {
  const navigate = useNavigate();
  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [talukaData, setTalukaData] = useState([]);
  const [pranno, setPranno] = useState("");
  const [empname, setEmpname] = useState("");
  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [salaryid, setSalaryid] = useState("");
  const [aadharno, setAadharno] = useState("");
  const [panno, setPanno] = useState("");
  const [marital, setMarital] = useState("");
  const [dateofapp, setDateofApp] = useState("");
  const [address, setAddress] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [marks, setMarks] = useState("");
  const [caste, setCaste] = useState("");
  const [appcaste, setAppcaste] = useState("");
  const [udise, setUdise] = useState("");
  const [schname, setSchname] = useState("");
  const [schooljoin, setSchoolJoin] = useState("");
  // const [photo, setPhoto] = useState("");
  const [teachingsubtype, setTeachingSubType] = useState("");
  const [teachingmedium, setTeachingMedium] = useState("");
  const [awardDescription, setAwardDescription] = useState([]);
  const [otherAwardReason, setOtherAwardReason] = useState("");
  const [showOtherAwardField, setShowOtherAwardField] = useState(false);
  const [punishmentDescription, setPunishmentDescription] = useState([]);
  const [otherPunishmentReason, setOtherPunishmentReason] = useState("");
  const [showOtherPunishmentField, setShowOtherPunishmentField] =
    useState(false);
  const [acadeducations, setAcadEducations] = useState([]);
  const [maineducations, setMainEducations] = useState([]);
  const [lastError, setLastError] = useState("");

  const handleInputChange = (setter, pattern, maxLength) => (e) => {
    const value = e.target.value;
    if (value.length > maxLength) {
      showError(`Length exceeded ${maxLength} characters.`);
    } else if (!pattern.test(value)) {
      showError("Invalid input.");
    } else {
      setter(value);
    }
  };

  const showError = (message) => {
    if (message !== lastError) {
      toast.error(message);
      setLastError(message);
    }
  };

  const validateForm = () => {
    if (!pranno) {
      showError("PRAN / PF No. is required.");
      return false;
    }
    if (!empname) {
      showError("Employee Name is required.");
      return false;
    }
    if (!fname) {
      showError("Father Name is required.");
      return false;
    }
    if (!mname) {
      showError("Mother Name is required.");
      return false;
    }
    if (!gender) {
      showError("Gender is required.");
      return false;
    }
    if (!mobile) {
      showError("Mobile Number is required.");
      return false;
    }
    if (!salaryid) {
      showError("Salary Id is required.");
      return false;
    }
    if (!aadharno) {
      showError("Aadhar Number is required.");
      return false;
    }
    if (!panno) {
      showError("PAN Number is required.");
      return false;
    }
    if (!address) {
      showError("Address is required.");
      return false;
    }
    if (!marital) {
      showError("Marital is required.");
      return false;
    }
    if (!marks) {
      showError("Marks of Identification is required.");
      return false;
    }
    if (!caste) {
      showError("Caste Category is required.");
      return false;
    }
    if (!appcaste) {
      showError("Appointment Caste Category is required.");
      return false;
    }
    if (!udise) {
      showError("UDISE Code is required.");
      return false;
    }
    if (!schname) {
      showError("School Name is required.");
      return false;
    }

    return true;
  };

  const handleFeetChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) >= 0 && Number(value) <= 10)) {
      setHeightFeet(value);
    }
  };

  const handleInchesChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) >= 0 && Number(value) <= 12)) {
      setHeightInches(value);
    }
  };

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
    setShowOtherAwardField(otherSelected);
  };

  const handlePunishmentChange = (event) => {
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
    setPunishmentDescription(selectedOptions);
    setShowOtherPunishmentField(otherSelected);
  };

  const handleEducationAcadChange = (data) => {
    setAcadEducations(data);
  };

  const handleEducationMainChange = (data) => {
    setMainEducations(data);
  };

  const handleTalukaChange = (data) => {
    setTalukaData(data);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const employeeData = {
      pranno,
      empname,
      fname,
      mname,
      dob,
      gender,
      mobile,
      salaryid,
      aadharno,
      panno,
      marital,
      dateofapp,
      address,
      heightFeet,
      heightInches,
      marks,
      caste,
      appcaste,
      udise,
      schname,
      schooljoin,
      // photo,
      teachingsubtype,
      teachingmedium,
      awardDescription,
      otherAwardReason,
      showOtherAwardField,
      punishmentDescription,
      otherPunishmentReason,
      talukaData,
      acadeducations,
      maineducations,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/teacher",
        employeeData
      );
      console.log(response.data);
      toast.success("Teacher data added successfully", {
        onClose: () => navigate("/teacher"),
      });
    } catch (error) {
      showError("Error adding teacher data");
      console.error("Error Teacher:", error);
    }
  };

  console.log(acadeducations);

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <ToastContainer />

      <div className="container mt-5">
        <div className="progress-container mb-4 mx-4">
          <div className={`circle ${currentStep >= 1 ? "active" : ""}`}>1</div>
          <div className={`line ${currentStep >= 2 ? "active" : ""}`}></div>
          <div className={`circle ${currentStep >= 2 ? "active" : ""}`}>2</div>
          <div className={`line ${currentStep >= 3 ? "active" : ""}`}></div>
          <div className={`circle ${currentStep >= 3 ? "active" : ""}`}>3</div>
          <div className={`line ${currentStep >= 4 ? "active" : ""}`}></div>
          <div className={`circle ${currentStep >= 4 ? "active" : ""}`}>4</div>
        </div>
        <div className="labels">
          <span
            className="text-start"
            style={{ fontSize: "15px", fontWeight: "500" }}
          >
            Personal Info
          </span>
          <span
            className="text-start"
            style={{ fontSize: "15px", fontWeight: "500", paddingLeft: "45px" }}
          >
            Appointment Details
          </span>
          <span
            className="text-end"
            style={{
              fontSize: "15px",
              fontWeight: "500",
              paddingRight: "20px",
            }}
          >
            Academic Qualifications
          </span>
          <span
            className="text-end"
            style={{ fontSize: "15px", fontWeight: "500" }}
          >
            Main Qualifications
          </span>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <Link to="/teacher" className="btn btn-link">
            <FaArrowLeft size={25} style={{ color: "rgb(0, 37, 92)" }} />
          </Link>
          <h2
            className="text-start AddTeacher"
            style={{ color: "rgb(0, 37, 92)" }}
          >
            Add New Teacher
          </h2>
          <div></div>
        </div>

        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <div
              className="card mb-5"
              style={{ boxShadow: "0px 3px 3px 0px rgba(0,0,0,0.3)" }}
            >
              <div className="card-header color1 text-white fw-bold fs-4">
                Personal Details
              </div>
              <div className="card-body" style={{ backgroundColor: "#F2F0EC" }}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group text-start mb-1">
                      <label className="fw-bold mb-2">PRAN / PF No.</label>
                      <input
                        type="text"
                        className="form-control"
                        id="formPranno"
                        value={pranno}
                        onChange={handleInputChange(
                          setPranno,
                          /^[A-Z0-9]*$/,
                          7
                        )}
                        placeholder="Enter PF No."
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group text-start mb-1">
                      <label className="fw-bold mb-2">Employee Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="formEmpname"
                        value={empname}
                        onChange={handleInputChange(
                          setEmpname,
                          /^[A-Za-z.\s]*$/,
                          30
                        )}
                        placeholder="Enter Employee Name"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group text-start mb-1">
                      <label className="fw-bold mb-2">Father Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="formFname"
                        value={fname}
                        onChange={handleInputChange(
                          setFname,
                          /^[A-Za-z.\s]*$/,
                          30
                        )}
                        placeholder="Enter Father Name"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group text-start mb-1">
                      <label className="fw-bold mb-2">Mother Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="formMname"
                        value={mname}
                        onChange={handleInputChange(
                          setMname,
                          /^[A-Za-z.\s]*$/,
                          30
                        )}
                        placeholder="Enter Mother Name"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group text-start mb-1">
                      <label className="fw-bold mb-2">Date of Birth</label>
                      <input
                        type="date"
                        className="form-control mb-2"
                        value={dob}
                        max={today} // Set the max attribute to today's date
                        onChange={(e) => setDob(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group text-start mb-1">
                      <label className="fw-bold mb-2">Gender</label>
                      <select
                        className="form-select mb-2"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group text-start mb-1">
                      <label className="fw-bold mb-2">Mobile Number</label>
                      <input
                        type="text"
                        className="form-control"
                        id="formMobile"
                        value={mobile}
                        onChange={handleInputChange(setMobile, /^[0-9]*$/, 10)}
                        placeholder="Enter Mobile Number"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group text-start mb-1">
                      <label className="fw-bold mb-2">Salary Id</label>
                      <input
                        type="text"
                        className="form-control"
                        id="formSalaryid"
                        value={salaryid}
                        onChange={handleInputChange(
                          setSalaryid,
                          /^[A-Z0-9]*$/,
                          6
                        )}
                        placeholder="Enter Salary Id"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group text-start mb-1">
                      <label className="fw-bold mb-2">Aadhaar No.</label>
                      <input
                        type="text"
                        className="form-control"
                        id="formAadharno"
                        value={aadharno}
                        onChange={handleInputChange(
                          setAadharno,
                          /^[0-9]*$/,
                          12
                        )}
                        placeholder="Enter Aadhar Number"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group text-start mb-1">
                      <label className="fw-bold mb-2">PAN No.</label>
                      <input
                        type="text"
                        className="form-control"
                        id="formPanno"
                        value={panno}
                        onChange={handleInputChange(
                          setPanno,
                          /^[A-Z0-9]*$/,
                          10
                        )}
                        placeholder="Enter PAN Number"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group text-start mb-1">
                      <label className="fw-bold mb-2">Marital Status</label>
                      <select
                        className="form-select mb-2"
                        value={marital}
                        onChange={(e) => setMarital(e.target.value)}
                        required
                      >
                        <option value="">Select Marital Status</option>
                        <option value="Married">Married</option>
                        <option value="Single">Single</option>
                        <option value="Widowed">Widowed</option>
                        <option value="Divorced">Divorced</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group text-start mb-1">
                      <label className="fw-bold mb-2">
                        Date of Appointment
                      </label>
                      <input
                        type="date"
                        className="form-control mb-2"
                        max={today} // Set the max attribute to today's date
                        value={dateofapp}
                        onChange={(e) => setDateofApp(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group text-start mb-1">
                      <label className="fw-bold mb-2">Address</label>
                      <textarea
                        className="form-control mb-2"
                        rows="3"
                        value={address}
                        onChange={handleInputChange(
                          setAddress,
                          /^[A-Za-z0-9.\-\s,]*$/,
                          100
                        )}
                        placeholder="Enter Address"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group text-start mb-1">
                      <label className="fw-bold mb-2">Height</label>
                      <div className="d-flex">
                        <input
                          type="number"
                          className="form-control me-2"
                          placeholder="Feet"
                          value={heightFeet}
                          onChange={handleFeetChange}
                        />
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Inches"
                          value={heightInches}
                          onChange={handleInchesChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-group text-start mb-1">
                      <label className="fw-bold mb-2">
                        Marks of Identification
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="formMarks"
                        value={marks}
                        onChange={handleInputChange(
                          setMarks,
                          /^[A-Za-z.\s,]*$/,
                          30
                        )}
                        placeholder="Enter Marks of Identification"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div
              className="card mb-5"
              style={{ boxShadow: "0px 3px 3px 0px rgba(0,0,0,0.3)" }}
            >
              <div className="card-header color1 text-white fw-bold fs-4">
                Appointment Details
              </div>
              <div className="card-body" style={{ backgroundColor: "#F2F0EC" }}>
                <div className="row">
                  <div className="col-md-6 custom-dropdown">
                    <div className="form-group text-start mb-1">
                      <label className="fw-bold mb-2">Caste Category</label>
                      <select
                        className="form-select form-select-lg mb-3"
                        aria-label="Default select example"
                        value={caste}
                        onChange={(e) => setCaste(e.target.value)}
                      >
                        <option value="">Select Caste Category</option>
                        <option value="Married">Married</option>
                        <option value="Single">Single</option>
                        <option value="Widowed">Widowed</option>
                        <option value="Divorced">Divorced</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6 custom-dropdown">
                    <div className="form-group text-start mb-1">
                      <label className="fw-bold mb-2">
                        Appointment Caste Category
                      </label>
                      <select
                        className="form-select form-select-lg mb-3"
                        aria-label="Default select example"
                        value={appcaste}
                        onChange={(e) => setAppcaste(e.target.value)}
                      >
                        <option value="">Select Caste Category</option>
                        <option value="Married">Married</option>
                        <option value="Single">Single</option>
                        <option value="Widowed">Widowed</option>
                        <option value="Divorced">Divorced</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group text-start mb-1">
                      <label className="fw-bold mb-2">UDISE Code</label>
                      <input
                        type="text"
                        className="form-control"
                        id="formUdise"
                        value={udise}
                        onChange={handleInputChange(setUdise, /^[0-9]*$/, 7)}
                        placeholder="Enter Udise Code"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group text-start mb-1">
                      <label className="fw-bold mb-2">School Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="formSchoolName"
                        value={schname}
                        onChange={handleInputChange(
                          setSchname,
                          /^[A-Za-z.\s]*$/,
                          40
                        )}
                        placeholder="Enter School Name"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group text-start mb-1">
                      <label className="fw-bold mb-2">
                        Current School Joining Date
                      </label>
                      <input
                        type="date"
                        className="form-control mb-2"
                        max={today}
                        value={schooljoin}
                        onChange={(e) => setSchoolJoin(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* <div className="col-md-6">
                    <div className="form-group text-start mb-1">
                      <label className="fw-bold mb-2">Photo</label>
                      <input
                        type="file"
                        className="form-control mb-2"
                        value={photo}
                        onChange={(e) => setPhoto(e.target.value)}
                        required
                      />
                    </div>
                  </div> */}
                  <div className="col-md-6 custom-dropdown">
                    <div className="form-group text-start mb-1">
                      <label className="fw-bold mb-2">
                        Teaching Subject Type
                      </label>
                      <select
                        className="form-select form-select-lg mb-3"
                        aria-label="Default select example"
                        value={teachingsubtype}
                        onChange={(e) => setTeachingSubType(e.target.value)}
                        required
                      >
                        {subject.map((option) => (
                          <option
                            key={option.value}
                            value={option.value}
                            onChange={(e) => setTeachingSubType(e.target.value)}
                          >
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6 custom-dropdown">
                    <div className="form-group text-start mb-1">
                      <label className="fw-bold mb-2">Teaching Medium</label>
                      <select
                        className="form-select form-select-lg mb-3"
                        aria-label="Default select example"
                        value={teachingmedium}
                        onChange={(e) => setTeachingMedium(e.target.value)}
                        required
                      >
                        {medium.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <Taluka onTalukaChange={handleTalukaChange} />
                  <div className="col-md-6 custom-dropdown">
                    <div className="form-group text-start mb-1">
                      <label className="fw-bold mb-2">Awards</label>
                      <select
                        className="form-control"
                        id="formAwardDescription"
                        value={awardDescription}
                        onChange={handleAwardChange}
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
                      {showOtherAwardField && (
                        <div className="mb-3">
                          <label
                            htmlFor="formOtherReason"
                            className="form-label"
                          >
                            Please specify
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="formOtherReason"
                            value={otherAwardReason}
                            onChange={(e) =>
                              setOtherAwardReason(e.target.value)
                            }
                            placeholder="Enter the reason"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 custom-dropdown mb-4">
                    <div className="form-group text-start mb-1">
                      <label className="fw-bold mb-2">Punishments</label>
                      <select
                        className="form-control"
                        id="formAwardDescription"
                        value={punishmentDescription}
                        onChange={handlePunishmentChange}
                      >
                        <option
                          style={{ fontSize: "14px", paddingBottom: "2px" }}
                          value=""
                        >
                          Select Punishment
                        </option>
                        <option
                          style={{ fontSize: "14px", paddingBottom: "2px" }}
                          value="Warning"
                        >
                          Warning Letter
                        </option>
                        <option
                          style={{ fontSize: "14px", paddingBottom: "2px" }}
                          value="Suspension"
                        >
                          Suspension
                        </option>
                        <option
                          style={{ fontSize: "14px", paddingBottom: "2px" }}
                          value="1 Increment Stop"
                        >
                          1Increment Stop
                        </option>
                        <option
                          style={{ fontSize: "14px", paddingBottom: "2px" }}
                          value="2 Increment Stop"
                        >
                          2 Increment Stop
                        </option>
                        <option
                          style={{ fontSize: "14px", paddingBottom: "2px" }}
                          value="3 Increment Stop"
                        >
                          3 Increment Stop
                        </option>
                        <option
                          style={{ fontSize: "14px", paddingBottom: "2px" }}
                          value="Termination"
                        >
                          Termination
                        </option>
                        <option
                          style={{ fontSize: "14px", paddingBottom: "2px" }}
                          value="Increment stop for all time"
                        >
                          Increment stop for all time
                        </option>
                        <option
                          style={{ fontSize: "14px", paddingBottom: "2px" }}
                          value="Others"
                        >
                          Others
                        </option>
                      </select>
                      {showOtherPunishmentField && (
                        <div className="mb-3">
                          <label
                            htmlFor="formOtherReason"
                            className="form-label"
                          >
                            Please specify
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="formOtherReason"
                            value={otherPunishmentReason}
                            onChange={(e) =>
                              setOtherPunishmentReason(e.target.value)
                            }
                            placeholder="Enter the reason"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div
              className="card mb-5"
              style={{ boxShadow: "0px 3px 3px 0px rgba(0,0,0,0.3)" }}
            >
              <div className="card-header color1 text-white fw-bold fs-4">
                Academic Qualifications
              </div>
              <div className="card-body mb-3 ">
                <AcadQual onEducationAcadChange={handleEducationAcadChange} />
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div
              className="card mb-5"
              style={{ boxShadow: "0px 3px 3px 0px rgba(0,0,0,0.3)" }}
            >
              <div className="card-header color1 text-white fw-bold fs-4">
                Main Qualification
              </div>
              <div className="card-body mb-3 ">
                <MainQual onEducationMainChange={handleEducationMainChange} />
              </div>
            </div>
          )}

          <div className="d-flex justify-content-center mb-5">
            {currentStep > 1 && (
              <button
                type="button"
                className="btn btn-outline-secondary px-3 border-2 mb-5 m-2 fw-bold"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Previous
              </button>
            )}
            {currentStep < 4 ? (
              <button
                type="button"
                className="btn btn-outline-primary px-4 border-2 mb-5 m-2 fw-bold"
                onClick={(e) => {
                  e.preventDefault();
                  handleNextStep();
                }}
              >
                Next
              </button>
            ) : (
              <button type="submit" className="btn btn-primary m-2 mb-5">
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewTeacher;
