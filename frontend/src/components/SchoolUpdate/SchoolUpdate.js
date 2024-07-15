import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import './SchoolUpdate.css'


const PostUpdate = () => {
  const navigate = useNavigate();
  const [schoolname, setSchoolName] = useState("");
  const [type, setType] = useState("");
  const [classes, setClasses] = useState("");
  const [board, setBoard] = useState("");
  const [udise, setUdise] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/school", {
        schoolname,
        type,
        classes,
        board,
        udise,
        address,
      });

      if (response.status === 200) {
        navigate("/school");
      } else {
        console.log("Adding School failed");
      }
    } catch (error) {
      console.error("Error School:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <Link to="/school" className="btn btn-link">
          <FaArrowLeft size={25} />
        </Link>
        <h2 className="text-primary-emphasis text-start fw-bold">Add School</h2>
      </div>
      <div className="bg-white p-4 rounded-4 box border1">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="formSchoolName" className="form-label">
              School Name
            </label>
            <input
              type="text"
              className="form-control"
              id="formSchoolName"
              value={schoolname}
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder="Enter School Name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formType" className="form-label">
              School Type
            </label>
            <input
              type="text"
              className="form-control"
              id="formType"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Enter School Type"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formClasses" className="form-label">
              Classes
            </label>
            <input
              type="text"
              className="form-control"
              id="formClasses"
              value={classes}
              onChange={(e) => setClasses(e.target.value)}
              placeholder="Enter Classes"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formBoard" className="form-label">
              School Board
            </label>
            <input
              type="text"
              className="form-control"
              id="formBoard"
              value={board}
              onChange={(e) => setBoard(e.target.value)}
              placeholder="Enter School Board"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formUdise" className="form-label">
              School Udise Code
            </label>
            <input
              type="text"
              className="form-control"
              id="formUdise"
              value={udise}
              onChange={(e) => setUdise(e.target.value)}
              placeholder="Enter Udise Code"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="formAddress" className="form-label">
              School Address
            </label>
            <input
              type="text"
              className="form-control"
              id="formAddress"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter School Address"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostUpdate;
