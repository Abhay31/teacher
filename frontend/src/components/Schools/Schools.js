// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./Schools.css";
// import { IoMdAddCircleOutline } from "react-icons/io";
// import axios from "axios";

// const School = () => {
//   const [schools, setSchools] = useState([]);
//   const [error, setError] = useState("");

//   const fetchSchool = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/school");
//       setSchools(response.data);
//     } catch (error) {
//       console.error("Error fetching schools data", error);
//       setError("An error occurred. Please try again.");
//     }
//   };

//   useEffect(() => {
//     fetchSchool();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/school/${id}`);
//       fetchSchool(); // Refresh schools data after deletion
//     } catch (error) {
//       console.error("Error deleting school", error);
//       setError("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="d-flex justify-content-between align-items-center mb-5">
//         <h2 className="text-primary-emphasis text-start fw-bold">
//           School Details
//         </h2>
//         <Link to="/school/addschool">
//           <button className="btn btn-primary">
//             Add School <IoMdAddCircleOutline size={20} />
//           </button>
//         </Link>
//       </div>
//       {error && <div className="alert alert-danger">{error}</div>}
//       <div>
//         <table className="table table-hover table-bordered custom-table">
//           <thead>
//             <tr>
//               <th scope="col" className="text-center" style={{ width: "5%" }}>
//                 Sr. No
//               </th>
//               <th scope="col" className="text-center" style={{ width: "12%" }}>
//                 School Name
//               </th>
//               <th scope="col" className="text-center" style={{ width: "12%" }}>
//                 Type
//               </th>
//               <th scope="col" className="text-center" style={{ width: "20%" }}>
//                 Classes
//               </th>
//               <th scope="col" className="text-center" style={{ width: "8%" }}>
//                 Board
//               </th>
//               <th scope="col" className="text-center" style={{ width: "8%" }}>
//                 UDISE Code
//               </th>
//               <th scope="col" className="text-center" style={{ width: "20%" }}>
//                 Address
//               </th>
//               <th scope="col" className="text-center" style={{ width: "10%" }}>
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {schools.map((school, index) => (
//               <tr key={school.id}>
//                 <th className="text-center" scope="row">{index + 1}</th>
//                 <td className="text-center">{school.schoolname}</td>
//                 <td className="text-center">{school.type}</td>
//                 <td className="text-center">{school.classes}</td>
//                 <td className="text-center">{school.board}</td>
//                 <td className="text-center">{school.udise}</td>
//                 <td className="text-center">{school.address}</td>
//                 <td className="text-center">
//                   <Link to={`/school/updateschool/${school.id}`}>
//                     <button className="btn btn-warning btn-sm m-2">
//                     <i className="fas fa-edit"></i>
//                     </button>
//                   </Link>
//                   {/* <button
//                     className="btn btn-danger btn-sm m-2"
//                     onClick={() => handleDelete(school.id)}
//                   >
//                     <i className="fas fa-trash-alt"></i>
//                   </button> */}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default School;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Schools.css";
import { IoMdAddCircleOutline, IoMdCloseCircle } from "react-icons/io";
import axios from "axios";

const School = () => {
  const [schools, setSchools] = useState([]);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useState({
    schoolname: "",
    type: "",
    board: "",
    udise: ""
  });

  const fetchSchools = async (params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      const response = await axios.get(`http://localhost:5000/api/school?${query}`);
      setSchools(response.data);
    } catch (error) {
      console.error("Error fetching schools data", error);
      setError("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchSchools(searchParams);
  }, [searchParams]);

  const handleSearchChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value
    });
  };

  const clearSearch = (field) => {
    setSearchParams({
      ...searchParams,
      [field]: ""
    });
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h2 className="text-primary-emphasis text-start fw-bold">
          School Details
        </h2>
        <Link to="/school/addschool">
          <button className="btn btn-primary">
            Add School <IoMdAddCircleOutline size={20} />
          </button>
        </Link>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-4 search-filter-row">
        <div className="search-bar-container flex-grow-1">
          <input
            type="text"
            name="schoolname"
            placeholder="Search by School Name"
            value={searchParams.schoolname}
            onChange={handleSearchChange}
            className="form-control"
          />
          {searchParams.schoolname && (
            <IoMdCloseCircle
              className="cancel-icon"
              size={24}
              onClick={() => clearSearch("schoolname")}
            />
          )}
        </div>
        <div className="form-group mx-2">
          <div className="select-container">
            <select name="type" value={searchParams.type} onChange={handleSearchChange} className="form-control">
              <option value="">Type</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
            {searchParams.type && (
              <IoMdCloseCircle
                className="cancel-icon"
                size={24}
                onClick={() => clearSearch("type")}
              />
            )}
          </div>
        </div>
        <div className="form-group mx-2">
          <div className="select-container">
            <select name="board" value={searchParams.board} onChange={handleSearchChange} className="form-control">
              <option value="">Board</option>
              <option value="CBSE">CBSE</option>
              <option value="ICSE">ICSE</option>
              <option value="State Board">State Board</option>
            </select>
            {searchParams.board && (
              <IoMdCloseCircle
                className="cancel-icon"
                size={24}
                onClick={() => clearSearch("board")}
              />
            )}
          </div>
        </div>
        <div className="form-group mx-2">
          <div className="input-container">
            <input
              type="text"
              name="udise"
              placeholder="UDISE Code"
              value={searchParams.udise}
              onChange={handleSearchChange}
              className="form-control"
            />
            {searchParams.udise && (
              <IoMdCloseCircle
                className="cancel-icon"
                size={24}
                onClick={() => clearSearch("udise")}
              />
            )}
          </div>
        </div>
      </div>
      <div>
        <table className="table table-hover mt-5 table-bordered custom-table">
          <thead>
            <tr>
              <th scope="col" className="text-center" style={{ width: "5%" }}>Sr. No</th>
              <th scope="col" className="text-center" style={{ width: "12%" }}>School Name</th>
              <th scope="col" className="text-center" style={{ width: "12%" }}>Type</th>
              <th scope="col" className="text-center" style={{ width: "20%" }}>Classes</th>
              <th scope="col" className="text-center" style={{ width: "8%" }}>Board</th>
              <th scope="col" className="text-center" style={{ width: "8%" }}>UDISE Code</th>
              <th scope="col" className="text-center" style={{ width: "20%" }}>Address</th>
              <th scope="col" className="text-center" style={{ width: "10%" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {schools.map((school, index) => (
              <tr key={school.id}>
                <th className="text-center" scope="row">{index + 1}</th>
                <td className="text-center">{school.schoolname}</td>
                <td className="text-center">{school.type}</td>
                <td className="text-center">{school.classes}</td>
                <td className="text-center">{school.board}</td>
                <td className="text-center">{school.udise}</td>
                <td className="text-center">{school.address}</td>
                <td className="text-center">
                  <Link to={`/school/updateschool/${school.id}`}>
                    <button className="btn btn-warning btn-sm m-2">
                      <i className="fas fa-edit"></i>
                    </button>
                  </Link>
                  {/* <button
                    className="btn btn-danger btn-sm m-2"
                    onClick={() => handleDelete(school.id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default School;

