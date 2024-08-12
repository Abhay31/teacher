import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UpdateSchool.css";

const UpdateSchool = () => {
  const { id } = useParams();
  const classRanges = [
    "Nursery to KG", "Nursery to I", "Nursery to II", "Nursery to III", "Nursery to IV", "Nursery to V", "Nursery to VI", "Nursery to VII", "Nursery to VIII", "Nursery to IX", "Nursery to X", "Nursery to XI", "Nursery to XII",
    "KG to I", "KG to II", "KG to III", "KG to IV", "KG to V", "KG to VI", "KG to VII", "KG to VIII", "KG to IX", "KG to X", "KG to XI", "KG to XII",
    "I to II", "I to III", "I to IV", "I to V", "I to VI", "I to VII", "I to VIII", "I to IX", "I to X", "I to XI", "I to XII",
    "II to III", "II to IV", "II to V", "II to VI", "II to VII", "II to VIII", "II to IX", "II to X", "II to XI", "II to XII",
    "III to IV", "III to V", "III to VI", "III to VII", "III to VIII", "III to IX", "III to X", "III to XI", "III to XII",
    "IV to V", "IV to VI", "IV to VII", "IV to VIII", "IV to IX", "IV to X", "IV to XI", "IV to XII",
    "V to VI", "V to VII", "V to VIII", "V to IX", "V to X", "V to XI", "V to XII",
    "VI to VII", "VI to VIII", "VI to IX", "VI to X", "VI to XI", "VI to XII",
    "VII to VIII", "VII to IX", "VII to X", "VII to XI", "VII to XII",
    "VIII to IX", "VIII to X", "VIII to XI", "VIII to XII",
    "IX to X", "IX to XI", "IX to XII",
    "X to XI", "X to XII",
    "XI to XII"
  ];

  const navigate = useNavigate();
  const [school_name, setSchoolName] = useState("");
  const [classes, setClasses] = useState("");
  const [district, setDistrict] = useState("");
  const [taluka, setTaluka] = useState("");
  const [talukaName, setTalukaName] = useState("");
  const [pincode, setPincode] = useState("");
  const [udise_no, setUdise] = useState("");
  const [address, setAddress] = useState("");

  const [lastError, setLastError] = useState("");

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/school/${id}`);
        const school = response.data;

        setSchoolName(school.school_name);
        setClasses(school.classes);
        setDistrict(school.district);
        setTaluka(school.taluka);
        setTalukaName(school.talukaName);
        setPincode(school.pincode);
        setUdise(school.udise_no);
        setAddress(school.address);
      } catch (error) {
        console.error("Error fetching school data:", error);
      }
    };
    fetchSchool();
  }, [id]);

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
    if (!school_name) {
      showError("School Name is required.");
      return false;
    }
    if (!classes) {
      showError("Classes are required.");
      return false;
    }
    if (!district) {
      showError("District is required.");
      return false;
    }
    if (!taluka) {
      showError("Taluka Code is required.");
      return false;
    }
    if (!talukaName) {
      showError("Taluka Name is required.");
      return false;
    }
    if (!pincode) {
      showError("Pincode is required.");
      return false;
    }
    if (!udise_no) {
      showError("Udise Code is required.");
      return false;
    }
    if (!address) {
      showError("School Address is required.");
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
      const response = await axios.put(`http://localhost:5000/api/school/${id}`, {
        school_name,
        classes,
        district,
        taluka,
        talukaName,
        pincode,
        udise_no,
        address,
      });

      if (response.status === 200) {
        toast.success("School updated successfully", {
          onClose: () => navigate("/school")
        });
      } else {
        showError("Updating School failed");
      }
    } catch (error) {
      showError("Error updating school");
      console.error("Error updating School:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="d-flex justify-content-between align-items-center mb-2 mt-5">
        <Link to="/school" className="btn btn-link mx-3 ">
          <FaArrowLeft size={26} style={{ color: "rgb(0, 37, 92)" }} />
        </Link>
        <div className="flex-grow-1 text-center">
          <h2 className="UpdateSchool">Update School</h2>
        </div>
      </div>
      <div className="container">
        <div className="rounded-3 box" style={{ backgroundColor: "#F2F0EC", boxShadow: "0 4px 8px  rgba(91, 91, 91, 0.3)" }}>
          <form onSubmit={handleSubmit} style={{ backgroundColor: "#F2F0EC", padding: "25px" }}>
            <div className="mb-3">
              <label htmlFor="formSchoolName" className="form-label fw-bold mb-2">School Name</label>
              <input type="text" className="form-control" id="formSchoolName" value={school_name} onChange={handleInputChange(setSchoolName, /^[A-Za-z0-9\s-]*$/, 50)} placeholder="Enter School Name" required />
            </div>
            <div className="mb-3">
              <label htmlFor="formClasses" className="form-label fw-bold mb-2">Classes</label>
              <select className="form-control" id="formClasses" value={classes} onChange={(e) => setClasses(e.target.value)} required>
                <option value="" disabled>Select Classes</option>
                {classRanges.map((range, index) => (
                  <option key={index} value={range}>{range}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="formDistrict" className="form-label fw-bold mb-2">District</label>
              <input type="text" className="form-control" id="formDistrict" value={district} onChange={handleInputChange(setDistrict, /^[A-Za-z.\s]*$/, 25)} placeholder="Enter District" required />
            </div>
            <div className="mb-3">
              <label htmlFor="formTaluka" className="form-label fw-bold mb-2">Taluka Code</label>
              <input type="text" className="form-control" id="formTaluka" value={taluka} onChange={handleInputChange(setTaluka, /^[A-Za-z0-9]*$/, 10)} placeholder="Enter Taluka Code" required />
            </div>
            <div className="mb-3">
              <label htmlFor="formTalukaName" className="form-label fw-bold mb-2">Taluka Name</label>
              <input type="text" className="form-control" id="formTalukaName" value={talukaName} onChange={handleInputChange(setTalukaName, /^[A-Za-z.\s]*$/, 15)} placeholder="Enter Taluka Name" required />
            </div>
            <div className="mb-3">
              <label htmlFor="formPincode" className="form-label fw-bold mb-2">Pincode</label>
              <input type="text" className="form-control" id="formPincode" value={pincode} onChange={handleInputChange(setPincode, /^[0-9]*$/, 6)} placeholder="Enter Pincode" required />
            </div>
            <div className="mb-3">
              <label htmlFor="formUdise" className="form-label fw-bold mb-2">UDISE Code</label>
              <input type="text" className="form-control" id="formUdise" value={udise_no} onChange={handleInputChange(setUdise, /^[0-9]*$/, 11)} placeholder="Enter UDISE Code" required />
            </div>
            <div className="mb-3">
              <label htmlFor="formAddress" className="form-label fw-bold mb-2">School Address</label>
              <textarea className="form-control" id="formAddress" value={address} onChange={handleInputChange(setAddress, /^[A-Za-z0-9\s.,-]*$/, 50)} placeholder="Enter School Address" required></textarea>
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary mt-4">Update School</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateSchool;
