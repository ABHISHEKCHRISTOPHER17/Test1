// ResetPass.js
 
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./ResetPass.css";
import SuccMess from "./SuccMess"; // Import the SuccMess component
 
const ResetPass = ({ setShowSuccessMessage }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false); // State to track password reset success
 
  useEffect(() => {
    if (!token) {
      // Token not found in URL, handle error or redirect to another page
      console.error("Token not found in URL.");
      // Example: Redirect to homepage
      window.location.href = "/";
    }
  }, [token]);
 
  console.log(setShowSuccessMessage)
  const handleResetPassword = async (e) => {
    e.preventDefault();
 
    if (!password || !confirmPassword) {
      setErrorMessage("Please enter both password and confirm password.");
      return;
    }
 
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please try again.");
      return;
    }
 
    try {
      // Make POST request to reset password API
      const response = await axios.post(
        "http://172.18.4.217:8080/resetpassword",
        { password, token }
      );
 
 
      // Handle successful password reset
      console.log("Password reset successful:", response.data);
      setResetSuccess(true);
      setShowSuccessMessage(true);
      console.log(setShowSuccessMessage) // Assuming you have a prop to show success message
    } catch (error) {
      // Handle error
      console.error("Password reset failed:", error);
      setErrorMessage("Password reset failed. Please try again.");
    }
  };
 
 
  return (
    <div className="password-instruction">
    {/* {errorMessage && <div className="error-message">{errorMessage}</div>} */}
      <div className="input-fields-Pass">
        <div className="input-field-labels">
          <div className="enter-password-label">
            <div className="confirm-password-label">
              <p className="reset-password2">Reset Password</p>
            </div>
          </div>
          <div className="choose-a-strong1">
            Choose a strong password to secure your account
          </div>
        </div>
      </div>
      <div className="password-instruction-inner">
        <div className="frame-child" />
      </div>
      <form className="password-input-fields-parent" onSubmit={handleResetPassword}>
        <div className="password-input-fields">
          <div className="input-field-titles">
            <div className="field-title-labels">
              <div className="enter-password1">Enter Password</div>
            </div>
            <input
              className="input-field-titles-child"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-field-titles1">
            <div className="confirm-password-container">
            <div className="field-title-labels1">
              <div className="confirm-password1">Confirm Password</div>
              </div>
              <input
                className="input-field-titles-item"
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
        <button className="log-in1" type="submit">
          <div className="button4">Reset</div>
        </button>
      </form>
      {/* {resetSuccess && <SuccMess />} */}
    </div>
  );
};
 
export default ResetPass;