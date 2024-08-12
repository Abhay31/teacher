import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./UpdateTeacher.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Accordion from "react-bootstrap/Accordion";
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";

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

const talukaCodes = [
  {
    state: "Maharashtra",
    talukas: [
      { name: "Mumbai", code: "MH01" },
      { name: "Pune", code: "MH02" },
      { name: "Nashik", code: "MH03" },
      { name: "Nagpur", code: "MH04" },
    ],
  },
  {
    state: "Gujarat",
    talukas: [
      { name: "Ahmedabad", code: "GJ01" },
      { name: "Surat", code: "GJ02" },
      { name: "Vadodara", code: "GJ03" },
      { name: "Rajkot", code: "GJ04" },
    ],
  },
  {
    state: "Karnataka",
    talukas: [
      { name: "Bangalore", code: "KA01" },
      { name: "Mysore", code: "KA02" },
      { name: "Hubli", code: "KA03" },
      { name: "Mangalore", code: "KA04" },
    ],
  },
  {
    state: "Tamil Nadu",
    talukas: [
      { name: "Chennai", code: "TN01" },
      { name: "Coimbatore", code: "TN02" },
      { name: "Madurai", code: "TN03" },
      { name: "Tiruchirappalli", code: "TN04" },
    ],
  },
  {
    state: "Rajasthan",
    talukas: [
      { name: "Jaipur", code: "RJ01" },
      { name: "Udaipur", code: "RJ02" },
      { name: "Jodhpur", code: "RJ03" },
      { name: "Kota", code: "RJ04" },
    ],
  },
];

