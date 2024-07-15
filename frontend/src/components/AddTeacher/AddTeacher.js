import React, { useState, useEffect } from "react";
import "./AddTeacher.css";
import Taluka from "../Taluka/Taluka";
import AcadQual from "../AcadQual/AcadQual";
import MainQual from "../MainQual/MainQual";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

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
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const [awardDescription, setAwardDescription] = useState([]);
  const [otherAwardReason, setOtherAwardReason] = useState("");
  const [showOtherAwardField, setShowOtherAwardField] = useState(false);
  const [punishmentDescription, setPunishmentDescription] = useState([]);
  const [otherPunishmentReason, setOtherPunishmentReason] = useState("");
  const [showOtherPunishmentField, setShowOtherPunishmentField] =
    useState(false);

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  return (
    <div className="container mt-5">
      <div className="progress-container mb-4">
        <div className={`circle ${currentStep >= 1 ? "active" : ""}`}>1</div>
        <div className={`line ${currentStep >= 2 ? "active" : ""}`}></div>
        <div className={`circle ${currentStep >= 2 ? "active" : ""}`}>2</div>
        <div className={`line ${currentStep >= 3 ? "active" : ""}`}></div>
        <div className={`circle ${currentStep >= 3 ? "active" : ""}`}>3</div>
        <div className={`line ${currentStep >= 4 ? "active" : ""}`}></div>
        <div className={`circle ${currentStep >= 4 ? "active" : ""}`}>4</div>
      </div>
      <div className="labels">
        <span className="text-start">Personal Info</span>
        <span className="text-start">Appointment Details</span>
        <span className="text-center">Academic Qualifications</span>
        <span className="text-end">Main Qualifications</span>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-5">
        <Link to="/teacher" className="btn btn-link">
          <FaArrowLeft size={25} />
        </Link>
        <h2 className="text-primary-emphasis text-start fw-bold mt-3">
          Add New Teacher
        </h2>
        <div></div>
      </div>

      <form>
        {currentStep === 1 && (
          <div className="card mb-5">
            <div className="card-header color1 text-white fw-bold">
              Personal Details
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group text-start">
                    <label className="fw-bold mb-2">PRAN / PF NO.</label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter PF NO"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group text-start">
                    <label className="fw-bold mb-2">Employee Name</label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter Employee Name"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group text-start">
                    <label className="fw-bold mb-2">Father Name</label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter Father Name"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group text-start">
                    <label className="fw-bold mb-2">Mother Name</label>
                    <input
                      type="email"
                      className="form-control mb-2"
                      placeholder="Enter Mother Name"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group text-start">
                    <label className="fw-bold mb-2">Date of Birth</label>
                    <input type="date" className="form-control mb-2" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group text-start">
                    <label className="fw-bold mb-2">Gender</label>
                    <div className="d-flex">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input cursor-pointer"
                          type="radio"
                          name="gender"
                          id="male"
                          value="Male"
                        />
                        <label className="form-check-label" htmlFor="male">
                          Male
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input cursor-pointer"
                          type="radio"
                          name="gender"
                          id="female"
                          value="Female"
                        />
                        <label className="form-check-label" htmlFor="female">
                          Female
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group text-start">
                    <label className="fw-bold mb-2">Mobile Number</label>
                    <input
                      type="tel"
                      className="form-control mb-2"
                      placeholder="Enter Mobile Number"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group text-start">
                    <label className="fw-bold mb-2">Salary Id</label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter Salary Id"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group text-start">
                    <label className="fw-bold mb-2">Aadhar Number</label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter Aadhar Number"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group text-start">
                    <label className="fw-bold mb-2">PAN Number</label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter PAN Number"
                    />
                  </div>
                </div>
                <div className="col-md-6 custom-dropdown">
                  <div className="form-group text-start">
                    <label className="fw-bold mb-2">Marital Status</label>
                    <select
                      className="form-select form-select-lg mb-3"
                      aria-label="Default select example"
                    >
                      <option value="">Select Marital Status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Widowed">Widowed</option>
                      <option value="Separated">Separated</option>
                      <option value="Divorced">Divorced</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group text-start">
                    <label className="fw-bold mb-2">Date of Appointment</label>
                    <input type="date" className="form-control mb-2" />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group text-start">
                    <label className="fw-bold mb-2">Address</label>
                    <textarea
                      className="form-control mb-2"
                      placeholder="Enter Address"
                      rows="3"
                    ></textarea>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group text-start">
                    <label className="fw-bold mb-2">Height</label>
                    <div className="d-flex">
                      <input
                        type="number"
                        className="form-control me-2"
                        placeholder="Feet"
                        min="0"
                      />
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Inches"
                        min="0"
                        max="11"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group text-start">
                    <label className="fw-bold mb-2">
                      Marks of Identification
                    </label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter Marks of Identification"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="card mb-5">
            <div className="card-header color1 text-white fw-bold">
              Appointment Details
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 custom-dropdown">
                  <div className="form-group text-start">
                    <label className="fw-bold mb-2">Caste Category</label>
                    <select
                      className="form-select form-select-lg mb-3"
                      aria-label="Default select example"
                    >
                      <option value="">Select Caste Category</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Widowed">Widowed</option>
                      <option value="Separated">Separated</option>
                      <option value="Divorced">Divorced</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6 custom-dropdown">
                  <div className="form-group text-start">
                    <label className="fw-bold mb-2">
                      Appointment Caste Category
                    </label>
                    <select
                      className="form-select form-select-lg mb-3"
                      aria-label="Default select example"
                    >
                      <option value="">
                        Select Appointment Caste Category
                      </option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Widowed">Widowed</option>
                      <option value="Separated">Separated</option>
                      <option value="Divorced">Divorced</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group text-start">
                    <label className="fw-bold mb-2">UDISE Code</label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter UDISE Code"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group text-start">
                    <label className="fw-bold mb-2">School Name</label>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter School Name"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group text-start">
                    <label className="fw-bold mb-2">Date of Appointment</label>
                    <input type="date" className="form-control mb-2" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group text-start">
                    <label className="fw-bold mb-2">Photo</label>
                    <input type="file" className="form-control mb-2" />
                  </div>
                </div>
                <div className="col-md-6 custom-dropdown">
                  <div className="form-group text-start">
                    <label className="fw-bold mb-2">
                      Teaching Subject Type
                    </label>
                    <select
                      className="form-select form-select-lg mb-3"
                      aria-label="Default select example"
                    >
                      {subject.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-6 custom-dropdown">
                  <div className="form-group text-start">
                    <label className="fw-bold mb-2">Teaching Medium</label>
                    <select
                      className="form-select form-select-lg mb-3"
                      aria-label="Default select example"
                    >
                      {medium.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <Taluka />
                <div className="col-md-6 custom-dropdown">
                  <div className="form-group text-start">
                    <label className="fw-bold mb-2">Awards</label>
                    <select
                      className="form-control"
                      id="formAwardDescription"
                      multiple
                      value={awardDescription}
                      onChange={handleAwardChange}
                      required
                    >
                      <option value="Distric Council Award">Warning</option>
                      <option value="Division Council Award">Suspension</option>
                      <option value="Maharashtra State Government Award">
                        Termination
                      </option>
                      <option value="Others">Others</option>
                    </select>
                    {showOtherAwardField && (
                      <div className="mb-3">
                        <label htmlFor="formOtherReason" className="form-label">
                          Please specify
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="formOtherReason"
                          value={otherAwardReason}
                          onChange={(e) => setOtherAwardReason(e.target.value)}
                          placeholder="Enter the reason"
                          required
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6 custom-dropdown">
                  <div className="form-group text-start">
                    <label className="fw-bold mb-2">Punishments</label>
                    <select
                      className="form-control"
                      id="formAwardDescription"
                      multiple
                      value={punishmentDescription}
                      onChange={handlePunishmentChange}
                      required
                    >
                      <option value="Warning">Warning Letter</option>
                      <option value="Suspension">Suspension</option>
                      <option value="1 Increment Stop">1Increment Stop</option>
                      <option value="2 Increment Stopn">
                        2 Increment Stop
                      </option>
                      <option value="3 Increment Stop">3 Increment Stop</option>
                      <option value="Termination">Termination</option>
                      <option value="Increment stop for all time">
                        Increment stop for all time
                      </option>
                      <option value="Others">Others</option>
                    </select>
                    {showOtherPunishmentField && (
                      <div className="mb-3">
                        <label htmlFor="formOtherReason" className="form-label">
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
                          required
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
          <div className="card mb-5">
            <div className="card-header color1 text-white fw-bold">
              Academic Qualifications
            </div>
            <div className="card-body">
              <AcadQual />
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="card mb-5">
            <div className="card-header color1 text-white fw-bold">
              Main Qualification
            </div>
            <div className="card-body">
              <MainQual />
            </div>
          </div>
        )}

        <div className="d-flex justify-content-center mb-5">
          {currentStep > 1 && (
            <button
              type="button"
              className="btn btn-secondary mb-5 m-2"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Previous
            </button>
          )}
          {currentStep < 4 ? (
            <button
              type="button"
              className="btn btn-primary mb-5 m-2"
              onClick={handleNextStep}
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
  );
};

export default AddNewTeacher;
