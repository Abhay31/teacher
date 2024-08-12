import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { FaHome, FaChalkboardTeacher, FaBan, FaAward } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { MdOutlinePostAdd } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { HiMiniUsers } from "react-icons/hi2";
import { GiStairsGoal } from "react-icons/gi";
import { FaBookBookmark } from "react-icons/fa6";


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
    } else if (currentPath === '/promotion') {
      setActiveLink('promotion');
    } else if (currentPath === '/service') {
      setActiveLink('service');
    }
    else if (currentPath === '/users') {
      setActiveLink('users');
    }
  }, [location.pathname]);

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''} bg1 mt-2 mb-1`}>
      <ul className="sidebar-nav mt-1">
      <li className={activeLink === 'home' ? 'active hover-active' : ''}>
           <Link to="/">
             <FaHome className={activeLink === 'home' ? 'sidebar-icon1' : 'sidebar-icon'} size={23} />
             <span className={`${activeLink === 'home' ? 'link-text1' : 'link-text'} slide-text`}>Dashboard</span> 
              <MdKeyboardArrowRight className={activeLink === 'home' ? 'hover-icon1' : 'hover-icon'} size={21} />
           </Link>
         </li>
        <li className={activeLink === 'teacher' ? 'active hover-active' : ''}>
          <Link to="/teacher">
            <FaChalkboardTeacher className={activeLink === 'teacher' ? 'sidebar-icon1' : 'sidebar-icon'} size={23} />
            <span className={`${activeLink === 'teacher' ? 'link-text1' : 'link-text'} slide-text`}>Teachers</span>
            <MdKeyboardArrowRight className={activeLink === 'teacher' ? 'hover-icon1' : 'hover-icon'} size={21} />
          </Link>
        </li>
        <li className={activeLink === 'punishment' ? 'active hover-active' : ''}>
          <Link to="/punishment">
            <FaBan className={activeLink === 'punishment' ? 'sidebar-icon1' : 'sidebar-icon'} size={23} />
            <span className={`${activeLink === 'punishment' ? 'link-text1' : 'link-text'} slide-text`}>Punishments</span>
            <MdKeyboardArrowRight className={activeLink === 'punishment' ? 'hover-icon1' : 'hover-icon'} size={21} />
          </Link>
        </li>
        <li className={activeLink === 'award' ? 'active hover-active' : ''}>
          <Link to="/award">
            <FaAward className={activeLink === 'award' ? 'sidebar-icon1' : 'sidebar-icon'} size={23} />
            <span className={`${activeLink === 'award' ? 'link-text1' : 'link-text'} slide-text`}>Awards</span>
            <MdKeyboardArrowRight className={activeLink === 'award' ? 'hover-icon1' : 'hover-icon'} size={21} />
          </Link>
        </li>
        <li className={activeLink === 'school' ? 'active hover-active' : ''}>
          <Link to="/school">
            <MdOutlinePostAdd className={activeLink === 'school' ? 'sidebar-icon1' : 'sidebar-icon'} size={23} />
            <span className={`${activeLink === 'school' ? 'link-text1' : 'link-text'} slide-text`}>Schools</span>
            <MdKeyboardArrowRight className={activeLink === 'school' ? 'hover-icon1' : 'hover-icon'} size={21} />
          </Link>
        </li>
        <li className={activeLink === 'seniority' ? 'active hover-active' : ''}>
          <Link to="/seniority">
            <FaPeopleGroup className={activeLink === 'seniority' ? 'sidebar-icon1' : 'sidebar-icon'} size={23} />
            <span className={`${activeLink === 'seniority' ? 'link-text1' : 'link-text'} slide-text`}>Seniority List</span>
            <MdKeyboardArrowRight className={activeLink === 'seniority' ? 'hover-icon1' : 'hover-icon'} size={21} />
          </Link>
        </li>
        <li className={activeLink === 'promotion' ? 'active hover-active' : ''}>
          <Link to="/promotion">
            <GiStairsGoal className={activeLink === 'promotion' ? 'sidebar-icon1' : 'sidebar-icon'} size={23} />
            <span className={`${activeLink === 'promotion' ? 'link-text1' : 'link-text'} slide-text`}>Promotion
            </span>
            <MdKeyboardArrowRight className={activeLink === 'promotion' ? 'hover-icon1' : 'hover-icon'} size={21} />
          </Link>
        </li>
        <li className={activeLink === 'service' ? 'active hover-active' : ''}>
          <Link to="/service">
            <FaBookBookmark className={activeLink === 'service' ? 'sidebar-icon1' : 'sidebar-icon'} size={23} />
            <span className={`${activeLink === 'service' ? 'link-text1' : 'link-text'} slide-text`}>Service Book</span>
            <MdKeyboardArrowRight className={activeLink === 'service' ? 'hover-icon1' : 'hover-icon'} size={21} />
          </Link>
        </li>
        <li className={activeLink === 'users' ? 'active hover-active' : ''}>
          <Link to="/users">
            <HiMiniUsers className={activeLink === 'users' ? 'sidebar-icon1' : 'sidebar-icon'} size={23} />
            <span className={`${activeLink === 'users' ? 'link-text1' : 'link-text'} slide-text`}>Users</span>
            <MdKeyboardArrowRight className={activeLink === 'users' ? 'hover-icon1' : 'hover-icon'} size={21} />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

