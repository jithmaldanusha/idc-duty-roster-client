"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginButton, ClearButton } from "./components/formItems/buttons";
import Spinner from "./components/other/other";
import SuccessModal from "./components/modals/modals";
import './page.css';

export default function Home() {
  const router = useRouter();

  // State for login form
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  // State for super-admin modal
  const [showModal, setShowModal] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State for spinner and success modal
  const [showSpinner, setShowSpinner] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Handle login
  const handleLoginClick = async () => {
    try {
      //setShowSpinner(true); 
      router.push('/pages/dashboard')
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Failed to log in. Please try again.');
    } 
  };

  // Clear login inputs
  const handleClearClick = () => {
    setUsername('');
    setPassword('');
    setShowPassword(false);
    setErrorMessage(null);
  };

  // Handle super-admin setup
  const handleProceedClick = async () => {
    if (adminPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      await CreateSuperAdmin({ username: adminUsername, password: adminPassword });
      setShowModal(false); // Hide modal on success
      alert("Account created successfully!");
    } catch (error) {
      console.error("Error creating super admin:", error);
      setErrorMessage("Failed to create super-admin account. Please try again.");
    }
  };

  // Close success modal and redirect
  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    router.push('/dashboard'); // Redirect to dashboard
  };

  return (
    <>
      {/* Spinner during loading */}
      {showSpinner && <Spinner />}

      {/* Main Login Section */}
      {!showSpinner && (
        <section className="vh-100 d-flex justify-content-center align-items-center">
          <div className="container-fluid">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="container mx-auto col-xl-8 col-md-10 d-flex shadow rounded-3">
                {/* Image Section */}
                <div className="col-xl-6 col-md-5 d-flex justify-content-center align-items-center" style={{ height: "70vh" }}>
                  <img src="idclogo.svg" className="img-fluid" alt="Sample image" />
                </div>

                {/* Form Section */}
                <div className="col-xl-5 col-md-6 d-flex justify-content-center align-items-center">
                  <form className="w-75">
                    <div className="d-flex flex-row justify-content-end mt-4 mb-0">
                      <p className="lead fw-bold mb-0">IDC Duty Roster</p>
                    </div>
                    <hr />
                    <div className="d-flex flex-row mt-4">
                      <p className="lead fw-semibold mb-3">Login</p>
                    </div>

                    {/* Username input */}
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="usernameInput">Username</label>
                      <input
                        type="text"
                        id="usernameInput"
                        className="form-control form-control-lg"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>

                    {/* Password input */}
                    <div className="form-outline mb-3 position-relative">
                      <label className="form-label" htmlFor="passwordInput">Password</label>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="passwordInput"
                        className="form-control form-control-lg"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <img
                        src="/formIcons/pwdtoggler.svg"
                        className={`password-toggle-icon ${showPassword ? 'active' : ''}`}
                        onClick={togglePasswordVisibility}
                        alt="Toggle Password Visibility"
                      />
                    </div>

                    {/* Error Message */}
                    {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}

                    {/* Buttons */}
                    <div className="d-flex flex-row justify-content-end">
                      <ClearButton onClick={handleClearClick} className="m-1" />
                      <LoginButton onClick={(e) => { e.preventDefault(); handleLoginClick(); }} />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Success Modal */}
      <SuccessModal
        show={showSuccessModal}
        message={successMessage}
        onClose={handleSuccessModalClose}
      />

      {/* Super-Admin Setup Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content shadow-lg">
              <div className="modal-header">
                <img src="/idclogo.svg" className="img-fluid" />
              </div>
              <div className="modal-body">
                <h6>Welcome DCIM.</h6>
                <p>Setup super-admin with new username and password.</p>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter username"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={handleProceedClick}>Proceed</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
