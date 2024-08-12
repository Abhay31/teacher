import React, { useState, useEffect } from 'react';
import { FaPlusCircle, FaTrashAlt } from 'react-icons/fa';

const AcadQual = ({ resetTrigger, onEducationAcadChange }) => {
    const initialEducationState = [
        { university: '', degree: '', specialization: '', city: '', start_date: '', end_date: '', cgpa: '' }
    ];

    const [acadeducations, setAcadEducations] = useState(initialEducationState);
    
    useEffect(() => {
        setAcadEducations(initialEducationState);
        // eslint-disable-next-line
    }, [resetTrigger]);

    useEffect(() => {
        if (onEducationAcadChange) {
            onEducationAcadChange(acadeducations); // Notify parent or context of the change
        }
    }, [acadeducations, onEducationAcadChange]);

    const addEducation = () => {
        const newEducation = { university: '', degree: '', specialization: '', city: '', start_date: '', end_date: '', cgpa: '' };
        setAcadEducations([...acadeducations, newEducation]);
    };

    const removeEducation = (id) => {
        const newEducations = acadeducations.filter(education => education.id !== id);
        setAcadEducations(newEducations);
    };

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newEducations = [...acadeducations];
        newEducations[index][name] = value;
        setAcadEducations(newEducations);
    };

    return (
        <div>
            {acadeducations.map((education, index) => (
                <div className="card mb-4" key={education.id}>
                    <div className="card-header color1 text-white d-flex justify-content-between align-items-center fs-5 fw-bold">
                        <span>Education {index + 1}</span>
                        <div>
                            <FaPlusCircle onClick={addEducation} style={{ cursor: 'pointer', marginRight: '10px' }} />
                            {acadeducations.length > 1 && (
                                <FaTrashAlt onClick={() => removeEducation(education.id)} style={{ cursor: 'pointer' }} />
                            )}
                        </div>
                    </div>
                    <div className="card-body" style={{ backgroundColor: '#F2F0EC' }}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group text-start mb-1">
                                    <label className="fw-bold mb-2">University *</label>
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        name="university"
                                        value={education.university}
                                        onChange={(e) => handleInputChange(index, e)}
                                        placeholder="University"
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group text-start mb-1">
                                    <label className="fw-bold mb-2">Degree *</label>
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        name="degree"
                                        value={education.degree}
                                        onChange={(e) => handleInputChange(index, e)}
                                        placeholder="Degree"
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group text-start mb-1">
                                    <label className="fw-bold mb-2">Specialization</label>
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        name="specialization"
                                        value={education.specialization}
                                        onChange={(e) => handleInputChange(index, e)}
                                        placeholder="Specialization (Optional)"
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group text-start mb-1">
                                    <label className="fw-bold mb-2">City *</label>
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        name="city"
                                        value={education.city}
                                        onChange={(e) => handleInputChange(index, e)}
                                        placeholder="City"
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group text-start mb-1">
                                    <label className="fw-bold mb-2">Start Date *</label>
                                    <input
                                        type="date"
                                        className="form-control mb-2"
                                        name="start_date"
                                        value={education.start_date}
                                        onChange={(e) => handleInputChange(index, e)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group text-start mb-1">
                                    <label className="fw-bold mb-2">End Date</label>
                                    <input
                                        type="date"
                                        className="form-control mb-2"
                                        name="end_date"
                                        value={education.end_date}
                                        onChange={(e) => handleInputChange(index, e)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group text-start mb-1">
                                    <label className="fw-bold mb-2">CGPA/Percentage *</label>
                                    <input
                                        type="text"
                                        className="form-control mb-2"
                                        name="cgpa"
                                        value={education.cgpa}
                                        onChange={(e) => handleInputChange(index, e)}
                                        placeholder="CGPA/Percentage"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AcadQual;
