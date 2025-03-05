"use client";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getRosterByDate } from "@/api/settings";
import { ValidateToken } from "@/api/session";
import { SessionTimeout } from "@/app/components/modals/modals";
import { useRouter } from "next/navigation";
import { AiOutlineZoomIn, AiOutlineZoomOut } from "react-icons/ai"; // Import icons

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [role, setUserRole] = useState(null);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [date, setDate] = useState(new Date()); // Set current date by default
  const [sheetLink, setSheetLink] = useState("");
  const [isLinkValid, setIsLinkValid] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1); // Zoom level state
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setSessionExpired(true);
      return;
    }

    const validateAndHandleExpiration = async () => {
      try {
        console.log("Validating token:", token);
        await ValidateToken(token);
      } catch (error) {
        localStorage.removeItem("token");
        setSessionExpired(true);
      }
    };
    validateAndHandleExpiration();
  }, [router]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedUserRole = localStorage.getItem("userrole");
    setUser(storedUser);
    setUserRole(storedUserRole);
  }, []);

  const handleSessionTimeoutClose = () => {
    setSessionExpired(false);
    window.location.href = "/";
  };

  // Fetch the Google Sheets link based on selected year and month
  const fetchSheetLink = async (selectedDate) => {
    setDate(selectedDate);

    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = selectedDate.toLocaleString("default", { month: "long" });

      try {
        const result = await getRosterByDate(year, month);
        if (result && result.sheetLink) {
          setSheetLink(result.sheetLink);
          setIsLinkValid(true); // Mark the link as valid
        } else {
          setSheetLink("");
          setIsLinkValid(false); // Mark the link as invalid
        }
      } catch (error) {
        console.error("Error fetching roster:", error);
        alert("An error occurred while fetching the roster.");
      }
    }
  };

  // Automatically fetch roster for current month on initial render
  useEffect(() => {
    fetchSheetLink(new Date());
  }, []);

  // Zoom control functions
  const zoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 0.1, 2)); // Limit zoom in
  };

  const zoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 0.1, 0.5)); // Limit zoom out
  };

  return (
    <>
      <SessionTimeout show={sessionExpired} onClose={handleSessionTimeoutClose} />

      {/* Year and Month Picker (moved to the right corner) */}
      <div className="container p-3">
        <h5>Hello <span className="fs-6">({role ? role : "Loading..."})</span>{user ? user : "Loading..."}</h5>
        <section className="d-flex justify-content-end mb-3">
          <div className="col-lg-2 col-12">
            <label htmlFor="date" className="form-label">Select Month</label><br />
            <DatePicker
              selected={date}
              onChange={(selectedDate) => {
                fetchSheetLink(selectedDate);
              }}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              showFullMonthYearPicker
              placeholderText="Choose"
              className="form-control"
              required
            />
          </div>
        </section>

        {/* Show iframe preview only if the link is valid */}
        {sheetLink ? (
          <section style={{ position: "relative" }} className="shadow">
            <div className="col-lg-12 col-12 mb-3 p-2">
              <label className="form-label text-end">Preview</label>
              <div
                className="iframe-container"
                style={{ overflow: "hidden", width: "100%", height: "600px", position: "relative" }}
              >
                <iframe
                  className="border"
                  src={sheetLink.replace("/edit", "/pubhtml")}
                  width="100%"
                  height="600"
                  frameBorder="0"
                  allowFullScreen
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: "0 0", // Ensures scaling from top left
                    width: `${100 / zoomLevel}%`, // Adjusts width to ensure full display
                    height: `${100 / zoomLevel}%`, // Adjusts height for zooming
                  }}
                ></iframe>

                {/* Zoom controls, positioned in the bottom-right corner */}
                <div
                  className="zoom-controls"
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "10px",
                    display: "flex",
                    gap: "10px",
                    backgroundColor: "#fff",
                    padding: "5px",
                    borderRadius: "5px",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <AiOutlineZoomOut
                    className="shadow rounded"
                    size={30}
                    style={{ cursor: "pointer" }}
                    onClick={zoomOut}
                  />
                  <AiOutlineZoomIn
                    className="shadow rounded"
                    size={30}
                    style={{ cursor: "pointer" }}
                    onClick={zoomIn}
                  />
                </div>
              </div>
            </div>
          </section>
        ) : (
          date && (
            <div className="col-lg-12 col-12 mb-3">
              <p>No roster found for the selected month.</p>
            </div>
          )
        )}
      </div>
    </>
  );
}
