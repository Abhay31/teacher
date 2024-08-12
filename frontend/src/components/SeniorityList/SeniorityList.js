
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SeniorityList.css";
import { IoMdSearch, IoMdAddCircleOutline } from "react-icons/io";

const data = [
  {
    id: 1,
    name: "Airi Satou",
    pran: "Accountant",
    fatherName: "Tokyo",
    motherName: "33",
    dob: "11/28/2008",
    gender: "Female",
  },
  {
    id: 2,
    name: "Angelica Ramos",
    pran: "Chief Executive Officer (CEO)",
    fatherName: "London",
    motherName: "47",
    dob: "10/9/2009",
    gender: "Female",
  },
  {
    id: 3,
    name: "Ashton Cox",
    pran: "Junior Technical Author",
    fatherName: "San Francisco",
    motherName: "66",
    dob: "1/12/2009",
    gender: "Male",
  },
  {
    id: 4,
    name: "Bradley Greer",
    pran: "Software Engineer",
    fatherName: "London",
    motherName: "41",
    dob: "10/13/2012",
    gender: "Male",
  },
  {
    id: 5,
    name: "Brenden Wagner",
    pran: "Software Engineer",
    fatherName: "San Francisco",
    motherName: "28",
    dob: "6/7/2011",
    gender: "Male",
  },
  {
    id: 6,
    name: "Brielle Williamson",
    pran: "Integration Specialist",
    fatherName: "New York",
    motherName: "61",
    dob: "12/2/2012",
    gender: "Female",
  },
  {
    id: 7,
    name: "Bruno Nash",
    pran: "Software Engineer",
    fatherName: "London",
    motherName: "38",
    dob: "5/3/2011",
    gender: "Male",
  },
  {
    id: 8,
    name: "Caesar Vance",
    pran: "Pre-Sales Support",
    fatherName: "New York",
    motherName: "21",
    dob: "12/12/2011",
    gender: "Male",
  },
  {
    id: 9,
    name: "Cara Stevens",
    pran: "Sales Assistant",
    fatherName: "New York",
    motherName: "46",
    dob: "12/6/2011",
    gender: "Female",
  },
  {
    id: 10,
    name: "Cedric Kelly",
    pran: "Senior Javascript Developer",
    fatherName: "Edinburgh",
    motherName: "22",
    dob: "3/29/2012",
    gender: "Male",
  },
  {
    id: 11,
    name: "Abhishek Sharma",
    pran: "12345678",
    fatherName: "Arun",
    motherName: "Sunita",
    dob: "31/01/2002",
    gender: "Male",
  },
  {
    id: 12,
    name: "Abhishek Sharma",
    pran: "12345678",
    fatherName: "Arun",
    motherName: "Sunita",
    dob: "31/01/2002",
    gender: "Male",
  },
  // Add more entries as needed...
];

const SeniorityList = () => {
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

  const filteredData = data.filter(
    (row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.pran.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.fatherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.motherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.dob.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.gender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h2 className="text-start seniorityheading">Seniority List</h2>
        <Link to="/seniority/addseniority">
          <button className="btn btn-outline-primary fw-bold border-2">
            Add Seniority <IoMdAddCircleOutline size={20} />
          </button>
        </Link>
      </div>
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
              Employee Name
            </th>
            <th scope="col" className="text-center">
              PRAN / PF NO
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
          {currentRows.map((row) => (
            <tr key={row.id}>
              <th scope="row" className="text-center">
                {row.id}
              </th>
              <td className="text-center">{row.name}</td>
              <td className="text-center">{row.pran}</td>
              <td className="text-center">{row.fatherName}</td>
              <td className="text-center">{row.motherName}</td>
              <td className="text-center">{row.dob}</td>
              <td className="text-center">{row.gender}</td>
              <td className="text-center">
                <button className="btn btn-secondary btn-sm">
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
            {Array.from(
              { length: Math.ceil(filteredData.length / rowsPerPage) },
              (_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              )
            )}
            <li
              className={`page-item ${
                currentPage === Math.ceil(filteredData.length / rowsPerPage)
                  ? "disabled"
                  : ""
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

export default SeniorityList;
