// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./Teacher.css";
// import axios from "axios";
// import { IoMdAddCircleOutline, IoMdSearch } from "react-icons/io";

// const Teacher = () => {
//   const [teachers, setTeachers] = useState([]);
//   const [error, setError] = useState("");

//   const fetchTeachers = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/teacher");
//       setTeachers(response.data);
//     } catch (error) {
//       console.error("Error fetching teacher data", error);
//       setError("An error occurred. Please try again.");
//     }
//   };

//   useEffect(() => {
//     fetchTeachers();
//   }, []);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState("");

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(Number(event.target.value));
//     setCurrentPage(1);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setCurrentPage(1);
//   };

//   const formatDate = (isoString) => {
//     const date = new Date(isoString);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${day}/${month}/${year}`;
//   };

//   const filteredData = teachers.filter(
//     (row) =>
//       row.pranno.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       row.empname.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       row.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       row.mname.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       row.dob.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       row.gender.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [currentPage]);

//   const totalPages = Math.ceil(filteredData.length / rowsPerPage);
//   const maxPageNumbersToShow = 3;
//   const startPage = Math.max(1, currentPage - 1);
//   const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);
//   const paginationRange = Array.from(
//     { length: endPage - startPage + 1 },
//     (_, i) => startPage + i
//   );

//   return (
//     <div className="container mt-5">
//       <div className="d-flex justify-content-between align-items-center mb-5">
//         <h2 className="text-start schoolheading">Teacher Details</h2>
//         <Link to="/teacher/addteacher">
//           <button className="btn btn-outline-primary fw-bold border-2">
//             Add Teacher <IoMdAddCircleOutline size={20} />
//           </button>
//         </Link>
//       </div>
//       {error && <div className="alert alert-danger">{error}</div>}
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <div>
//           <label className="me-2">Show </label>
//           <select
//             value={rowsPerPage}
//             onChange={handleRowsPerPageChange}
//             className="form-select"
//             style={{
//               width: "auto",
//               display: "inline-block",
//               outline: "none",
//               boxShadow: "none",
//               borderColor: "blue",
//             }}
//           >
//             <option value={5}>5</option>
//             <option value={10}>10</option>
//             <option value={20}>20</option>
//           </select>
//           <label className="ms-2"> entries</label>
//         </div>
//         <div className="input-group w-25 search">
//           <input
//             type="text"
//             className="form-control rounded-start-4"
//             placeholder="Search"
//             value={searchTerm}
//             onChange={handleSearchChange}
//           />
//           <span className="input-group-text">
//             <IoMdSearch />
//           </span>
//         </div>
//       </div>
//       <table className="table mt-5 table-hover table-bordered custom-table">
//         <thead>
//           <tr>
//             <th scope="col" className="text-center">
//               Sr. No.
//             </th>
//             <th scope="col" className="text-center">
//               PRAN / PF NO
//             </th>
//             <th scope="col" className="text-center">
//               Employee Name
//             </th>
//             <th scope="col" className="text-center">
//               Father Name
//             </th>
//             <th scope="col" className="text-center">
//               Mother Name
//             </th>
//             <th scope="col" className="text-center">
//               Date of Birth
//             </th>
//             <th scope="col" className="text-center">
//               Gender
//             </th>
//             <th scope="col" className="text-center">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentRows.map((row, index) => (
//             <tr key={row.id}>
//               <Link to={`/teacher/${row.pranno}`}>
//                 <th scope="row" className="text-center">
//                   {(currentPage - 1) * rowsPerPage + index + 1}
//                 </th>
//                 </Link>
//                 <td className="text-center">{row.pranno}</td>
//                 <td className="text-center">{row.empname}</td>
//                 <td className="text-center">{row.fname}</td>
//                 <td className="text-center">{row.mname}</td>
//                 <td className="text-center">{formatDate(row.dob)}</td>
//                 <td className="text-center">{row.gender}</td>
//                 <td className="text-center">
//                   <button className="btn btn-secondary btn-sm">
//                     <i className="fas fa-edit"></i>
//                   </button>
//                 </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="d-flex mt-5 justify-content-between align-items-center">
//         <div>
//           Showing {indexOfFirstRow + 1} to{" "}
//           {Math.min(indexOfLastRow, filteredData.length)} of{" "}
//           {filteredData.length} entries
//         </div>
//         <nav>
//           <ul className="pagination">
//             <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
//               <button
//                 className="page-link"
//                 onClick={() => handlePageChange(currentPage - 1)}
//               >
//                 «
//               </button>
//             </li>
//             {paginationRange.map((pageNumber) => (
//               <li
//                 key={pageNumber}
//                 className={`page-item ${
//                   currentPage === pageNumber ? "active" : ""
//                 }`}
//               >
//                 <button
//                   className="page-link"
//                   onClick={() => handlePageChange(pageNumber)}
//                 >
//                   {pageNumber}
//                 </button>
//               </li>
//             ))}
//             <li
//               className={`page-item ${
//                 currentPage === totalPages ? "disabled" : ""
//               }`}
//             >
//               <button
//                 className="page-link"
//                 onClick={() => handlePageChange(currentPage + 1)}
//               >
//                 »
//               </button>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default Teacher;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Teacher.css";
import axios from "axios";
import { IoMdAddCircleOutline, IoMdSearch } from "react-icons/io";

