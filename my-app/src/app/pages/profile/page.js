"use client";
import { SubmitButton } from "@/app/components/formItems/buttons";
import { useState, useEffect } from "react";
// import { fetchUser, updateUserProfile, updatePassword } from "@/api/user"; 

export default function Profile() {
    const [user, setUser] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        role: ''
    });

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    

    // Handle updating user profile (username, first name, last name, email)
    const handleUpdateProfile = async () => {
        const result = await updateUserProfile({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        });

        if (result.success) {
            setSuccessMessage('Profile updated successfully');
            setErrorMessage(null);
        } else {
            setErrorMessage(result.message);
            setSuccessMessage(null);
        }
    };

    // Handle updating password
    const handleUpdatePassword = async () => {
        if (newPassword !== confirmNewPassword) {
            setErrorMessage('New passwords do not match');
            return;
        }

        const result = await updatePassword(currentPassword, newPassword);
        if (result.success) {
            setSuccessMessage('Password updated successfully');
            setErrorMessage(null);
            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        } else {
            setErrorMessage(result.message);
            setSuccessMessage(null);
        }
    };
    return (
        <div className="container p-2">
    
            <h5>My Profile</h5>
            {/* Success or error messages */}
            {successMessage && <div className="text-success mb-3">{successMessage}</div>}
            {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
            <div className="d-flex flex-column flex-lg-row">
                {/* User Profile Form */}
                <div className="col-lg-6 col-12 shadow p-4 me-lg-2 mb-3 mb-lg-0">
                    <h6>Update Profile</h6>
                    <div className="form-group mb-3">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label>First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={user.firstName}
                            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label>Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={user.lastName}
                            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label>Role</label>
                        <input
                            type="text"
                            className="form-control"
                            value={user.role}
                            disabled
                        />
                    </div>
                    <SubmitButton
                        onClick={handleUpdateProfile}
                        lableName="Update Profile"
                    />
                </div>

                {/* Password Update Form */}
                <div className="col-lg-6 col-12 shadow p-4">
                    <h5>Update Password</h5>
                    <div className="form-group mb-3">
                        <label>Current Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label>New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label>Confirm New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                        />
                    </div>
                    <SubmitButton
                        onClick={handleUpdatePassword}
                        lableName="Update Password"
                    />
                </div>
            </div>
        </div>
    );
}
