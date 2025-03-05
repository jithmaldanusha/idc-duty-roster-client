"use client";
import Sidebar from "../components/sidebar/page";
import { useState } from "react";

export default function DashLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(true); // Sidebar minimized by default

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <section className="d-flex">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <div className={`main-content ${isCollapsed ? "" : "collapsed"}`}>
        {children}
      </div>
    </section>
  );
}
