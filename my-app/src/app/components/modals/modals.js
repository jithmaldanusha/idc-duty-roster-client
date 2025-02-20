import { ContinueButton, SubmitButton } from "../formItems/buttons";

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
            <SubmitButton onClick={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
