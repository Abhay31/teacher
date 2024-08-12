import React, { useState, useEffect } from 'react';
import './Taluka.css';

const talukaCodes = [
    {
        state: "Maharashtra",
        talukas: [
            { name: "Mumbai", code: "MH01" },
            { name: "Pune", code: "MH02" },
            { name: "Nashik", code: "MH03" },
            { name: "Nagpur", code: "MH04" },
        ]
    },
    {
        state: "Gujarat",
        talukas: [
            { name: "Ahmedabad", code: "GJ01" },
            { name: "Surat", code: "GJ02" },
            { name: "Vadodara", code: "GJ03" },
            { name: "Rajkot", code: "GJ04" },
        ]
    },
    {
        state: "Karnataka",
        talukas: [
            { name: "Bangalore", code: "KA01" },
            { name: "Mysore", code: "KA02" },
            { name: "Hubli", code: "KA03" },
            { name: "Mangalore", code: "KA04" },
        ]
    },
    {
        state: "Tamil Nadu",
        talukas: [
            { name: "Chennai", code: "TN01" },
            { name: "Coimbatore", code: "TN02" },
            { name: "Madurai", code: "TN03" },
            { name: "Tiruchirappalli", code: "TN04" },
        ]
    },
    {
        state: "Rajasthan",
        talukas: [
            { name: "Jaipur", code: "RJ01" },
            { name: "Udaipur", code: "RJ02" },
            { name: "Jodhpur", code: "RJ03" },
            { name: "Kota", code: "RJ04" },
        ]
    }
];

const Taluka = ({ onTalukaChange }) => {
    const [talukaData, setTalukaData] = useState([]);

    useEffect(() => {
        console.log('Taluka Data:', talukaData); // Debugging line
        if (talukaData.length > 0) {
            onTalukaChange(talukaData);
        }
    }, [talukaData]);

    const handleStateChange = (e) => {
        const stateName = e.target.value;
        const selectedStateObj = talukaCodes.find(state => state.state === stateName);
        if (selectedStateObj) {
            setTalukaData([{ state: stateName, code: '', name: '' }]);
        } else {
            console.error('State not found:', stateName);
            setTalukaData([]);
        }
    };

    const handleCodeChange = (e) => {
        const code = e.target.value;
        const taluka = talukaCodes.find(state => state.state === talukaData[0]?.state)?.talukas.find(taluka => taluka.code === code);
        setTalukaData([{ ...talukaData[0], code, name: taluka ? taluka.name : '' }]);
    };

    const handleNameChange = (e) => {
        const name = e.target.value;
        const taluka = talukaCodes.find(state => state.state === talukaData[0]?.state)?.talukas.find(taluka => taluka.name === name);
        setTalukaData([{ ...talukaData[0], name, code: taluka ? taluka.code : '' }]);
    };

    return (
        <>
            <div className="col-md-4 custom-dropdown">
                <div className="form-group text-start">
                    <label className="fw-bold mb-2">District</label>
                    <select className="form-select form-select-lg mb-3" onChange={handleStateChange} aria-label="Default select example" required>
                        <option value="">Select District</option>
                        {talukaCodes.map((state) => (
                            <option key={state.state} value={state.state}>
                                {state.state}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="col-md-4 custom-dropdown">
                <div className="form-group text-start">
                    <label className="fw-bold mb-2">Taluka Code</label>
                    <select className="form-select form-select-lg mb-3" value={talukaData[0]?.code || ''} onChange={handleCodeChange} aria-label="Default select example" required>
                        <option value="">Select Taluka Code</option>
                        {talukaCodes.find(state => state.state === talukaData[0]?.state)?.talukas.map((taluka) => (
                            <option key={taluka.code} value={taluka.code}>
                                {taluka.code}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="col-md-4 custom-dropdown">
                <div className="form-group text-start">
                    <label className="fw-bold mb-2">Taluka Name</label>
                    <select className="form-select form-select-lg mb-3" value={talukaData[0]?.name || ''} onChange={handleNameChange} aria-label="Default select example" required>
                        <option value="">Select Taluka Name</option>
                        {talukaCodes.find(state => state.state === talukaData[0]?.state)?.talukas.map((taluka) => (
                            <option key={taluka.name} value={taluka.name}>
                                {taluka.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    );
};

export default Taluka;


