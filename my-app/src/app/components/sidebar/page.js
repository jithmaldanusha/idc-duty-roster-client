"use client";
import { useState } from "react";
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaBars } from "react-icons/fa";
import { useRouter } from "next/navigation";
import "./page.css"; // Import your sidebar styles here

export default function Sidebar({ isCollapsed, toggleSidebar }) {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("/pages/dashboard"); // Set Dashboard as default active

  // Handle navigation and active link setting
  const handleNavigation = (path) => {
    setActiveLink(path);
    router.push(path); // Navigate to the selected path
  };

  return (
    <div className={`d-flex flex-column sidebar ${isCollapsed ? "" : "expanded"}`}>
      <ul className="nav flex-column">
        <li className="nav-item">
          <button className="btn btn-toggle nav-link" onClick={toggleSidebar}>
            <FaBars className="icon" /> {/* Hamburger icon */}
          </button>
        </li>
        <li className={`nav-item ${activeLink === "/pages/dashboard" ? "active" : ""}`}>
          <a
            href="#"
            className="nav-link"
            onClick={() => handleNavigation("/pages/dashboard")}
          >
            <FaHome className="icon" />
            {!isCollapsed && <span className="link-text">Dashboard</span>}
          </a>
        </li>
        <li className={`nav-item ${activeLink === "/pages/profile" ? "active" : ""}`}>
          <a
            href="#"
            className="nav-link"
            onClick={() => handleNavigation("/pages/profile")}
          >
            <FaUser className="icon" />
            {!isCollapsed && <span className="link-text">Profile</span>}
          </a>
        </li>
        <li className={`nav-item ${activeLink === "/pages/settings" ? "active" : ""}`}>
          <a
            href="#"
            className="nav-link"
            onClick={() => handleNavigation("/pages/settings")}
          >
            <FaCog className="icon" />
            {!isCollapsed && <span className="link-text">Settings</span>}
          </a>
        </li>
        <li className={`nav-item ${activeLink === "/pages/logout" ? "active" : ""}`}>
          <a
            href="#"
            className="nav-link"
            onClick={() => handleNavigation("/pages/logout")}
          >
            <FaSignOutAlt className="icon" />
            {!isCollapsed && <span className="link-text">Logout</span>}
          </a>
        </li>
      </ul>
    </div>
  );
}
