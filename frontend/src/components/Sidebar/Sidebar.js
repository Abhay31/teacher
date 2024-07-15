import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { FaHome, FaChalkboardTeacher, FaBan, FaAward } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { MdOutlinePostAdd } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";

const Sidebar = ({ collapsed, toggleSidebar }) => {
  const [activeLink, setActiveLink] = useState('');

  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === '/home') {
      setActiveLink('home');
    } else if (currentPath === '/teacher') {
      setActiveLink('teacher');
    } else if (currentPath.includes('/punishment')) {
      setActiveLink('punishment');
    } else if (currentPath === '/award') {
      setActiveLink('award');
    } else if (currentPath === '/school') {
      setActiveLink('school');
    } else if (currentPath === '/seniority') {
      setActiveLink('seniority');
    }
  }, [location.pathname]);

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''} bg1`}>
      <ul className="sidebar-nav mt-1">
      <li className={activeLink === 'home' ? 'active hover-active' : ''}>
           <Link to="/">
             <FaHome className={activeLink === 'home' ? 'sidebar-icon1' : 'sidebar-icon'} size={27} />
             <span className={`${activeLink === 'home' ? 'link-text1' : 'link-text'} fs-5`}>Dashboard</span> 
              <MdKeyboardArrowRight className={activeLink === 'home' ? 'hover-icon1' : 'hover-icon'} size={23} />
           </Link>
         </li>
        <li className={activeLink === 'teacher' ? 'active hover-active' : ''}>
          <Link to="/teacher">
            <FaChalkboardTeacher className={activeLink === 'teacher' ? 'sidebar-icon1' : 'sidebar-icon'} size={27} />
            <span className={`${activeLink === 'teacher' ? 'link-text1' : 'link-text'} fs-5`}>Teachers</span>
            <MdKeyboardArrowRight className={activeLink === 'teacher' ? 'hover-icon1' : 'hover-icon'} size={23} />
          </Link>
        </li>
        <li className={activeLink === 'punishment' ? 'active hover-active' : ''}>
          <Link to="/punishment">
            <FaBan className={activeLink === 'punishment' ? 'sidebar-icon1' : 'sidebar-icon'} size={27} />
            <span className={`${activeLink === 'punishment' ? 'link-text1' : 'link-text'} fs-5`}>Punishments</span>
            <MdKeyboardArrowRight className={activeLink === 'punishment' ? 'hover-icon1' : 'hover-icon'} size={23} />
          </Link>
        </li>
        <li className={activeLink === 'award' ? 'active hover-active' : ''}>
          <Link to="/award">
            <FaAward className={activeLink === 'award' ? 'sidebar-icon1' : 'sidebar-icon'} size={27} />
            <span className={`${activeLink === 'award' ? 'link-text1' : 'link-text'} fs-5`}>Awards</span>
            <MdKeyboardArrowRight className={activeLink === 'award' ? 'hover-icon1' : 'hover-icon'} size={23} />
          </Link>
        </li>
        <li className={activeLink === 'school' ? 'active hover-active' : ''}>
          <Link to="/school">
            <MdOutlinePostAdd className={activeLink === 'school' ? 'sidebar-icon1' : 'sidebar-icon'} size={27} />
            <span className={`${activeLink === 'school' ? 'link-text1' : 'link-text'} fs-5`}>Schools</span>
            <MdKeyboardArrowRight className={activeLink === 'school' ? 'hover-icon1' : 'hover-icon'} size={23} />
          </Link>
        </li>
        <li className={activeLink === 'seniority' ? 'active hover-active' : ''}>
          <Link to="/seniority">
            <FaPeopleGroup className={activeLink === 'seniority' ? 'sidebar-icon1' : 'sidebar-icon'} size={27} />
            <span className={`${activeLink === 'seniority' ? 'link-text1' : 'link-text'} fs-5`}>Seniority List</span>
            <MdKeyboardArrowRight className={activeLink === 'seniority' ? 'hover-icon1' : 'hover-icon'} size={23} />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

