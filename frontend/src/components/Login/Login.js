import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import img1 from "../../assets/img/amravati.jpg";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.get("http://localhost:5000/api/signup");
      const users = response.data;
      console.log(users);
      const user = users.find(
        (user) =>
          (user.username === username ||
            user.email === username ||
            user.mobile === username) &&
          user.password === password
      );
      console.log(user);

      if (user) {
        console.log("Login successful!");
        setUser(user);
        navigate("/home");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Error fetching user data", error);
      setError("An error occurred. Please try again.");
    }
  };
  return (
    <div className="container-fluid login-container">
      <div className="login-image d-none d-md-flex">
        <div className="login-update">
          <img src={img1} alt="Login Visual" />
        </div>
      </div>
      <div
        className="login-form"
        style={{ boxShadow: "15px 0 rgba(118, 130, 126,0.7)" }}
      >
        <h6
          className="text-center text-gray fs-5"
          style={{ fontFamily: "cursive", fontWeight: "bold" }}
        >
          Welcome Back
        </h6>
        <div className="login-logo mb-3">
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
            User Login
          </h2>
        </div>
        <form onSubmit={handleLogin}>
          <div className="form-group mb-4">
            <label className="mb-2" style={{ fontSize: "17px" }}>
              Username:
            </label>
            <input
              type="text"
              className="form-control rounded-3"
              style={{ border: "1px solid #808080" }}
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mb-4">
            <label className="mb-2" style={{ fontSize: "17px" }}>
              Password:
            </label>
            <input
              type="password"
              className="form-control rounded-3"
              style={{ border: "1px solid #808080" }}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-check text-end">
            <Link
              to="/"
              className="text-decoration-none"
              style={{ fontSize: "17px" }}
            >
              Forgot password?
            </Link>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="text-center mt-5 w-100">
            <button
              type="submit"
              className="btn rounded-3 w-100 btn-primary text-center"
              style={{ fontSize: "17px" }}
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-center mt-3" style={{ fontSize: "18px" }}>
          Don't have an account yet? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
