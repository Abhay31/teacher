import { React, useState } from 'react';
import './Taluka.css';

const talukaCodes = [
    {
        state: "Maharashtra",
        talukas: [
            { name: "Mumbai", code: "MH01" },
            { name: "Pune", code: "MH02" },
            { name: "Nashik", code: "MH03" },
            { name: "Nagpur", code: "MH04" },
            // Add more talukas as needed
        ]
    },
    {
        state: "Gujarat",
        talukas: [
            { name: "Ahmedabad", code: "GJ01" },
            { name: "Surat", code: "GJ02" },
            { name: "Vadodara", code: "GJ03" },
            { name: "Rajkot", code: "GJ04" },
            // Add more talukas as needed
        ]
    },
    {
        state: "Karnataka",
        talukas: [
            { name: "Bangalore", code: "KA01" },
            { name: "Mysore", code: "KA02" },
            { name: "Hubli", code: "KA03" },
            { name: "Mangalore", code: "KA04" },
            // Add more talukas as needed
        ]
    },
    {
        state: "Tamil Nadu",
        talukas: [
            { name: "Chennai", code: "TN01" },
            { name: "Coimbatore", code: "TN02" },
            { name: "Madurai", code: "TN03" },
            { name: "Tiruchirappalli", code: "TN04" },
            // Add more talukas as needed
        ]
    },
    {
        state: "Rajasthan",
        talukas: [
            { name: "Jaipur", code: "RJ01" },
            { name: "Udaipur", code: "RJ02" },
            { name: "Jodhpur", code: "RJ03" },
            { name: "Kota", code: "RJ04" },
            // Add more talukas as needed
        ]
    }
    // Add more states and talukas as needed
];

const Taluka = () => {
    const [selectedCode, setSelectedCode] = useState('');
    const [selectedName, setSelectedName] = useState('');
    const [filteredTalukas, setFilteredTalukas] = useState([]);

    // Function to handle state selection
    const handleStateChange = (e) => {
        const stateName = e.target.value;
        const selectedState = talukaCodes.find(state => state.state === stateName);
        setFilteredTalukas(selectedState ? selectedState.talukas : []);
        setSelectedCode('');
        setSelectedName('');
    };

    // Function to handle Taluka code selection
    const handleCodeChange = (e) => {
        const code = e.target.value;
        const taluka = filteredTalukas.find(taluka => taluka.code === code);
        setSelectedCode(code);
        setSelectedName(taluka ? taluka.name : '');
    };

    // Function to handle Taluka name selection
    const handleNameChange = (e) => {
        const name = e.target.value;
        const taluka = filteredTalukas.find(taluka => taluka.name === name);
        setSelectedName(name);
        setSelectedCode(taluka ? taluka.code : '');
    };
    return (
        <>
            <div className="col-md-4 custom-dropdown">
                <div className="form-group text-start">
                    <label className="fw-bold mb-2">District</label>
                    <select className="form-select form-select-lg mb-3" onChange={handleStateChange} aria-label="Default select example">
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
                    <select className="form-select form-select-lg mb-3" value={selectedCode} onChange={handleCodeChange} aria-label="Default select example">
                        <option value="">Select Taluka Code</option>
                        {filteredTalukas.map((taluka) => (
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
                    <select className="form-select form-select-lg mb-3" value={selectedName} onChange={handleNameChange} aria-label="Default select example">
                        <option value="">Select Taluka Name</option>
                        {filteredTalukas.map((taluka) => (
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
