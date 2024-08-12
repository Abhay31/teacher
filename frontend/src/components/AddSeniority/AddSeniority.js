import React, {useEffect, useState} from 'react';
import './AddSeniority.css'
import axios from 'axios';

const AddSeniority = () => {
    const [masterData, setMasterData] = useState([]);
  const [selectedPravarg, setSelectedPravarg] = useState('');
  const [arakshan, setArakshan] = useState('');
  const [binduKramankOptions, setBinduKramankOptions] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categoryb');
        setMasterData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  
  const handlePravargChange = (e) => {
    const selectedPravarg = e.target.value;
    setSelectedPravarg(selectedPravarg);
    
    const selectedData = masterData.find(data => data.pravarg === selectedPravarg);
    if (selectedData) {
      setArakshan(selectedData.arakshan);
      setBinduKramankOptions(selectedData.bindu_kramank.split(',').map(item => item.trim()));
    } else {
      setArakshan('');
      setBinduKramankOptions([]);
    }
  };

    return (
        <form className='mt-5'>
        <div>
          <label>Pravarg:</label>
          <select value={selectedPravarg} onChange={handlePravargChange}>
            <option value="">Select Pravarg</option>
            {masterData.map((data, index) => (
              <option key={index} value={data.pravarg}>
                {data.pravarg}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Arakshan:</label>
          <input type="text" value={arakshan} readOnly />
        </div>
        <div>
          <label>Bindu Kramank:</label>
          <select>
            <option value="">Select Bindu Kramank</option>
            {binduKramankOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </form>
    );
};

export default AddSeniority;