const UpdateTeacher = () => {
  const { pranno } = useParams();
  const navigate = useNavigate();
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
  const [talukaData, setTalukaData] = useState([]);
  const [awardDescription, setAwardDescription] = useState("");
  const [otherAwardReason, setOtherAwardReason] = useState("");
  const [punishmentDescription, setPunishmentDescription] = useState("");
  const [otherPunishmentReason, setOtherPunishmentReason] = useState("");
  const [acadeducations, setAcadEducations] = useState([]);
  const [maineducations, setMainEducations] = useState([]);
  const [lastError, setLastError] = useState("");

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/teacher/${pranno}`
        );
        const teacher = response.data;
        const uniqueAcadeducations = response.data.acadeducations.filter(
          (value, index, self) =>
            index === self.findIndex((t) => (
              t.university === value.university &&
              t.degree === value.degree &&
              t.specialization === value.specialization &&
              t.city === value.city &&
              t.start_date === value.start_date &&
              t.end_date === value.end_date &&
              t.cgpa === value.cgpa
            ))
        );

        const uniqueMaineducations = response.data.maineducations.filter(
          (value, index, self) =>
            index === self.findIndex((t) => (
              t.university === value.university &&
              t.degree === value.degree &&
              t.specialization === value.specialization &&
              t.city === value.city &&
              t.start_date === value.start_date &&
              t.end_date === value.end_date &&
              t.cgpa === value.cgpa
            ))
        );

        setEmpname(teacher.empname);
        setFname(teacher.fname);
        setMname(teacher.mname);
        setDob(teacher.dob);
        setGender(teacher.gender);
        setMobile(teacher.mobile);
        setSalaryid(teacher.salaryid);
        setAadharno(teacher.aadharno);
        setPanno(teacher.panno);
        setMarital(teacher.marital);
        setDateofApp(teacher.dateofapp);
        setAddress(teacher.address);
        setHeightFeet(teacher.heightFeet);
        setHeightInches(teacher.heightInches);
        setMarks(teacher.marks);
        setCaste(teacher.caste);
        setAppcaste(teacher.appcaste);
        setUdise(teacher.udise);
        setSchname(teacher.schname);
        setSchoolJoin(teacher.schooljoin);
        // setPhoto(teacher.photo);
        setTeachingSubType(teacher.teachingsubtype);
        setTeachingMedium(teacher.teachingmedium);
        setTalukaData(teacher.talukaData);
        setAwardDescription(teacher.awardDescription);
        setOtherAwardReason(teacher.otherAwardReason);
        setPunishmentDescription(teacher.punishmentDescription);
        setOtherPunishmentReason(teacher.otherPunishmentReason);
        setAcadEducations(uniqueAcadeducations);
        setMainEducations(uniqueMaineducations);
      } catch (error) {
        console.error("Error fetching teacher data:", error);
      }
    };
    fetchTeacher();
  }, [pranno]);

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

  const awardOptions = [
    { value: "Distric Council Award", label: "Distric Council Award" },
    { value: "Division Council Award", label: "Division Council Award" },
    {
      value: "Maharashtra State Government Award",
      label: "Maharashtra State Government Award",
    },
    { value: "Others", label: "Others" },
  ];

  const punishmentOptions = [
    { value: "Warning", label: "Warning Letter" },
    { value: "Suspension", label: "Suspension" },
    { value: "1 Increment Stop", label: "1 Increment Stop" },
    { value: "2 Increment Stop", label: "2 Increment Stop" },
    { value: "3 Increment Stop", label: "3 Increment Stop" },
    { value: "Termination", label: "Termination" },
    {
      value: "Increment stop for all time",
      label: "Increment stop for all time",
    },
    { value: "Others", label: "Others" },
  ];

  const handleAwardChange = (e) => {
    const { value } = e.target;
    setAwardDescription(value);
    if (value !== "Others") {
      setOtherAwardReason("");
    }
  };

  const handlePunishmentChange = (e) => {
    const { value } = e.target;
    setPunishmentDescription(value);
    if (value !== "Others") {
      setOtherPunishmentReason("");
    }
  };

  const handleOtherAwardReasonChange = (e) => {
    setOtherAwardReason(e.target.value);
  };

  const handleOtherPunishmentReasonChange = (e) => {
    setOtherPunishmentReason(e.target.value);
  };

  const handleStateChange = (e) => {
    const stateName = e.target.value;
    const selectedStateObj = talukaCodes.find(
      (state) => state.state === stateName
    );
    if (selectedStateObj) {
      setTalukaData([{ state: stateName, code: "", name: "" }]);
    } else {
      console.error("State not found:", stateName);
      setTalukaData([]);
    }
  };

  const handleCodeChange = (e) => {
    const code = e.target.value;
    const taluka = talukaCodes
      .find((state) => state.state === talukaData[0]?.state)
      ?.talukas.find((taluka) => taluka.code === code);
    setTalukaData([
      { ...talukaData[0], code, name: taluka ? taluka.name : "" },
    ]);
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    const taluka = talukaCodes
      .find((state) => state.state === talukaData[0]?.state)
      ?.talukas.find((taluka) => taluka.name === name);
    setTalukaData([
      { ...talukaData[0], name, code: taluka ? taluka.code : "" },
    ]);
  };

  const addAcadEducation = () => {
    const newEducation = {
      university: "",
      degree: "",
      specialization: "",
      city: "",
      start_date: "",
      end_date: "",
      cgpa: "",
    };
    setAcadEducations([...acadeducations, newEducation]);
  };

  const removeAcadEducation = (id) => {
    const newEducations = acadeducations.filter(
      (education) => education.id !== id
    );
    setAcadEducations(newEducations);
  };

  const addMainEducation = () => {
    const newEducation = {
      university: "",
      degree: "",
      specialization: "",
      city: "",
      start_date: "",
      end_date: "",
      cgpa: "",
    };
    setMainEducations([...maineducations, newEducation]);
  };

  const removeMainEducation = (id) => {
    const newEducations = maineducations.filter(
      (education) => education.id !== id
    );
    setMainEducations(newEducations);
  };

  const showError = (message) => {
    if (message !== lastError) {
      toast.error(message);
      setLastError(message);
    }
  };

  const validateForm = () => {
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
    if (!dob) {
      showError("Date of Birth is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:5000/api/teacher/${pranno}`,
        {
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
          talukaData,
          awardDescription,
          otherAwardReason,
          punishmentDescription,
          otherPunishmentReason,
          acadeducations,
          maineducations,
        }
      );

      if (response.status === 200) {
        toast.success("Teacher detail updated successfully", {
          onClose: () => navigate("/teacher"),
        });
      } else {
        showError("Updating teacher failed");
      }
    } catch (error) {
      showError("Error updating teacher");
      console.error("Error updating teacher details:", error);
    }
  };

  console.log(pranno);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-2 mt-5">
        <Link to="/teacher" className="btn btn-link mx-3 ">
          <FaArrowLeft size={26} style={{ color: "rgb(0, 37, 92)" }} />
        </Link>
        <div className="flex-grow-1 text-center">
          <h2 className="UpdateTeacher">Update Teacher Details</h2>
        </div>
      </div>
      <div className="container">
        <div
          className="rounded-3 box"
          style={{
            backgroundColor: "#F2F0EC",
            boxShadow: "0 4px 8px  rgba(91, 91, 91, 0.3)",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{ backgroundColor: "#F2F0EC", padding: "25px" }}
          >
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header className="custom-accordion-header">
                  Personal Details
                </Accordion.Header>
                <Accordion.Body>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="formEmployeeName"
                          className="form-label fw-bold mb-2"
                        >
                          Employee Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="formEmployeeName"
                          value={empname}
                          onChange={handleInputChange(
                            setEmpname,
                            /^[A-Za-z0-9\s-]*$/,
                            50
                          )}
                          placeholder="Enter Employee Name"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="formFatherName"
                          className="form-label fw-bold mb-2"
                        >
                          Father Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="formFatherName"
                          value={fname}
                          onChange={handleInputChange(
                            setFname,
                            /^[A-Za-z0-9\s-]*$/,
                            50
                          )}
                          placeholder="Enter Father Name"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="formMotherName"
                          className="form-label fw-bold mb-2"
                        >
                          Mother Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="formMotherName"
                          value={mname}
                          onChange={handleInputChange(
                            setMname,
                            /^[A-Za-z0-9\s-]*$/,
                            50
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
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="formMobile"
                          className="form-label fw-bold mb-2"
                        >
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          className="form-control"
                          id="formMobile"
                          value={mobile}
                          onChange={handleInputChange(
                            setMobile,
                            /^[0-9]*$/,
                            10
                          )}
                          placeholder="Enter Mobile Number"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="formSalaryID"
                          className="form-label fw-bold mb-2"
                        >
                          Salary ID
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="formSalaryID"
                          value={salaryid}
                          onChange={handleInputChange(
                            setSalaryid,
                            /^[A-Za-z0-9]*$/,
                            10
                          )}
                          placeholder="Enter Salary ID"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="formAadharNo"
                          className="form-label fw-bold mb-2"
                        >
                          Aadhar Number
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="formAadharNo"
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
                      <div className="mb-3">
                        <label
                          htmlFor="formPanNo"
                          className="form-label fw-bold mb-2"
                        >
                          PAN Number
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="formPanNo"
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
                        >
                          <option value="">Select Status</option>
                          <option value="Single">Single</option>
                          <option value="Married">Married</option>
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
                          value={dateofapp}
                          onChange={(e) => setDateofApp(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="formAddress"
                          className="form-label fw-bold mb-2"
                        >
                          Address
                        </label>
                        <textarea
                          className="form-control"
                          id="formAddress"
                          value={address}
                          onChange={handleInputChange(
                            setAddress,
                            /^[A-Za-z0-9\s,.-]*$/,
                            250
                          )}
                          placeholder="Enter Address"
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label
                              htmlFor="formHeightFeet"
                              className="form-label fw-bold mb-2"
                            >
                              Height (Feet)
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="formHeightFeet"
                              value={heightFeet}
                              onChange={(e) => setHeightFeet(e.target.value)}
                              placeholder="Feet"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label
                              htmlFor="formHeightInches"
                              className="form-label fw-bold mb-2"
                            >
                              Height (Inches)
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="formHeightInches"
                              value={heightInches}
                              onChange={(e) => setHeightInches(e.target.value)}
                              placeholder="Inches"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label
                          htmlFor="formMarks"
                          className="form-label fw-bold mb-2"
                        >
                          Marks
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="formMarks"
                          value={marks}
                          onChange={(e) => setMarks(e.target.value)}
                          placeholder="Enter Marks"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Appointment Details</Accordion.Header>
                <Accordion.Body>
                  <div className="row">
                  <div className="col-md-6">
                      <div className="form-group text-start mb-1">
                        <label className="fw-bold mb-2">Caste Category</label>
                        <select
                          className="form-select mb-2"
                          value={caste}
                          onChange={(e) => setCaste(e.target.value)}
                        >
                          <option value="">Select Caste Category</option>
                          <option value="Single">Single</option>
                          <option value="Married">Married</option>
                          <option value="Widowed">Widowed</option>
                          <option value="Divorced">Divorced</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group text-start mb-1">
                        <label className="fw-bold mb-2">App Caste Category</label>
                        <select
                          className="form-select mb-2"
                          value={appcaste}
                          onChange={(e) => setAppcaste(e.target.value)}
                        >
                          <option value="">Select App Caste Category</option>
                          <option value="Single">Single</option>
                          <option value="Married">Married</option>
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
                          className="form-control mb-2"
                          placeholder="Enter UDISE Code"
                          value={udise}
                          onChange={(e) => setUdise(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group text-startmb-1">
                        <label className="fw-bold mb-2">School Name</label>
                        <input
                          type="text"
                          className="form-control mb-2"
                          placeholder="Enter School Name"
                          value={schname}
                          onChange={(e) => setSchname(e.target.value)}
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
                          value={schooljoin}
                          onChange={(e) => setSchoolJoin(e.target.value)}
                        />
                      </div>
                    </div>
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
                        >
                          {subject.map((option) => (
                            <option
                              key={option.value}
                              value={option.value}
                              onChange={(e) =>
                                setTeachingSubType(e.target.value)
                              }
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
                        >
                          {medium.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4 custom-dropdown">
                      <div className="form-group text-start">
                        <label className="fw-bold mb-2">District</label>
                        <select
                          className="form-select form-select-lg mb-3"
                          value={talukaData[0]?.state || ""}
                          onChange={handleStateChange}
                          aria-label="Default select example"
                          required
                        >
                          <option value="">Select District</option>
                          {talukaCodes.map((state) => (
                            <option key={state.state} value={state.state}>
                              {state.state}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4 custom-dropdown">
                      <div className="form-group text-start">
                        <label className="fw-bold mb-2">Taluka Code</label>
                        <select
                          className="form-select form-select-lg mb-3"
                          value={talukaData[0]?.code || ""}
                          onChange={handleCodeChange}
                          aria-label="Default select example"
                          required
                        >
                          <option value="">Select Taluka Code</option>
                          {talukaCodes
                            .find(
                              (state) => state.state === talukaData[0]?.state
                            )
                            ?.talukas.map((taluka) => (
                              <option key={taluka.code} value={taluka.code}>
                                {taluka.code}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4 custom-dropdown">
                      <div className="form-group text-start">
                        <label className="fw-bold mb-2">Taluka Name</label>
                        <select
                          className="form-select form-select-lg mb-3"
                          value={talukaData[0]?.name || ""}
                          onChange={handleNameChange}
                          aria-label="Default select example"
                          required
                        >
                          <option value="">Select Taluka Name</option>
                          {talukaCodes
                            .find(
                              (state) => state.state === talukaData[0]?.state
                            )
                            ?.talukas.map((taluka) => (
                              <option key={taluka.name} value={taluka.name}>
                                {taluka.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6 custom-dropdown">
                      <div className="mb-3">
                        <label
                          htmlFor="awardDescription"
                          className="form-label fw-bold mb-2"
                        >
                          Award Description
                        </label>
                        <select
                          className="form-select form-select-lg mb-3"
                          id="awardDescription"
                          name="awardDescription"
                          value={awardDescription}
                          onChange={handleAwardChange}
                        >
                          <option value="">Select Award</option>
                          {awardOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      {awardDescription === "Others" && (
                        <div className="mb-3">
                          <label
                            htmlFor="otherAwardReason"
                            className="form-label fw-bold mb-2"
                          >
                            Please specify
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="otherAwardReason"
                            name="otherAwardReason"
                            value={otherAwardReason}
                            onChange={handleOtherAwardReasonChange}
                          />
                        </div>
                      )}
                    </div>
                    <div className="col-md-6 custom-dropdown">
                      <div className="mb-3">
                        <label
                          htmlFor="punishmentDescription"
                          className="form-label fw-bold mb-2"
                        >
                          Punishment Description
                        </label>
                        <select
                          className="form-select form-select-lg mb-3 "
                          id="punishmentDescription"
                          name="punishmentDescription"
                          value={punishmentDescription}
                          onChange={handlePunishmentChange}
                        >
                          <option value="">Select Punishment</option>
                          {punishmentOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      {punishmentDescription === "Others" && (
                        <div className="mb-3">
                          <label
                            htmlFor="otherPunishmentReason"
                            className="form-label fw-bold mb-2"
                          >
                            Please specify
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="otherPunishmentReason"
                            name="otherPunishmentReason"
                            value={otherPunishmentReason}
                            onChange={handleOtherPunishmentReasonChange}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Academic Qualifications</Accordion.Header>
                <Accordion.Body>
                  {acadeducations.map((acadeducation, index) => (
                    <div className="card mb-4" key={acadeducation.id}>
                      <div className="card-header color1 text-white d-flex justify-content-between align-items-center fs-5 fw-bold">
                        <span>Education {index + 1}</span>
                        <div>
                          <FaPlusCircle
                            onClick={addAcadEducation}
                            style={{ cursor: "pointer", marginRight: "10px" }}
                          />
                          {acadeducations.length > 1 && (
                            <FaTrashAlt
                              onClick={() => removeAcadEducation(acadeducation.id)}
                              style={{ cursor: "pointer" }}
                            />
                          )}
                        </div>
                      </div>
                      <div
                        className="card-body"
                        style={{ backgroundColor: "#F2F0EC" }}
                      >
                        {/* Rest of the form fields */}
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group text-start mb-1">
                              <label className="fw-bold mb-2">
                                University *
                              </label>
                              <input
                                type="text"
                                className="form-control mb-2"
                                value={acadeducation.university}
                                onChange={(e) => {
                                  const newEducations = [...acadeducations];
                                  newEducations[index].university =
                                    e.target.value;
                                  setAcadEducations(newEducations);
                                }}
                                placeholder="University"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group text-start mb-1">
                              <label className="fw-bold mb-2">Degree *</label>
                              <input
                                type="text"
                                className="form-control mb-2"
                                value={acadeducation.degree}
                                onChange={(e) => {
                                  const newEducations = [...acadeducations];
                                  newEducations[index].degree = e.target.value;
                                  setAcadEducations(newEducations);
                                }}
                                placeholder="Degree"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group text-start mb-1">
                              <label className="fw-bold mb-2">
                                Specialization
                              </label>
                              <input
                                type="text"
                                className="form-control mb-2"
                                value={acadeducation.specialization}
                                onChange={(e) => {
                                  const newEducations = [...acadeducations];
                                  newEducations[index].specialization =
                                    e.target.value;
                                  setAcadEducations(newEducations);
                                }}
                                placeholder="Specialization (Optional)"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group text-start mb-1">
                              <label className="fw-bold mb-2">City *</label>
                              <input
                                type="text"
                                className="form-control mb-2"
                                value={acadeducation.city}
                                onChange={(e) => {
                                  const newEducations = [...acadeducations];
                                  newEducations[index].city = e.target.value;
                                  setAcadEducations(newEducations);
                                }}
                                placeholder="City"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group text-start mb-1">
                              <label className="fw-bold mb-2">
                                Start Date *
                              </label>
                              <input
                                type="date"
                                className="form-control mb-2"
                                value={acadeducation.start_date}
                                onChange={(e) => {
                                  const newEducations = [...acadeducations];
                                  newEducations[index].start_date =
                                    e.target.value;
                                  setAcadEducations(newEducations);
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group text-start mb-1">
                              <label className="fw-bold mb-2">End Date *</label>
                              <input
                                type="date"
                                className="form-control mb-2"
                                value={acadeducation.end_date}
                                onChange={(e) => {
                                  const newEducations = [...acadeducations];
                                  newEducations[index].end_date =
                                    e.target.value;
                                  setAcadEducations(newEducations);
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group text-start mb-1">
                              <label className="fw-bold mb-2">
                                CGPA/Percentage *
                              </label>
                              <input
                                type="text"
                                className="form-control mb-2"
                                value={acadeducation.cgpa}
                                onChange={(e) => {
                                  const newEducations = [...acadeducations];
                                  newEducations[index].cgpa = e.target.value;
                                  setAcadEducations(newEducations);
                                }}
                                placeholder="CGPA/Percentage"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Professional Qualifications</Accordion.Header>
                <Accordion.Body>
                  {maineducations.map((maineducation, index) => (
                    <div className="card mb-4" key={maineducation.id}>
                      <div className="card-header color1 text-white d-flex justify-content-between align-items-center fs-5 fw-bold">
                        <span>Education {index + 1}</span>
                        <div>
                          <FaPlusCircle
                            onClick={addMainEducation}
                            style={{ cursor: "pointer", marginRight: "10px" }}
                          />
                          {maineducations.length > 1 && (
                            <FaTrashAlt
                              onClick={() => removeMainEducation(maineducation.id)}
                              style={{ cursor: "pointer" }}
                            />
                          )}
                        </div>
                      </div>
                      <div
                        className="card-body"
                        style={{ backgroundColor: "#F2F0EC" }}
                      >
                        {/* Rest of the form fields */}
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group text-start mb-1">
                              <label className="fw-bold mb-2">
                                University *
                              </label>
                              <input
                                type="text"
                                className="form-control mb-2"
                                value={maineducation.university}
                                onChange={(e) => {
                                  const newEducations = [...maineducations];
                                  newEducations[index].university =
                                    e.target.value;
                                  setMainEducations(newEducations);
                                }}
                                placeholder="University"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group text-start mb-1">
                              <label className="fw-bold mb-2">Degree *</label>
                              <input
                                type="text"
                                className="form-control mb-2"
                                value={maineducation.degree}
                                onChange={(e) => {
                                  const newEducations = [...maineducations];
                                  newEducations[index].degree = e.target.value;
                                  setMainEducations(newEducations);
                                }}
                                placeholder="Degree"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group text-start mb-1">
                              <label className="fw-bold mb-2">
                                Specialization
                              </label>
                              <input
                                type="text"
                                className="form-control mb-2"
                                value={maineducation.specialization}
                                onChange={(e) => {
                                  const newEducations = [...maineducations];
                                  newEducations[index].specialization =
                                    e.target.value;
                                  setMainEducations(newEducations);
                                }}
                                placeholder="Specialization (Optional)"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group text-start mb-1">
                              <label className="fw-bold mb-2">City *</label>
                              <input
                                type="text"
                                className="form-control mb-2"
                                value={maineducation.city}
                                onChange={(e) => {
                                  const newEducations = [...maineducations];
                                  newEducations[index].city = e.target.value;
                                  setMainEducations(newEducations);
                                }}
                                placeholder="City"
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group text-start mb-1">
                              <label className="fw-bold mb-2">
                                Start Date *
                              </label>
                              <input
                                type="date"
                                className="form-control mb-2"
                                value={maineducation.start_date}
                                onChange={(e) => {
                                  const newEducations = [...maineducations];
                                  newEducations[index].start_date =
                                    e.target.value;
                                  setMainEducations(newEducations);
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group text-start mb-1">
                              <label className="fw-bold mb-2">End Date *</label>
                              <input
                                type="date"
                                className="form-control mb-2"
                                value={maineducation.end_date}
                                onChange={(e) => {
                                  const newEducations = [...maineducations];
                                  newEducations[index].end_date =
                                    e.target.value;
                                  setMainEducations(newEducations);
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group text-start mb-1">
                              <label className="fw-bold mb-2">
                                CGPA/Percentage *
                              </label>
                              <input
                                type="text"
                                className="form-control mb-2"
                                value={maineducation.cgpa}
                                onChange={(e) => {
                                  const newEducations = [...maineducations];
                                  newEducations[index].cgpa = e.target.value;
                                  setMainEducations(newEducations);
                                }}
                                placeholder="CGPA/Percentage"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <div className="d-flex justify-content-center mt-3">
              <button type="submit" className="btn btn-primary">
                Update Teacher
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default UpdateTeacher;
