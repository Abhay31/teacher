import React from "react";
import { Link } from "react-router-dom";
import "./Punishment.css";
import { IoMdAddCircleOutline } from "react-icons/io";

const Punishment = () => {
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h2 className="text-primary-emphasis text-start fw-bold">
          Punished Teachers
        </h2>
        <Link to="/punishment/addpunishment">
          <button className="btn btn-primary">
            Add Punishment <IoMdAddCircleOutline size={20} />
          </button>
        </Link>
      </div>
      <div>
      <table className="table table-hover table-bordered custom-table">
          <thead>
            <tr>
              <th scope="col" className="text-center">Employee ID</th>
              <th scope="col" className="text-center">Employee Name</th>
              <th scope="col" className="text-center">PRAN / PF NO</th>
              <th scope="col" className="text-center">Father Name</th>
              <th scope="col" className="text-center">Mother Name</th>
              <th scope="col" className="text-center">Date of Birth</th>
              <th scope="col" className="text-center">Gender</th>
              <th scope="col" className="text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" className="text-center">1</th>
              <td className="text-center">Abhishek Sharma</td>
              <td className="text-center">12345678</td>
              <td className="text-center">Arun</td>
              <td className="text-center">Sunita</td>
              <td className="text-center">31/01/2002</td>
              <td className="text-center">Male</td>
              <td className="text-center">
                <button className="btn btn-warning btn-sm">
                  <i className="fas fa-edit"></i>
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row" className="text-center">2</th>
              <td className="text-center">Abhishek Sharma</td>
              <td className="text-center">12345678</td>
              <td className="text-center">Arun</td>
              <td className="text-center">Sunita</td>
              <td className="text-center">31/01/2002</td>
              <td className="text-center">Male</td>
              <td className="text-center">
                <button className="btn btn-warning btn-sm">
                  <i className="fas fa-edit"></i>
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row" className="text-center">3</th>
              <td className="text-center">Abhishek Sharma</td>
              <td className="text-center">12345678</td>
              <td className="text-center">Arun</td>
              <td className="text-center">Sunita</td>
              <td className="text-center">31/01/2002</td>
              <td className="text-center">Male</td>
              <td className="text-center">
                <button className="btn btn-warning btn-sm">
                  <i className="fas fa-edit"></i>
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row" className="text-center">4</th>
              <td className="text-center">Abhishek Sharma</td>
              <td className="text-center">12345678</td>
              <td className="text-center">Arun</td>
              <td className="text-center">Sunita</td>
              <td className="text-center">31/01/2002</td>
              <td className="text-center">Male</td>
              <td className="text-center">
                <button className="btn btn-warning btn-sm">
                  <i className="fas fa-edit"></i>
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row" className="text-center">5</th>
              <td className="text-center">Abhishek Sharma</td>
              <td className="text-center">12345678</td>
              <td className="text-center">Arun</td>
              <td className="text-center">Sunita</td>
              <td className="text-center">31/01/2002</td>
              <td className="text-center">Male</td>
              <td className="text-center">
                <button className="btn btn-warning btn-sm">
                  <i className="fas fa-edit"></i>
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row" className="text-center">6</th>
              <td className="text-center">Abhishek Sharma</td>
              <td className="text-center">12345678</td>
              <td className="text-center">Arun</td>
              <td className="text-center">Sunita</td>
              <td className="text-center">31/01/2002</td>
              <td className="text-center">Male</td>
              <td className="text-center">
                <button className="btn btn-warning btn-sm">
                  <i className="fas fa-edit"></i>
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row" className="text-center">7</th>
              <td className="text-center">Abhishek Sharma</td>
              <td className="text-center">12345678</td>
              <td className="text-center">Arun</td>
              <td className="text-center">Sunita</td>
              <td className="text-center">31/01/2002</td>
              <td className="text-center">Male</td>
              <td className="text-center">
                <button className="btn btn-warning btn-sm">
                  <i className="fas fa-edit"></i>
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row" className="text-center">8</th>
              <td className="text-center">Abhishek Sharma</td>
              <td className="text-center">12345678</td>
              <td className="text-center">Arun</td>
              <td className="text-center">Sunita</td>
              <td className="text-center">31/01/2002</td>
              <td className="text-center">Male</td>
              <td className="text-center">
                <button className="btn btn-warning btn-sm">
                  <i className="fas fa-edit"></i>
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row" className="text-center">9</th>
              <td className="text-center">Abhishek Sharma</td>
              <td className="text-center">12345678</td>
              <td className="text-center">Arun</td>
              <td className="text-center">Sunita</td>
              <td className="text-center">31/01/2002</td>
              <td className="text-center">Male</td>
              <td className="text-center">
                <button className="btn btn-warning btn-sm">
                  <i className="fas fa-edit"></i>
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row" className="text-center">10</th>
              <td className="text-center">Abhishek Sharma</td>
              <td className="text-center">12345678</td>
              <td className="text-center">Arun</td>
              <td className="text-center">Sunita</td>
              <td className="text-center">31/01/2002</td>
              <td className="text-center">Male</td>
              <td className="text-center">
                <button className="btn btn-warning btn-sm">
                  <i className="fas fa-edit"></i>
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row" className="text-center">11</th>
              <td className="text-center">Abhishek Sharma</td>
              <td className="text-center">12345678</td>
              <td className="text-center">Arun</td>
              <td className="text-center">Sunita</td>
              <td className="text-center">31/01/2002</td>
              <td className="text-center">Male</td>
              <td className="text-center">
                <button className="btn btn-warning btn-sm">
                  <i className="fas fa-edit"></i>
                </button>
              </td>
            </tr>
            <tr>
              <th scope="row" className="text-center">12</th>
              <td className="text-center">Abhishek Sharma</td>
              <td className="text-center">12345678</td>
              <td className="text-center">Arun</td>
              <td className="text-center">Sunita</td>
              <td className="text-center">31/01/2002</td>
              <td className="text-center">Male</td>
              <td className="text-center">
                <button className="btn btn-warning btn-sm">
                  <i className="fas fa-edit"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Punishment;
