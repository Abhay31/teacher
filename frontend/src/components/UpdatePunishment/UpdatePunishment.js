import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./UpdatePunishment.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdatePunishment = () => {
  const { pranno } = useParams();
  const navigate = useNavigate();
  const punishmentOptions = [
    { value: "Warning", label: "Warning Letter" },
    { value: "Suspension", label: "Suspension" },
    { value: "1 Increment Stop", label: "1 Increment Stop" },
    { value: "2 Increment Stop", label: "2 Increment Stop" },
    { value: "3 Increment Stop", label: "3 Increment Stop" },
    { value: "Termination", label: "Termination" },
    { value: "Increment stop for all time", label: "Increment stop for all time" },
    { value: "Others", label: "Others" },
  ];

  const [teacher, setTeacher] = useState({
    pranno: "",
    empname: "",
    punishmentDescription: "",
    otherPunishmentReason: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeacherDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/teacher/${pranno}`
        );
        setTeacher(response.data);
      } catch (error) {
        console.error("Error fetching teacher details", error);
        setError(
          "An error occurred while fetching teacher details. Please try again."
        );
      }
    };

    fetchTeacherDetails();
  }, [pranno]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeacher((prevTeacher) => ({
      ...prevTeacher,
      [name]: value,
    }));
  };

  const handlePunishmentChange = (e) => {
    const { value } = e.target;
    setTeacher((prevTeacher) => ({
      ...prevTeacher,
      punishmentDescription: value,
      otherPunishmentReason: value === "Others" ? "" : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/punishment/${pranno}`,
        teacher
      );
      toast.success("Punishment details updated successfully!");
      setTimeout(() => navigate("/punishment"), 3000); // Redirect after 3 seconds
    } catch (error) {
      console.error("Error updating punishment details", error);
      setError(
        "An error occurred while updating punishment details. Please try again."
      );
      toast.error("Error updating punishment details. Please try again.");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-2 mt-5">
        <Link to="/punishment" className="btn btn-link mx-3 ">
          <FaArrowLeft size={26} style={{ color: "rgb(0, 37, 92)" }} />
        </Link>
        <div className="flex-grow-1 text-center">
          <h2 className="UpdatePunishment">Update Punishment</h2>
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
            <div className="mb-3">
              <label htmlFor="pranno" className="form-label fw-bold mb-2">
                PRAN / PF NO
              </label>
              <input
                type="text"
                className="form-control"
                id="pranno"
                name="pranno"
                value={teacher.pranno}
                onChange={handleInputChange}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label htmlFor="empname" className="form-label fw-bold mb-2">
                Employee Name
              </label>
              <input
                type="text"
                className="form-control"
                id="empname"
                name="empname"
                value={teacher.empname}
                onChange={handleInputChange}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label htmlFor="gender" className="form-label fw-bold mb-2">
                Gender
              </label>
              <input
                type="text"
                className="form-control"
                id="gender"
                name="gender"
                value={teacher.gender}
                onChange={handleInputChange}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label htmlFor="schname" className="form-label fw-bold mb-2">
                School Name
              </label>
              <input
                type="text"
                className="form-control"
                id="schname"
                name="schname"
                value={teacher.schname}
                onChange={handleInputChange}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="punishmentDescription"
                className="form-label fw-bold mb-2"
              >
                Punishment Description
              </label>
              <select
                className="form-select rounded-1"
                id="punishmentDescription"
                name="punishmentDescription"
                value={teacher.punishmentDescription}
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
            {teacher.punishmentDescription === "Others" && (
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
                  value={teacher.otherPunishmentReason}
                  onChange={handleInputChange}
                />
              </div>
            )}
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary mt-4">
                Update Punishment
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default UpdatePunishment;
