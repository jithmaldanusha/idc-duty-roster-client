"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getRosterByDate } from "@/api/settings"; // Import API function
import { ClearButton } from "@/app/components/formItems/buttons";

export default function Roster({ onDateChange }) {
    const [date, setDate] = useState(null);
    const [sheetLink, setSheetLink] = useState("");
    const [isLinkValid, setIsLinkValid] = useState(false);

    // Fetch the Google Sheets link based on selected year and month
    const fetchSheetLink = async (selectedDate) => {
        setDate(selectedDate);
        onDateChange(selectedDate); // Notify parent of date change

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

    // Handle manual sheet link entry
    const handleManualLinkChange = (e) => {
        setSheetLink(e.target.value);
        setIsLinkValid(true); // Assume it's valid when manually entered
    };

    // Clear fields
    const handleClear = () => {
        setDate(null);
        setSheetLink("");
    };
    return (
        <div className="container p-0">
            <section className="d-flex flex-column flex-lg-row">
                {/* Year and Month Picker */}
                <div className="col-lg-2 col-12 mb-3 me-1">
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

                {/* Input field for manually entering the sheet link */}
                <div className="col-lg-9 col-12 mb-3 me-1">
                    <label htmlFor="sheetLink" className="form-label">Google Sheets Link</label>
                    <input
                        type="text"
                        id="sheetLink"
                        className="form-control"
                        placeholder="Paste your Google Sheets link here"
                        value={sheetLink}
                        onChange={handleManualLinkChange}
                    />
                </div>
                <ClearButton onClick={handleClear} />
            </section>

            <section>
                {/* Show iframe preview only if the link is valid */}
                {sheetLink && (
                    <div className="col-lg-12 col-12 mb-3">
                        <label className="form-label text-end">Preview</label>
                        <iframe
                            className="border"
                            src={sheetLink.replace("/edit", "/preview")}
                            width="100%"
                            height="600"
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}
            </section>
        </div>
    );
}
