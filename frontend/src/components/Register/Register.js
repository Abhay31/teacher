import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import img1 from "../../assets/img/amravati.jpg";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [colour, setColour] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        name,
        age,
        colour,
        password
      });

      if (response.status === 200) {
        navigate("/login");
      } else {
        console.log("Registration failed");
      }
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div className="container-fluid register-container">
      <div className="register-image d-none d-md-flex">
        <div className="register-update">
          <img src={img1} alt="Register Visual" />
        </div>
      </div>
      <div className="register-form"style={{boxShadow: '15px 0 rgba(118, 130, 126,0.7)' }}>
        <div className="register-logo mb-3">
          <h2 style={{textAlign: 'center', fontFamily:'Franklin Gothic Medium', fontSize: '45px', fontWeight: '550', color:'rgb(62, 26, 75)', textShadow: '2px 2px 4px rgb(91, 147, 231)' }}>Register User</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <input
              type="text"
              className="form-control rounded-3"style={{border:'1px solid #808080'}}
              placeholder="Create Username"
              value={name}
              onChange={(e)=> setName(e.target.value)}
            />
          </div>
          <div className="form-group mb-4">
            <input
              type="text"
              className="form-control rounded-3"style={{border:'1px solid #808080'}}
              placeholder="Enter your Mobile Number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="form-group mb-4">
            <input
              type="text"
              className="form-control rounded-3"style={{border:'1px solid #808080'}}
              placeholder="Enter your Address"
              value={colour}
              onChange={(e) => setColour(e.target.value)}
            />
          </div>
          <div className="form-group mb-4">
            <input
              type="password"
              className="form-control rounded-3"style={{border:'1px solid #808080'}}
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-center mt-5 w-100">
            <button type="submit" className="btn rounded-3 w-100 btn-success text-center">
              Register
            </button>
          </div>
        </form>
        <p className="text-center mt-3" style={{fontSize:'19px'}}>
          Already a User? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

// import React, {useState} from "react";
// import "./Register.css";
// import { Link, useNavigate } from "react-router-dom";
// import img1 from "../../assets/img/social-media1.png";
// import axios from "axios";

// const Register = () => {
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   // const [email, setEmail] = useState("");
//   const [age, setAge] = useState("");
//   const [colour, setColour] = useState("");
//   // const [password, setPassword] = useState("");

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post('https://crudcrud.com/api/daef9bdfd7f34362af06135268bba02e/unicorns', {
//         name,
//         // email,
//         age,
//         colour,
//         // password
//       });

//       if (response.status === 201) {
//         navigate("/login");
//       } else {
//         console.log("Registration failed");
//       }
//     } catch (error) {
//       console.error('Error registering:', error);
//     }
//   };

//   return (
//     <div className="container-fluid register-container">
//       <div className="register-image d-none d-md-flex">
//         <div className="register-update">
//           <img src={img1} alt="Register Visual" />
//         </div>
//       </div>
//       <div className="register-form">
//         <div className="register-logo mb-5">
//           <h2>Register User</h2>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group mb-4">
//             <input
//               type="text"
//               className="form-control rounded-5"
//               placeholder="Create Username"
//               value={name}
//               onChange={(e)=> setName(e.target.value)}
//             />
//           </div>
//           {/* <div className="form-group mb-4">
//             <input
//               type="email"
//               className="form-control rounded-5"
//               placeholder="Enter your Email Address"
//               onChange={e => setEmail(e.target.value)}
//             />
//           </div> */}
//           <div className="form-group mb-4">
//             <input
//               type="text"
//               className="form-control rounded-5"
//               placeholder="Enter your Mobile Number"
//               value={age}
//               onChange={(e) => setAge(e.target.value)}
//             />
//           </div>
//           <div className="form-group mb-4">
//             <input
//               type="text"
//               className="form-control rounded-5"
//               placeholder="Enter your Address"
//               value={colour}
//               onChange={(e) => setColour(e.target.value)}
//             />
//           </div>
//           {/* <div className="form-group mb-4">
//             <input
//               type="password"
//               className="form-control rounded-5"
//               placeholder="Create Password"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div> */}
//           <div className="text-center mt-5 w-100">
//             <button type="submit" className="btn rounded-5 w-100 btn-success text-center">
//               Register
//             </button>
//           </div>
//         </form>
//         <p className="text-center mt-3">
//           Already a User? <Link to="/login">Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;
