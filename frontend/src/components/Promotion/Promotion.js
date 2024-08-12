import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Promotion.css";

const Promotion = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/teacher");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employee data", error);
      setError("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handlePromoteClick = async (pranno, isAssistantPromotion) => {
    try {
      const endpoint = `http://localhost:5000/api/teacher/promote/${pranno}`;
      const data = isAssistantPromotion ? { assistant: true } : { graduate: true };
      await axios.put(endpoint, data);

      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee.pranno === pranno
            ? {
                ...employee,
                assistant: isAssistantPromotion ? true : employee.assistant,
                graduate: !isAssistantPromotion ? true : employee.graduate,
              }
            : employee
        )
      );
    } catch (error) {
      console.error("Error updating promotion status", error);
      setError("An error occurred while promoting. Please try again.");
    }
  };

  const calculateExperience = (dateofapp) => {
    const appointmentDate = new Date(dateofapp);
    const currentDate = new Date();
    let years = currentDate.getFullYear() - appointmentDate.getFullYear();
    let months = currentDate.getMonth() - appointmentDate.getMonth();

    if (months < 0 || (months === 0 && currentDate.getDate() < appointmentDate.getDate())) {
      years -= 1;
      months += 12;
    }

    const totalMonths = years * 12 + months;
    const decimalValue = months >= 6 ? 0.5 : 0;
    const preciseYears = totalMonths < 0 ? "0.0" : (years + decimalValue).toFixed(1);

    return parseFloat(preciseYears);
  };

  // Filter employees based on the specific criteria
  const filteredEmployees = employees.filter((employee) => {
    const experience = calculateExperience(employee.dateofapp);
    return (
      (experience > 3 && !employee.assistant) || 
      (experience > 12 && employee.assistant && !employee.graduate)
    );
  });

  return (
    <div className="container mt-5">
      <h2 className="text-start promotion-heading">Promotion Due</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {filteredEmployees.map((employee) => {
          const experience = calculateExperience(employee.dateofapp);
          const isAssistantPromotion = experience > 3 && !employee.assistant;
          const isGraduatePromotion = experience > 12 && employee.assistant && !employee.graduate;
          const buttonTitle = isGraduatePromotion
            ? "Promote to Graduate Teacher"
            : isAssistantPromotion
            ? "Promote to Assistant Teacher"
            : "";

          return (
            <div className="col-md-12 mb-4" key={employee.pranno}>
              <div className="card promotion-card">
                <div className="card-body">
                  <h5 className="card-title">PF NO: {employee.pranno}</h5>
                  <p className="card-text"><strong>Employee Name:</strong> {employee.empname}</p>
                  <p className="card-text"><strong>Experience:</strong> {experience.toFixed(1)} years</p>
                  {buttonTitle && (
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        handlePromoteClick(employee.pranno, isAssistantPromotion)
                      }
                    >
                      {buttonTitle}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Promotion;
