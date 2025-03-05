"use client"
import { useState } from 'react';
import { AddButton, ClearButton, SubmitButton } from '@/app/components/formItems/buttons';
import TaskBox from '@/app/components/taskBox/page';
import { TaskModal } from '@/app/components/modals/modals';

export default function DutyHandover() {
    // State variables to manage input fields
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [completedTasks, setCompletedTasks] = useState([]);
    const [pendingTasks, setPendingTasks] = useState([]);
    const [incidentsNotes, setIncidentsNotes] = useState('');
    const [showModal, setShowModal] = useState(false); // Manage modal visibility
    const [taskType, setTaskType] = useState('completed'); // To manage task type being added ('completed' or 'pending')

    // Function to handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            startDate,
            endDate,
            completedTasks,
            pendingTasks,
            incidentsNotes,
        };

        console.log('Form submitted:', formData);
        clearForm();
    };

    const clearForm = () => {
        setStartDate('');
        setEndDate('');
        setCompletedTasks([]);
        setPendingTasks([]);
        setIncidentsNotes('');
    };

    // Function to handle task submission from modal
    const handleTaskSubmit = (task) => {
        if (taskType === 'completed') {
            setCompletedTasks([...completedTasks, task]);
        } else if (taskType === 'pending') {
            setPendingTasks([...pendingTasks, task]);
        }
        setShowModal(false); // Close the modal after task is added
    };

    // Function to remove task from the list
    const handleTaskRemove = (taskIndex, taskCategory) => {
        if (taskCategory === 'completed') {
            const updatedTasks = completedTasks.filter((_, index) => index !== taskIndex);
            setCompletedTasks(updatedTasks);
        } else if (taskCategory === 'pending') {
            const updatedTasks = pendingTasks.filter((_, index) => index !== taskIndex);
            setPendingTasks(updatedTasks);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-9 p-3 shadow rounded">
                    <h4 className="text-center mb-4">NOC-Shift Duty Handover</h4>
                    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <h6 htmlFor="startDate" className="form-label">Shift Start Date & Time:</h6>
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
                                <h6 htmlFor="endDate" className="form-label">Shift End Date & Time:</h6>
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

                        {/* Completed Tasks */}
                        <div className="mt-4">
                            <div className='d-flex'>
                                <h6 className='mt-1'>Completed Tasks</h6>
                                <AddButton onClick={() => { setShowModal(true); setTaskType('completed'); }} lableName="+Add Task" />
                            </div>
                            <TaskBox taskList={completedTasks} onRemove={(index) => handleTaskRemove(index, 'completed')} />
                        </div>

                        {/* Pending Tasks */}
                        <div className="mb-3">
                            <div className='mt-2 d-flex'>
                                <h6 className='mt-1'>Pending Tasks</h6>
                                <AddButton onClick={() => { setShowModal(true); setTaskType('pending'); }} lableName="+Add Task" />
                            </div>
                            <TaskBox taskList={pendingTasks} onRemove={(index) => handleTaskRemove(index, 'pending')} />
                        </div>

                        {/* Incidents/Notes */}
                        <div className="mb-3">
                            <h6 htmlFor="incidentsNotes" className="form-label">Incidents/Notes:</h6>
                            <textarea
                                className="form-control"
                                id="incidentsNotes"
                                rows="3"
                                value={incidentsNotes}
                                onChange={(e) => setIncidentsNotes(e.target.value)}
                            />
                        </div>

                        <div className="d-flex">
                            <SubmitButton onClick={handleSubmit} lableName='Submit'/>
                            <ClearButton onClick={clearForm} />
                        </div>
                    </form>
                </div>
            </div>

            {/* Task Modal */}
            <TaskModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSubmit={handleTaskSubmit}
            />
        </div>
    );
}
