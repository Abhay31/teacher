// import React, { useState, useEffect } from 'react';
// import { FaPlusCircle, FaTrashAlt } from 'react-icons/fa';

// const AcadQual = ({ resetTrigger }) => {
//     const initialEducationState = [
//         { id: 1, university: '', degree: '', startDate: '', endDate: '', city: '', cgpa: '', specialization: '', currentlyPursuing: false }
//     ];

//     const [educations, setEducations] = useState(initialEducationState);
    
//     useEffect(() => {
//         setEducations(initialEducationState);
//         // eslint-disable-next-line
//     }, [resetTrigger]);

//     const addEducation = () => {
//         const newEducation = { id: educations.length + 1, university: '', degree: '', startDate: '', endDate: '', city: '', cgpa: '', specialization: '', currentlyPursuing: false };
//         setEducations([...educations, newEducation]);
//     };

//     const removeEducation = (id) => {
//         const newEducations = educations.filter(education => education.id !== id);
//         setEducations(newEducations);
//     };

//     const handleInputChange = (index, event) => {
//         const { name, value, type, checked } = event.target;
//         const newEducations = [...educations];
//         if (type === 'checkbox') {
//             newEducations[index][name] = checked;
//             if (checked) newEducations[index].endDate = '';
//         } else {
//             newEducations[index][name] = value;
//         }
//         setEducations(newEducations);
//     };

//     return (
//         <div>
//             {educations.map((education, index) => (
//                 <div className="card mb-4" key={index}>
//                     <div className="card-header color1 text-white d-flex justify-content-between align-items-center fs-5 fw-bold">
//                         <span>Education {index + 1}</span>
//                         <div>
//                             <FaPlusCircle onClick={addEducation} style={{ cursor: 'pointer', marginRight: '10px' }} />
//                             {educations.length > 1 && (
//                                 <FaTrashAlt onClick={() => removeEducation(education.id)} style={{ cursor: 'pointer' }} />
//                             )}
//                         </div>
//                     </div>
//                     <div className="card-body" style={{backgroundColor:'#F2F0EC'}}>
//                         <div className="row">
//                             <div className="col-md-6">
//                                 <div className="form-group text-start mb-1">
//                                     <label className="fw-bold mb-2">University *</label>
//                                     <input
//                                         type="text"
//                                         className="form-control mb-2"
//                                         name="university"
//                                         value={education.university}
//                                         onChange={(e) => handleInputChange(index, e)}
//                                         placeholder="University"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="col-md-6">
//                                 <div className="form-group text-start mb-1">
//                                     <label className="fw-bold mb-2">Degree *</label>
//                                     <input
//                                         type="text"
//                                         className="form-control mb-2"
//                                         name="degree"
//                                         value={education.degree}
//                                         onChange={(e) => handleInputChange(index, e)}
//                                         placeholder="Degree"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="col-md-6">
//                                 <div className="form-group text-start mb-1">
//                                     <label className="fw-bold mb-2">Specialization</label>
//                                     <input
//                                         type="text"
//                                         className="form-control mb-2"
//                                         name="specialization"
//                                         value={education.specialization}
//                                         onChange={(e) => handleInputChange(index, e)}
//                                         placeholder="specialization (Optional)"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="col-md-6">
//                                 <div className="form-group text-start mb-1">
//                                     <label className="fw-bold mb-2">City *</label>
//                                     <input
//                                         type="text"
//                                         className="form-control mb-2"
//                                         name="city"
//                                         value={education.city}
//                                         onChange={(e) => handleInputChange(index, e)}
//                                         placeholder="City"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="col-md-6">
//                                 <div className="form-group text-start mb-1">
//                                     <label className="fw-bold mb-2">Start Date *</label>
//                                     <input
//                                         type="month"
//                                         className="form-control mb-2"
//                                         name="startDate"
//                                         value={education.startDate}
//                                         onChange={(e) => handleInputChange(index, e)}
//                                     />
//                                 </div>
//                             </div>
//                             <div className="col-md-6">
//                                 <div className="form-group text-start mb-1">
//                                     <label className="fw-bold mb-2">End Date</label>
//                                     <input
//                                         type="month"
//                                         className="form-control mb-2"
//                                         name="endDate"
//                                         value={education.endDate}
//                                         onChange={(e) => handleInputChange(index, e)}
//                                         disabled={education.currentlyPursuing}
//                                     />
//                                     <div className="form-check mt-2">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             name="currentlyPursuing"
//                                             checked={education.currentlyPursuing}
//                                             onChange={(e) => handleInputChange(index, e)}
//                                         />
//                                         <label className="form-check-label">
//                                             Currently Pursuing
//                                         </label>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="col-md-6">
//                                 <div className="form-group text-start mb-1">
//                                     <label className="fw-bold mb-2">CGPA/Percentage *</label>
//                                     <input
//                                         type="text"
//                                         className="form-control mb-2"
//                                         name="cgpa"
//                                         value={education.cgpa}
//                                         onChange={(e) => handleInputChange(index, e)}
//                                         placeholder="CGPA/Percentage"
//                                     />
//                                 </div>
//                             </div>

//                         </div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default AcadQual;

import React, { useState, useEffect } from 'react';
import { FaPlusCircle, FaTrashAlt } from 'react-icons/fa';

const MainQual = ({ resetTrigger, onEducationMainChange }) => {
    const initialEducationState = [
        { university: '', degree: '', specialization: '', city: '', start_date: '', end_date: '', cgpa: '' }
    ];

    const [maineducations, setMainEducations] = useState(initialEducationState);
    
    useEffect(() => {
        setMainEducations(initialEducationState);
        // eslint-disable-next-line
    }, [resetTrigger]);

    useEffect(() => {
        if (onEducationMainChange) {
            onEducationMainChange(maineducations); // Notify parent or context of the change
        }
    }, [maineducations, onEducationMainChange]);

    const addEducation = () => {
        const newEducation = { university: '', degree: '', specialization: '', city: '', start_date: '', end_date: '', cgpa: '' };
        setMainEducations([...maineducations, newEducation]);
    };

    const removeEducation = (id) => {
        const newEducations = maineducations.filter(education => education.id !== id);
        setMainEducations(newEducations);
    };

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newEducations = [...maineducations];
        newEducations[index][name] = value;
        setMainEducations(newEducations);
    };

    return (
        <div>
            {maineducations.map((education, index) => (
                <div className="card mb-4" key={education.id}>
                    <div className="card-header color1 text-white d-flex justify-content-between align-items-center fs-5 fw-bold">
                        <span>Education {index + 1}</span>
                        <div>
                            <FaPlusCircle onClick={addEducation} style={{ cursor: 'pointer', marginRight: '10px' }} />
                            {maineducations.length > 1 && (
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

export default MainQual;
