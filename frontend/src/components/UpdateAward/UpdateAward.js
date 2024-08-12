import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./UpdateAward.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateAward = () => {
  const { pranno } = useParams();
  const navigate = useNavigate();
  const awardOptions = [
    { value: "Distric Council Award", label: "Distric Council Award" },
    { value: "Division Council Award", label: "Division Council Award" },
    { value: "Maharashtra State Government Award", label: "Maharashtra State Government Award" },
    { value: "Others", label: "Others" },
  ];

  const [teacher, setTeacher] = useState({
    pranno: "",
    empname: "",
    awardDescription: "",
    otherAwardReason: "",
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

  const handleAwardChange = (e) => {
    const { value } = e.target;
    setTeacher((prevTeacher) => ({
      ...prevTeacher,
      awardDescription: value,
      otherAwardReason: value === "Others" ? "" : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/award/${pranno}`, teacher);
      toast.success("Award details updated successfully!");
      setTimeout(() => navigate("/award"), 3000); // Redirect after 3 seconds
    } catch (error) {
      console.error("Error updating award details", error);
      setError(
        "An error occurred while updating award details. Please try again."
      );
      toast.error("Error updating award details. Please try again.");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-2 mt-5">
        <Link to="/award" className="btn btn-link mx-3 ">
          <FaArrowLeft size={26} style={{ color: "rgb(0, 37, 92)" }} />
        </Link>
        <div className="flex-grow-1 text-center">
          <h2 className="UpdateAward">Update Award</h2>
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
            <div className="mb-3 form-group">
              <label
                htmlFor="awardDescription"
                className="form-label fw-bold mb-2"
              >
                Award Description
              </label>
              <select
                className="form-select rounded-1"
                id="awardDescription"
                name="awardDescription"
                value={teacher.awardDescription}
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
            {teacher.awardDescription === "Others" && (
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
                  value={teacher.otherAwardReason}
                  onChange={handleInputChange}
                />
              </div>
            )}
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary mt-4">
                Update Award
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default UpdateAward;
