"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginButton, ClearButton } from "./components/formItems/buttons";
import Spinner from "./components/other/other";
import { SuccessModal, WelcomeModal, CreateSuperModal } from "./components/modals/modals"; // Import the new modal
import { loginUser, checkUsers, createSuper } from "@/api/session"; // Import the createSuper API
import './page.css';

export default function Home() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const [showSpinner, setShowSpinner] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [redirectAfterSuccess, setRedirectAfterSuccess] = useState(false)

  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showSuperModal, setShowSuperModal] = useState(false); // State for Super Account Modal

  const [superUsername, setSuperUsername] = useState(''); // Form values for Super Account
  const [superPassword, setSuperPassword] = useState('');
  const [superRetypePassword, setSuperRetypePassword] = useState('');

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Handle login
  const handleLoginClick = async () => {
    setShowSpinner(true);

    const result = await loginUser(username, password); // Call the API function

    setShowSpinner(false); // Hide spinner after login completes

    if (result.success) {
      setSuccessMessage(result.message);
      setRedirectAfterSuccess(true); // Set the redirection flag when login is successful
      setShowSuccessModal(true); // Show success modal
    } else {
      setErrorMessage(result.message); // Show error message if login fails
    }
  };

  const handleClearClick = () => {
    setUsername('');
    setPassword('');
    setShowPassword(false);
    setErrorMessage(null);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);

    if (redirectAfterSuccess) {
      router.replace('/pages/dashboard');
    }
  };

  const handleWelcomeModalContinue = () => {
    setShowWelcomeModal(false);
    setShowSuperModal(true); // Show Super Account modal after welcome modal
  };

  const handleSuperModalSubmit = async () => {
    if (!superUsername || !superPassword || !superRetypePassword) {
      setErrorMessage("All fields are required");
      return;
    }
    if (superPassword !== superRetypePassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    const result = await createSuper(superUsername, superPassword); // Call createSuper API

    if (result.success) {
      setSuccessMessage(result.message);
      setShowSuccessModal(true);
      setShowSuperModal(false); // Hide Super Modal after success
    } else {
      setErrorMessage(result.message); // Show error message if account creation fails
    }
  };

  // useEffect to check if users exist on component load
  useEffect(() => {
    const checkForUsers = async () => {
      const usersExist = await checkUsers(); // Call checkUsers API

      if (!usersExist) {
        setShowWelcomeModal(true); // Show Welcome modal if no users found
      }
    };

    checkForUsers();
  }, []);

  return (
    <>
      {showSpinner && <Spinner />}

      {!showSpinner && (
        <section className="vh-100 d-flex justify-content-center align-items-center">
          <div className="container-fluid">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="container mx-auto col-xl-8 col-md-10 shadow rounded-3 p-5">
                <div className="row">
                  {/* Image section */}
                  <div className="col-xl-6 col-md-5 d-flex justify-content-center align-items-center mb-4 mb-md-0">
                    <img src="idclogo.svg" className="img-fluid" alt="Sample image" />
                  </div>

                  {/* Form section */}
                  <div className="col-xl-6 col-md-6 d-flex justify-content-center align-items-center">
                    <form className="w-75">
                      <div className="d-flex flex-row justify-content-end mt-4 mb-0">
                        <p className="lead fw-bold mb-0">IDC Duty Roster</p>
                      </div>
                      <hr />
                      <div className="d-flex flex-row mt-4">
                        <p className="lead fw-semibold mb-3">Login</p>
                      </div>

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

                      {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}

                      <div className="d-flex flex-row justify-content-end">
                        <ClearButton onClick={handleClearClick} className="m-1" />
                        <LoginButton onClick={(e) => { e.preventDefault(); handleLoginClick(); }} />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <SuccessModal
        show={showSuccessModal}
        message={successMessage}
        onClose={handleSuccessModalClose}
      />

      <WelcomeModal
        show={showWelcomeModal}
        onContinue={handleWelcomeModalContinue}
        onClose={() => setShowWelcomeModal(false)}
      />

      <CreateSuperModal
        show={showSuperModal}
        username={superUsername}
        password={superPassword}
        retypePassword={superRetypePassword}
        validationMessage={errorMessage}
        onUsernameChange={(e) => setSuperUsername(e.target.value)}
        onPasswordChange={(e) => setSuperPassword(e.target.value)}
        onRetypePasswordChange={(e) => setSuperRetypePassword(e.target.value)}
        onSubmit={handleSuperModalSubmit}
        onClose={() => setShowSuperModal(false)}
      />
    </>
  );
}
