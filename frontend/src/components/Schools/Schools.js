import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Schools.css";
import axios from "axios";
import { IoMdAddCircleOutline, IoMdSearch } from "react-icons/io";

const School = () => {
  const [schools, setSchools] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Hook to programmatically navigate

  const fetchSchools = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/school");
      setSchools(response.data);
    } catch (error) {
      console.error("Error fetching schools data", error);
      setError("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchSchools();
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

  const filteredData = schools.filter(
    (row) =>
      row.school_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.classes.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.taluka.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.talukaName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.pincode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.udise_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.address.toLowerCase().includes(searchTerm.toLowerCase())
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
  const paginationRange = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h2 className="text-start schoolheading">School Details</h2>
        <Link to="/school/addschool">
          <button className="btn btn-outline-primary fw-bold border-2">
            Add School <IoMdAddCircleOutline size={20} />
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
              School Name
            </th>
            <th scope="col" className="text-center">
              Classes
            </th>
            <th scope="col" className="text-center">
              District
            </th>
            <th scope="col" className="text-center">
              Taluka Code
            </th>
            <th scope="col" className="text-center">
              Taluka Name
            </th>
            <th scope="col" className="text-center">
              Pincode
            </th>
            <th scope="col" className="text-center">
              UDISE Code
            </th>
            <th scope="col" className="text-center">
              Address
            </th>
            <th scope="col" className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, index) => (
            <tr key={row.id}>
              <th scope="row" className="text-center">
                {(currentPage - 1) * rowsPerPage + index + 1}
              </th>
              <td className="text-center">{row.school_name}</td>
              <td className="text-center">{row.classes}</td>
              <td className="text-center">{row.district}</td>
              <td className="text-center">{row.taluka}</td>
              <td className="text-center">{row.talukaName}</td>
              <td className="text-center">{row.pincode}</td>
              <td className="text-center">{row.udise_no}</td>
              <td className="text-center">{row.address}</td>
              <td className="text-center">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => navigate(`/school/update/${row.id}`)}
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

export default School;