const Teacher = () => {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState("");

  const fetchTeachers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/teacher");
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teacher data", error);
      setError("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
  };

  const filteredData = teachers.filter(
    (row) =>
      row.pranno.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.empname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.fname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.mname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.dob.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.gender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const maxPageNumbersToShow = 3;
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);
  const paginationRange = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const handleEditClick = (pranno) => {
    navigate(`/teacher/update/${pranno}`); 
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h2 className="text-start schoolheading">Teacher Details</h2>
        <Link to="/teacher/addteacher">
          <button className="btn btn-outline-primary fw-bold border-2">
            Add Teacher <IoMdAddCircleOutline size={20} />
          </button>
        </Link>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <label className="me-2">Show </label>
          <select
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="form-select"
            style={{
              width: "auto",
              display: "inline-block",
              outline: "none",
              boxShadow: "none",
              borderColor: "blue",
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <label className="ms-2"> entries</label>
        </div>
        <div className="input-group w-25 search">
          <input
            type="text"
            className="form-control rounded-start-4"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <span className="input-group-text">
            <IoMdSearch />
          </span>
        </div>
      </div>
      <table className="table mt-5 table-hover table-bordered custom-table">
        <thead>
          <tr>
            <th scope="col" className="text-center">
              Sr. No.
            </th>
            <th scope="col" className="text-center">
              PRAN / PF NO
            </th>
            <th scope="col" className="text-center">
              Employee Name
            </th>
            <th scope="col" className="text-center">
              Father Name
            </th>
            <th scope="col" className="text-center">
              Mother Name
            </th>
            <th scope="col" className="text-center">
              Date of Birth
            </th>
            <th scope="col" className="text-center">
              Gender
            </th>
            <th scope="col" className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, index) => (
            <tr key={row.id} className="row-link">
              <th scope="row" className="text-center">
                <Link to={`/teacher/${row.pranno}`}>
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </Link>
              </th>
              <td className="text-center">
                <Link to={`/teacher/${row.pranno}`}>{row.pranno}</Link>
              </td>
              <td className="text-center fw-bold">
                <Link to={`/teacher/${row.pranno}`}>{row.empname}</Link>
              </td>
              <td className="text-center">
                <Link to={`/teacher/${row.pranno}`}>{row.fname}</Link>
              </td>
              <td className="text-center">
                <Link to={`/teacher/${row.pranno}`}>{row.mname}</Link>
              </td>
              <td className="text-center">
                <Link to={`/teacher/${row.pranno}`}>{formatDate(row.dob)}</Link>
              </td>
              <td className="text-center">
                <Link to={`/teacher/${row.pranno}`}>{row.gender}</Link>
              </td>
              <td className="text-center">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleEditClick(row.pranno)} // Call handleEditClick
                >
                  <i className="fas fa-edit"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="d-flex mt-5 justify-content-between align-items-center">
        <div>
          Showing {indexOfFirstRow + 1} to{" "}
          {Math.min(indexOfLastRow, filteredData.length)} of{" "}
          {filteredData.length} entries
        </div>
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                «
              </button>
            </li>
            {paginationRange.map((pageNumber) => (
              <li
                key={pageNumber}
                className={`page-item ${
                  currentPage === pageNumber ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                »
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Teacher;
