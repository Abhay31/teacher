import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../../assets/img/amravati.jpg";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        username,
        email,
        mobile,
        password,
      });

      if (response.status === 200) {
        navigate("/login");
      } else {
        console.log("Registration failed");
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <div className="container-fluid register-container">
      <div className="register-image d-none d-md-flex">
        <div className="register-update">
          <img src={img1} alt="Register Visual" />
        </div>
      </div>
      <div
        className="register-form"
        style={{ boxShadow: "15px 0 rgba(118, 130, 126,0.7)" }}
      >
        <div className="register-logo mb-4">
          <h2
            style={{
              textAlign: "center",
              fontFamily: "Franklin Gothic Medium",
              fontSize: "45px",
              fontWeight: "500",
              color: "rgb(104,62,120)",
              textShadow: "1px 1px 2px rgb(91, 147, 231)",
            }}
          >
            Register User
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <input
              type="text"
              className="form-control rounded-3"
              style={{ border: "1px solid #808080" }}
              placeholder="Create Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mb-4">
            <input
              type="email"
              className="form-control rounded-3"
              style={{ border: "1px solid #808080" }}
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mb-4">
            <input
              type="tel"
              className="form-control rounded-3"
              style={{ border: "1px solid #808080" }}
              placeholder="Enter Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <div className="form-group mb-4">
            <input
              type="password"
              className="form-control rounded-3"
              style={{ border: "1px solid #808080" }}
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-center mt-5 w-100">
            <button
              type="submit"
              className="btn rounded-3 w-100 btn-success text-center"
              style={{ fontSize: "18px" }}
            >
              Register
            </button>
          </div>
        </form>
        <p className="text-center mt-3" style={{ fontSize: "18px" }}>
          Already a User? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
