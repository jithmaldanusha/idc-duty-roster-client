"use client"
import { useState, useRef, useEffect } from "react";

export default function TaskCard({ task, onRemove }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const cardRef = useRef(null);

    // Close tooltip when clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cardRef.current && !cardRef.current.contains(event.target)) {
                setIsExpanded(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [cardRef]);

    // Function to toggle the tooltip/expanded view
    const toggleExpand = () => {
        setIsExpanded((prevState) => !prevState);
    };

    // Truncate long descriptions for the card view
    const truncateTaskDescription = (description, length) => {
        return description?.length > length ? description.substring(0, length) + "..." : description;
    };

    // Check if task exists before rendering
    if (!task) {
        return null;
    }

    return (
        <div className="card mb-3 mt-3 shadow-lg" ref={cardRef}>
            <div
                className="card-body border rounded-2 d-flex justify-content-between align-items-center"
                onClick={toggleExpand}  // Click to expand or collapse the tooltip
                style={cardbodyStyles}
            >
                <div>
                    <strong>Circuit ID:</strong> <span className="text-dark">{task.circuitId}</span>  <br />
                    {/* Truncated task description */}
                    <strong>Task:</strong> {truncateTaskDescription(task.taskDescription, 15)}
                </div>
                <button
                    className="btn btn-danger btn-sm shadow"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent closing tooltip when removing
                        onRemove();
                    }}
                >
                    &times;
                </button>
            </div>

            {/* Tooltip content displayed when the card is expanded */}
            {isExpanded && (
                <div className="tooltip-content shadow mt-1 w-75 border rounded p-3" style={tooltipStyles}>
                    {task.taskDescription} {/* Full task description */}
                </div>
            )}
        </div>
    );
}

const cardbodyStyles = {
    cursor: "pointer",
    backgroundColor: "#d1d1d1",
}

const tooltipStyles = {
    position: "absolute",
    top: "100%",  // Below the card
    left: 0,
    width: "100%",
    zIndex: 10,
    backgroundColor: "white",
};

