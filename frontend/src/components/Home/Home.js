import React, { useState, useEffect } from "react";
import "./Home.css";
import { MdDateRange } from "react-icons/md";
import Piechart from "../PieChart/PieChart";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = ({ user }) => {
  const [schools, setSchools] = useState([]);
  const [error, setError] = useState("");
  const [schoolCount, setSchoolCount] = useState(0);

  const fetchSchool = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/school");
      setSchools(response.data);
      setSchoolCount(response.data.length);
    } catch (error) {
      console.error("Error fetching schools data", error);
      setError("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchSchool();
  }, []);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const currentDate = new Date().toLocaleDateString(undefined, options);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="container mt-3">
      <div className="row my-4 align-items-center p-3 rounded-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
        <div className="col-md-8 col-sm-12">
          <h1 className="welcome-message" style={{fontFamily: 'Georgia, serif', color: "#000325"}}>
            Welcome {capitalizeFirstLetter(user.name)} !
          </h1>
          <p className="system-status text-success">All systems are running smoothly...</p>
        </div>
        <div className="col-md-4 col-sm-12 text-md-end text-sm-start">
          <p className="current-date" style={{color: "#000325"}}>
            <MdDateRange className="m-2" size={23} />
            {currentDate}
          </p>
        </div>
      </div>
      <div className="row my-4">
        <div className="col-md-3 col-sm-6 mb-4">
          <div className="card card-custom-height rounded-4 back1 text-white border-0">
            <div className="card-body">
              <h5 className="card-title text-center">Total Teachers</h5>
              <p className="card-text text-center fw-bold fs-1 mt-3">
                <Link to="/teacher" className="text-decoration-none text-white">
                  <CountUp start={0} end={270} duration={3} />
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 mb-4">
          <div className="card card-custom-height rounded-4 back4 text-white border-0">
            <div className="card-body">
              <h5 className="card-title text-center">Total Schools</h5>
              <p className="card-text fw-bold fs-1 mt-3 text-center">
                <Link to="/school" className="text-decoration-none text-white">
                  <CountUp start={0} end={schoolCount} duration={3} />
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 mb-4">
          <div className="card card-custom-height rounded-4 back2 text-white border-0">
            <div className="card-body">
              <h5 className="card-title text-center">Total Talukas</h5>
              <p className="card-text fw-bold fs-1 mt-3 text-center">
                <Link to="/" className="text-decoration-none text-white">
                  <CountUp start={0} end={200} duration={3} />
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 mb-4">
          <div className="card card-custom-height rounded-4 back3 text-white border-0">
            <div className="card-body">
              <h5 className="card-title text-center">Seniority List</h5>
              <p className="card-text fw-bold fs-1 mt-3 text-center">
                <Link to="/" className="text-decoration-none text-white">
                  <CountUp start={0} end={250} duration={3} />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-4">
        <div className="col-md-8 col-sm-6 mb-4">
          <div className="card card-custom-height1 rounded-3 text-black">
            <div className="card-body">
              <h5 className="card-title fs-4 text-start">School Details</h5>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="table-responsive">
                <table className="table table-bordered table-hover custom-table mt-4">
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: "10%" }}>
                        Sr no.
                      </th>
                      <th scope="col" style={{ width: "20%" }}>
                        School Name
                      </th>
                      <th scope="col" style={{ width: "15%" }}>
                        School Type
                      </th>
                      <th scope="col" style={{ width: "15%" }}>
                        Classes
                      </th>
                      <th scope="col" style={{ width: "15%" }}>
                        School Board
                      </th>
                      <th scope="col" style={{ width: "20%" }}>
                        School Address
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {schools.slice(0,10).map((school, index) => (
                      <tr key={school.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{school.schoolname}</td>
                        <td>{school.type}</td>
                        <td>{school.classes}</td>
                        <td>{school.board}</td>
                        <td>{school.address}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colspan="7" className="text-center">
                        <Link to="/school">Show More</Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Piechart />
      </div>
    </div>
  );
};

export default Home;
