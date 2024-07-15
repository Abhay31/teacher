import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './AddAward.css'

const AddPunishment = () => {
    const [employeeID, setEmployeeID] = useState('');
    const [employeeName, setEmployeeName] = useState('');
    const [punishmentDescription, setPunishmentDescription] = useState([]);
    const [otherReason, setOtherReason] = useState('');
    const [showOtherField, setShowOtherField] = useState(false);

    const handlePunishmentChange = (event) => {
        const options = event.target.options;
        const selectedOptions = [];
        let otherSelected = false;
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedOptions.push(options[i].value);
                if (options[i].value === "Others") {
                    otherSelected = true;
                }
            }
        }
        setPunishmentDescription(selectedOptions);
        setShowOtherField(otherSelected);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            employeeID,
            employeeName,
            punishmentDescription,
            otherReason: showOtherField ? otherReason : null,
        };
        console.log(formData);
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <Link to="/award" className="btn btn-link">
                    <FaArrowLeft size={25} />
                </Link>
                <h2 className="text-primary-emphasis fw-bold">Add Punishment</h2>
            </div>
            <div className='bg-white p-4 rounded-4 box card-custom-height1'>
                <form onSubmit={handleSubmit} className="form-container">
                    <div className="mb-3 form-group">
                        <label htmlFor="formEmployeeID" className="form-label">Employee ID</label>
                        <input
                            type="text"
                            className="form-control rounded-5"
                            id="formEmployeeID"
                            value={employeeID}
                            onChange={(e) => setEmployeeID(e.target.value)}
                            placeholder="Enter Employee ID"
                            required
                        />
                    </div>
                    <div className="mb-3 form-group">
                        <label htmlFor="formEmployeeName" className="form-label">Employee Name</label>
                        <input
                            type="text"
                            className="form-control rounded-5"
                            id="formEmployeeName"
                            value={employeeName}
                            onChange={(e) => setEmployeeName(e.target.value)}
                            placeholder="Enter Employee Name"
                            required
                        />
                    </div>
                    <div className='row'>
                        <div className="mb-3 form-group">
                            <label htmlFor="formPunishmentDescription" className="form-label">Punishment Description</label>
                        <select
                            className="form-control"
                            id="formPunishmentDescription"
                            multiple
                            value={punishmentDescription}
                            onChange={handlePunishmentChange}
                            required
                        >
                            <option value="Warning">Warning</option>
                            <option value="Suspension">Suspension</option>
                            <option value="Termination">Termination</option>
                            <option value="Deduction">Deduction</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                    {showOtherField && (
                        <div className="mb-3 form-group">
                            <label htmlFor="formOtherReason" className="form-label">Please specify</label>
                            <input
                                type="text"
                                className="form-control rounded-5"
                                id="formOtherReason"
                                value={otherReason}
                                onChange={(e) => setOtherReason(e.target.value)}
                                placeholder="Enter the reason"
                                required
                            />
                        </div>
                    )}
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn1 btn-primary mt-1">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPunishment;