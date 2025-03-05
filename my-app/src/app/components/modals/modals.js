"use client"
import { useState } from 'react';
import { CancelButton, ContinueButton, OkButton, SubmitButton } from "../formItems/buttons";

export function SuccessModal({ show, message, onClose }) {
  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content shadow-lg">
          <div className="modal-header bg-success text-white">
            <h5 className="modal-title">Success</h5>
          </div>
          <div className="modal-body text-center">
            <img src="/formicons/tick.svg" alt="Success" className="mb-3" style={{ width: "50px" }} />
            <p>{message}</p>
          </div>
          <div className="modal-footer justify-content-center">
            <button type="button" className="btn btn-primary" onClick={onClose}>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WelcomeModal({ show, onContinue, onClose }) {
  return (
    <div className={`modal fade ${show ? 'show' : ''}`} id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" style={{ display: show ? 'block' : 'none', backdropFilter: 'blur(5px)', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header d-flex justify-content-between">
            <h5 className="modal-title" id="exampleModalLongTitle">Welcome to the IDC Duty Roster</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>No users were found.
              First setup database with admin privilege to access the web portal. Click continue to proceed.</p>
          </div>
          <div className="modal-footer">
            <ContinueButton
              onClick={onContinue}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ConfirmModal({ show, title, message, onConfirm, onCancel }) {
  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content shadow-lg">
          <div className="modal-header justify-content-between">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="close" aria-label="Close" onClick={onCancel}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer justify-content-center">
            <CancelButton
              onClick={onCancel}
            />
            <OkButton
              onClick={onConfirm}
            />
          </div>
        </div>
      </div>
    </div>
  );
}


export function CreateSuperModal({ show, username, password, retypePassword, validationMessage, onUsernameChange, onPasswordChange, onRetypePasswordChange, onSubmit, onClose }) {
  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content shadow-lg">
          <div className="modal-header justify-content-between">
            <h5 className="modal-title">Create Super Account</h5>
            <button type="button" className="close" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p className="text-danger">{validationMessage}</p>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="superUsername">Username</label>
              <input
                type="text"
                id="superUsername"
                className="form-control form-control-lg"
                placeholder="Enter username"
                value={username}
                onChange={onUsernameChange}
              />
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="superPassword">Password</label>
              <input
                type="password"
                id="superPassword"
                className="form-control form-control-lg"
                placeholder="Enter password"
                value={password}
                onChange={onPasswordChange}
              />
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="superRetypePassword">Retype Password</label>
              <input
                type="password"
                id="superRetypePassword"
                className="form-control form-control-lg"
                placeholder="Retype password"
                value={retypePassword}
                onChange={onRetypePasswordChange}
              />
            </div>
          </div>
          <div className="modal-footer justify-content-center">
            <SubmitButton
              onClick={onSubmit}
              lableName='Create'
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TaskModal({ show, onClose, onSubmit }) {
  const [circuitId, setCircuitId] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleSubmit = () => {
    onSubmit({ circuitId, taskDescription });

    setCircuitId('');
    setTaskDescription('');
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content shadow-lg">
          <div className="modal-header justify-content-between">
            <h5 className="modal-title">Add New Task</h5>
            <button type="button" className="close" aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="circuitId">Circuit ID</label>
              <input
                type="text"
                id="circuitId"
                className="form-control"
                placeholder="Enter Circuit ID"
                value={circuitId}
                onChange={(e) => setCircuitId(e.target.value)}
              />
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="taskDescription">Task Description</label>
              <textarea
                id="taskDescription"
                className="form-control"
                rows="3"
                placeholder="Enter Task Description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer justify-content-center">
            <SubmitButton onClick={handleSubmit} lableName='Add' />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SessionTimeout({ show, onClose }) {
  if (!show) return null;

  const modalBackdropStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
    zIndex: 1040, // Ensure it's behind the modal
  };

  const modalDialogStyle = {
    zIndex: 1050, // Modal z-index, ensure it's on top of the backdrop
  };

  return (
    <>
      {/* Background overlay */}
      <div style={modalBackdropStyle}></div>

      <div className="modal show d-block" tabIndex="-1" role="dialog" style={modalDialogStyle}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content shadow-lg">
            <div className="modal-header bg-secondary text-white">
              <h5 className="modal-title">Session Timed Out</h5>
            </div>
            <div className="modal-body text-center">
              <img
                src="/formicons/timeout.svg"
                alt="Timeout"
                className="mb-3"
                style={{ width: "50px" }}
              />
              <p>Please Login Again</p>
            </div>
            <div className="modal-footer justify-content-center">
              <button
                type="button"
                className="btn btn-primary"
                onClick={onClose}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
