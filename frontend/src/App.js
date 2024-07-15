import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import AddNewTeacher from "./components/AddTeacher/AddTeacher";
import Teacher from "./components/Teacher/Teacher";
import Home from "./components/Home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Punishment from "./components/Punishment/Punishment";
import Awards from "./components/Awards/Awards";
import AddPunishment from "./components/AddPunishment/AddPunishment";
import AddAward from "./components/AddAward/AddAward";
import "@fortawesome/fontawesome-free/css/all.min.css";
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import School from "./components/Schools/Schools";
import SchoolUpdate from "./components/SchoolUpdate/SchoolUpdate";
import SeniorityList from "./components/SeniorityList/SeniorityList";

const App = () => {
  const [user, setUser] = useState(null); 

  return (
    <Router>
      {!user ? (
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route
            exact
            path="/login"
            element={<Login setUser={setUser} />} 
          />
          <Route exact path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <>
          <NavBar setUser={setUser} user={user} />
          <div className="app-container">
            <Sidebar />
            <div className="main-content">
              <Routes>
                <Route exact path="/" element={<Navigate to="/home" />} />
                <Route exact path="/home" element={<Home user={user} />} />
                <Route exact path="/teacher" element={<Teacher />} />
                <Route exact path="/punishment" element={<Punishment />} />
                <Route exact path="/award" element={<Awards />} />
                <Route
                  exact
                  path="/teacher/addteacher"
                  element={<AddNewTeacher />}
                />
                <Route
                  exact
                  path="/punishment/addpunishment"
                  element={<AddPunishment />}
                />
                <Route exact path="/award/addaward" element={<AddAward />} />
                <Route exact path="/school" element={<School />} />
                <Route exact path="/school/addschool" element={<SchoolUpdate />} />
                <Route exact path="/seniority" element={<SeniorityList />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </Router>
  );
};

export default App;

// import React, { useState } from "react";
// import "./App.css";
// import Sidebar from "./components/Sidebar/Sidebar";
// import Home from "./components/Home/Home";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import NavBar from "./components/NavBar/NavBar";
// import Login from "./components/Login/Login";
// import Register from "./components/Register/Register";
// import Posts from "./components/Schools/Schools";
// import PostUpdate from "./components/PostUpdate/PostUpdate";

// const App = () => {
//   const [user, setUser] = useState(null);

//   return (
//     <Router>
//       {!user ? (
//         <Routes>
//           <Route exact path="/register" element={<Register />} />
//           <Route
//             exact
//             path="/login"
//             element={<Login setUser={setUser} />}
//           />
//           <Route exact path="*" element={<Navigate to="/login" />} />
//         </Routes>
//       ) : (
//         <>
//           <NavBar setUser={setUser} user={user} />
//           <div className="app-container">
//             <Sidebar />
//             <div className="main-content">
//               <Routes>
//                 <Route exact path="/" element={<Navigate to="/home" />} />
//                 <Route exact path="/home" element={<Home user={user} />} />
//                 <Route exact path="/school" element={<Posts />} />
//                 <Route
//                   exact
//                   path="/post/addpost"
//                   element={<PostUpdate />}
//                 />
//               </Routes>
//             </div>
//           </div>
//         </>
//       )}
//     </Router>
//   );
// };

// export default App;
