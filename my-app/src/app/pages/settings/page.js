"use client";
import { useState } from "react";
import { ClearButton, SubmitButton } from "@/app/components/formItems/buttons";
import { updateRoster } from "@/api/settings"; // Import API functions
import Roster from "./roster";

export default function Settings() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [sheetLink, setSheetLink] = useState("");

    // Handle date change from Roster component
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    // Handle roster update
    const handleUpdateRoster = async (e) => {
        e.preventDefault();
        if (!selectedDate || !sheetLink) {
            alert("Please fill in all fields and provide the sheet link.");
            return;
        }

        const year = selectedDate.getFullYear();
        const month = selectedDate.toLocaleString("default", { month: "long" });

        try {
            const result = await updateRoster(year, month, sheetLink);
            if (result) {
                alert("Roster updated successfully!");
            } else {
                alert("Failed to update the roster. Please try again.");
            }
        } catch (error) {
            console.error("Error updating roster:", error);
            alert("An error occurred while updating the roster.");
        }
    };



    return (
        <div className="container p-5 shadow rounded">
            <h5>Update Roster</h5>
            <form className="mt-4">
                {/* Roster component for selecting date and displaying sheet */}
                <Roster onDateChange={handleDateChange} />

                <section className="d-flex mt-3">
                    <SubmitButton onClick={handleUpdateRoster} lableName="Update Roster" />
                </section>
            </form>
        </div>
    );
}
