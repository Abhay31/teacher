import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./TeacherDetail.css"; // Import your custom CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const TeacherDetail = () => {
  const navigate = useNavigate();
  const { pranno } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [error, setError] = useState("");
  const [showBasic, setShowBasic] = useState(true);
  const [showAppointment, setShowAppointment] = useState(true);
  const [showAcademic, setShowAcademic] = useState(false);
  const [showMain, setShowMain] = useState(false);

  const fetchTeacherDetail = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/teacher/${pranno}`
      );
      console.log("API Response:", response.data); // Log the API response
      
      // Remove duplicate entries in acadeducations
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
      
      // Set the unique acadeducations back to the teacher data
      setTeacher({ ...response.data, acadeducations: uniqueAcadeducations });
    } catch (error) {
      console.error("Error fetching teacher details", error);
      setError("An error occurred. Please try again.");
    }
  };


  useEffect(() => {
    fetchTeacherDetail();
  }, [pranno]);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!teacher) {
    return <div>Loading...</div>;
  }

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  };

  const formatDateMonth = (isoString, formatType = "default") => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];
    const day = String(date.getDate()).padStart(2, "0");

    return formatType === "monthYear" ? `${month}, ${year}` : `${day}/${month}/${year}`;
  };

  const cleanAwards = (awardDescription, otherAwardReason) => {
    const awards = [];
    if (awardDescription && awardDescription !== "None" && awardDescription !== "Others") {
      awards.push(awardDescription);
    }
    if (otherAwardReason && otherAwardReason !== "None" && otherAwardReason !== "Others") {
      awards.push(otherAwardReason);
    }
    return awards.join(", ");
  };

  const cleanPunishments = (punishmentDescription, otherPunishmentReason) => {
    const punishments = [];
    if (punishmentDescription && punishmentDescription !== "None" && punishmentDescription !== "Others") {
      punishments.push(punishmentDescription);
    }
    if (otherPunishmentReason && otherPunishmentReason !== "None" && otherPunishmentReason !== "Others") {
      punishments.push(otherPunishmentReason);
    }
    return punishments.join(", ");
  };
  
  console.log(teacher.acadeducations);

  return (
    <div className="container mt-5">
      <div className="header">
        <FontAwesomeIcon icon={faArrowLeft} className="back-icon" onClick={() => navigate('/teacher')} />
      </div>
      <section className="teacher-details bg-yellow mt-5 mb-5">
        <div className="row align-items-center">
          <div className="col-md-3 text-center position-relative">
            <img
              className="teacher-photo"
              src={teacher.photo}
              alt={teacher.empname}
            />
            <FontAwesomeIcon
              icon={faPencilAlt}
              className="edit-icon"
              onClick={() => console.log("Edit teacher details")}
            />
          </div>
          <div className="col-md-9">
            <div className="row row1">
              <div className="col-md-6 fw-bold fs-1">{teacher.empname}</div>
            </div>
            <div className="row row1">
              <div className="col-md-6 fs-4 text-gray">
                {teacher.teachingsubtype} Teacher
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <h4
              onClick={() => setShowBasic(!showBasic)}
              className="toggle-header"
            >
              Basic Information
              <i
                className={`fas fa-chevron-${
                  showBasic ? "down" : "right"
                } toggle-icon`}
              />
            </h4>
            {showBasic && (
              <div className="toggle-content mt-3">
                <div className="row">
                  <div className="col-md-4 mb-1 fs-6">
                    <strong>PRAN / PF NO:</strong> {teacher.pranno}
                  </div>
                  <div className="col-md-4 mb-1 fs-6">
                    <strong>Father Name:</strong> {teacher.fname}
                  </div>
                  <div className="col-md-4 mb-1 fs-6">
                    <strong>Mother Name:</strong> {teacher.mname}
                  </div>
                  <div className="col-md-4 mb-1 fs-6">
                    <strong>Date of Birth:</strong> {formatDate(teacher.dob)}
                  </div>
                  <div className="col-md-4 mb-1 fs-6">
                    <strong>Gender:</strong> {teacher.gender}
                  </div>
                  <div className="col-md-4 mb-1 fs-6">
                    <strong>Mobile Number:</strong> {teacher.mobile}
                  </div>
                  <div className="col-md-4 mb-1 fs-6">
                    <strong>Salary ID:</strong> {teacher.salaryid}
                  </div>
                  <div className="col-md-4 mb-1 fs-6">
                    <strong>Aadhar Number:</strong> {teacher.aadharno}
                  </div>
                  <div className="col-md-4 mb-1 fs-6">
                    <strong>PAN Number:</strong> {teacher.panno}
                  </div>
                  <div className="col-md-4 mb-1 fs-6">
                    <strong>Marital Status:</strong> {teacher.marital}
                  </div>
                  <div className="col-md-4 mb-1 fs-6">
                    <strong>Date of Appointment:</strong>{" "}
                    {formatDate(teacher.dateofapp)}
                  </div>
                  <div className="col-md-4 mb-1 fs-6">
                    <strong>Address:</strong> {teacher.address}
                  </div>
                  <div className="col-md-4 mb-1 fs-6">
                    <strong>Height:</strong> {teacher.heightFeet} Feet{" "}
                    {teacher.heightInches} Inches
                  </div>
                  <div className="col-md-4 mb-1 fs-6">
                    <strong>Marks of Identification:</strong> {teacher.marks}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <h4
              onClick={() => setShowAppointment(!showAppointment)}
              className="toggle-header"
            >
              Appointment Details{" "}
              <i
                className={`fas fa-chevron-${
                  showAppointment ? "down" : "right"
                } toggle-icon`}
              />
            </h4>
            {showAppointment && (
              <div className="toggle-content mt-3">
                <div className="row">
                  <div className="col-md-4 mb-1 fs-6">
                    <strong>Caste Category:</strong> {teacher.caste}
                  </div>
                  <div className="col-md-4 mb-1 fs-6">
                    <strong>Appointment Caste Category:</strong>{" "}
                    {teacher.appcaste}
                  </div>
                  <div className="col-md-4 mb-1 fs-6">
                    <strong>UDISE Code:</strong> {teacher.udise}
                  </div>
                  <div className="col-md-4 mb-1 fs-6">
                    <strong>School Name:</strong> {teacher.schname}
                  </div>
                  <div className="col-md-4 mb-1 fs-6">
                    <strong>School Joining Date:</strong>{" "}
                    {formatDate(teacher.schooljoin)}
                  </div>
                  <div className="col-md-4 mb-1 fs-6">
                    <strong>Teaching Medium:</strong> {teacher.teachingmedium}
                  </div>
                  {teacher.talukaData && teacher.talukaData.length > 0 ? (
                    teacher.talukaData.map((data, index) => (
                      <React.Fragment key={index}>
                        <div className="col-md-4 mb-1 fs-6">
                          <strong>State:</strong> {data.state}
                        </div>
                        <div className="col-md-4 mb-1 fs-6">
                          <strong>Taluka Code:</strong> {data.code}
                        </div>
                        <div className="col-md-4 mb-1 fs-6">
                          <strong>Taluka Name:</strong> {data.name}
                        </div>
                      </React.Fragment>
                    ))
                  ) : (
                    <p>No taluka data available.</p>
                  )}
                  <div className="col-md-4 mb-1 fs-6">
                    <strong>Award:</strong> {cleanAwards(teacher.awardDescription, teacher.otherAwardReason)}
                  </div>
                  <div className="col-md-4 mb-1 fs-6">
                    <strong>Punishment:</strong> {cleanPunishments(teacher.punishmentDescription, teacher.otherPunishmentReason)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <h4
              onClick={() => setShowAcademic(!showAcademic)}
              className="toggle-header"
            >
              Academic Education
              <i
                className={`fas fa-chevron-${
                  showAcademic ? "down" : "right"
                } toggle-icon`}
              />
            </h4>
            {showAcademic && (
              <div className="toggle-content mt-3">
                {teacher.acadeducations && teacher.acadeducations.length > 0 ? (
                  teacher.acadeducations.map((edu, index) => (
                    <div key={index} className="education-section mt-4 mb-4">
                      <h5 className="text-decoration-underline mb-2">Education {index + 1}</h5>
                      <div className="row">
                        <div className="col-md-4 mb-1 fs-6">
                          <strong>University:</strong> {edu.university}
                        </div>
                        <div className="col-md-4 mb-1 fs-6">
                          <strong>Degree:</strong> {edu.degree}
                        </div>
                        <div className="col-md-4 mb-1 fs-6">
                          <strong>Specialization:</strong> {edu.specialization}
                        </div>
                        <div className="col-md-4 mb-1 fs-6">
                          <strong>City:</strong> {edu.city}
                        </div>
                        <div className="col-md-4 mb-1 fs-6">
                          <strong>Start Date:</strong> {formatDateMonth(edu.start_date, "monthYear")}
                        </div>
                        <div className="col-md-4 mb-1 fs-6">
                          <strong>End Date / Expected Date:</strong> {formatDateMonth(edu.end_date, "monthYear")}
                        </div>
                        <div className="col-md-4 mb-1 fs-6">
                          <strong>CGPA:</strong> {edu.cgpa}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No academic education data available.</p>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <h4
              onClick={() => setShowMain(!showMain)}
              className="toggle-header"
            >
              Main Education
              <i
                className={`fas fa-chevron-${
                  showMain ? "down" : "right"
                } toggle-icon`}
              />
            </h4>
            {showMain && (
              <div className="toggle-content mt-3">
                {teacher.maineducations && teacher.maineducations.length > 0 ? (
                  teacher.maineducations.map((edu, index) => (
                    <div key={index} className="education-section mt-4 mb-4">
                      <h5 className="text-decoration-underline mb-2">Education {index + 1}</h5>
                      <div className="row">
                        <div className="col-md-4 mb-1 fs-6">
                          <strong>University:</strong> {edu.university}
                        </div>
                        <div className="col-md-4 mb-1 fs-6">
                          <strong>Degree:</strong> {edu.degree}
                        </div>
                        <div className="col-md-4 mb-1 fs-6">
                          <strong>Specialization:</strong> {edu.specialization}
                        </div>
                        <div className="col-md-4 mb-1 fs-6">
                          <strong>City:</strong> {edu.city}
                        </div>
                        <div className="col-md-4 mb-1 fs-6">
                          <strong>Start Date:</strong> {formatDate(edu.start_date, "monthYear")}
                        </div>
                        <div className="col-md-4 mb-1 fs-6">
                          <strong>End Date / Expected Date:</strong> {formatDate(edu.end_date, "monthYear")}
                        </div>
                        <div className="col-md-4 mb-1 fs-6">
                          <strong>CGPA:</strong> {edu.cgpa}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No main education data available.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeacherDetail;
