import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import './ResetEmail.css';

const EmailComp = ({ handleNext }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError(''); // Clear any previous errors when typing in the email field
  };

  const handleVerification = async () => {
    setLoading(true);
    try {
      // Check if the entered email is not empty
      if (email.trim() === '') {
        setError('Please enter a valid email address.');
        return;
      }

      // Proceed to send the reset password link
      const response = await axios.post('http://172.18.4.217:8080/email',  {email });
      console.log("asf44asf");
      if (response.status ===200) {
        console.log("asfasf");
        handleNext(); // Proceed to the next component
      } else {
        setError(response.data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.log(error);
      setError('An error occurred. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="input-container">
      <div className="input-items">
        <div className="reset-button-area-parent">
          <div className="reset-button-area">
            <div className="reset-password-wrapper">
              <b className="reset-password">Reset Password</b>
            </div>
          </div>
          <div className="please-enter-your">
            Please enter your email address to request password reset.
          </div>
        </div>
      </div>
      <div className="dividerofReset" />
      <div className="input-fieldsofReset">
        <div className="email-field">
          <div className="email-label-area">
            <div className="email-label">
              <div className="enter-your-email">Enter your Email</div>
            </div>
            <input
              className="input"
              placeholder="jane_cooper@thbs.com"
              type="text"
              value={email}
              onChange={handleChange}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button
            className="login-button-area"
            onClick={handleVerification}
            disabled={loading || email.trim() === ''} // Disable button during loading or if email is empty
          >
            <div className="log-in-button">
              <div className="buttonofResetEmail">{loading ? 'Loading...' : 'Next'}</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailComp;
