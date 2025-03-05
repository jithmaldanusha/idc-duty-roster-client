"use client";
import { useState } from "react";
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaBars, FaClipboard } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { ConfirmModal } from "../modals/modals";
import "./page.css"; 

export default function Sidebar({ isCollapsed, toggleSidebar }) {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleNavigation = (path) => {
    setActiveLink(path);
    router.push(path);
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    console.log("Logout triggered"); // This is the dummy logout function
    // Add actual logout functionality here (e.g., clear session, redirect to login page)
  };

  return (
    <>
      <div className={`d-flex flex-column sidebar ${isCollapsed ? "" : "expanded"}`}>
        <ul className="nav flex-column">
          <li className="nav-item">
            <button className="btn-toggle nav-link" onClick={toggleSidebar}>
              <FaBars className="icon" />
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
          <li className={`nav-item ${activeLink === "/pages/dutyHandover" ? "active" : ""}`}>
            <a
              href="#"
              className="nav-link"
              onClick={() => handleNavigation("/pages/dutyHandover")}
            >
              <FaClipboard className="icon" />
              {!isCollapsed && <span className="link-text">Duty Handover</span>}
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
          <li className={`nav-item`}>
            <a
              href="#"
              className="nav-link"
              onClick={() => setShowLogoutModal(true)} // Show modal on click
            >
              <FaSignOutAlt className="icon" />
              {!isCollapsed && <span className="link-text">Logout</span>}
            </a>
          </li>
        </ul>
      </div>

      {/* Confirm Logout Modal */}
      <ConfirmModal
        show={showLogoutModal}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        onConfirm={handleLogout} // Trigger logout on confirm
        onCancel={() => setShowLogoutModal(false)} // Close modal on cancel
      />
    </>
  );
}
