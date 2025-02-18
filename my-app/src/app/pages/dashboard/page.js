"use client";
import { ClearButton, SubmitButton } from '@/app/components/formItems/buttons';
import { useState } from 'react';

export default function Dashboard() {
    // State variables to manage input fields
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [completedTasks, setCompletedTasks] = useState('');
    const [pendingTasks, setPendingTasks] = useState('');
    const [incidentsNotes, setIncidentsNotes] = useState('');

    // Function to handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Create an object for the form data
        const formData = {
            startDate,
            endDate,
            completedTasks,
            pendingTasks,
            incidentsNotes,
        };

        // Submit the form data to the database (replace this with actual logic)
        console.log('Form submitted:', formData);

        // Clear all fields after submission
        clearForm();
    };

    // Function to clear all form fields
    const clearForm = () => {
        setStartDate('');
        setEndDate('');
        setCompletedTasks('');
        setPendingTasks('');
        setIncidentsNotes('');
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-8 p-3 shadow">
                    <h4 className="text-center mb-4">NOC-Shift Duty Handover</h4>
                    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                {/* Shift Start Date and Time */}
                                <label htmlFor="startDate" className="form-label">Shift Start Date & Time:</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    id="startDate"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                />
                                <div className="invalid-feedback">Please select a start date and time.</div>
                            </div>
                            <div className="col-md-6">
                                {/* Shift End Date and Time */}
                                <label htmlFor="endDate" className="form-label">Shift End Date & Time:</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    id="endDate"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    required
                                />
                                <div className="invalid-feedback">Please select an end date and time.</div>
                            </div>
                        </div>

                        {/* Completed Tasks/Summary */}
                        <div className="mb-3">
                            <label htmlFor="completedTasks" className="form-label">Completed Tasks/Summary:</label>
                            <textarea
                                className="form-control"
                                id="completedTasks"
                                rows="3"
                                value={completedTasks}
                                onChange={(e) => setCompletedTasks(e.target.value)}
                                required
                            />
                            <div className="invalid-feedback">Please enter completed tasks/summary.</div>
                        </div>

                        {/* Pending Tasks/Summary */}
                        <div className="mb-3">
                            <label htmlFor="pendingTasks" className="form-label">Pending Tasks/Summary:</label>
                            <textarea
                                className="form-control"
                                id="pendingTasks"
                                rows="3"
                                value={pendingTasks}
                                onChange={(e) => setPendingTasks(e.target.value)}
                                required
                            />
                            <div className="invalid-feedback">Please enter pending tasks/summary.</div>
                        </div>

                        {/* Incidents/Notes */}
                        <div className="mb-3">
                            <label htmlFor="incidentsNotes" className="form-label">Incidents/Notes:</label>
                            <textarea
                                className="form-control"
                                id="incidentsNotes"
                                rows="3"
                                value={incidentsNotes}
                                onChange={(e) => setIncidentsNotes(e.target.value)}
                            />
                        </div>

                        {/* Buttons */}
                        <div className="d-flex">
                            <SubmitButton
                                onClick={handleSubmit}
                            />
                            <ClearButton
                                onClick={clearForm}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
