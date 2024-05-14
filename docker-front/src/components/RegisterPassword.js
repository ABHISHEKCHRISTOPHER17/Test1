import "./RegisterPassword.css";
import axios from "axios";
import { useState, useCallback } from "react";

function Password({ setActiveComponent, setpassWord, empId, email, firstName, lastName, passWord }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [failed, setFailed] = useState(false);
  const [error, setError] = useState(null);
  const [criteriaMet, setCriteriaMet] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false
  });
  const handleClick = useCallback(async () => {
    try {

      const response = await axios.post(`http://172.18.4.217:8080/register`, {
        empId: empId,
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: passWord
      });
      const { token } = response.data.body;
      const { statusCodeValue } = response.data;
      if (statusCodeValue === 200) {
          console.log("sucess")
          setActiveComponent("RegisterComplete");
        }
        if (statusCodeValue === 400) {
          console.log("sucess")
          alert("user already exist");
          
        }

      // if (response && response.data) {
      //   const { token } = response.data.body;
      //   const { statusCodeValue } = response.data;
      //   console.log(token);
      // } else {
      //   console.log("empty object");
      // }
      // if (statusCodeValue === 200) {
      //   console.log("sucess")
      //   setActiveComponent("Component4");
      // }

    } catch (error) {
       if (error.response.status === 400) {
        alert("user already exist");
       } 
      //  if (error.response.status === 500) {
      //   alert("user's email already exist");
      //  } 
      //  else {
      //   setError(error.response.data.message);
      // }
    }
  }, [setActiveComponent, setpassWord, empId, email, firstName, lastName, passWord]);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Regular expressions to check each criterion
    const lengthRegex = /^.{8,}$/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*]/;

    // Update the criteria met state based on input
    setCriteriaMet({
      length: lengthRegex.test(newPassword),
      uppercase: uppercaseRegex.test(newPassword),
      lowercase: lowercaseRegex.test(newPassword),
      number: numberRegex.test(newPassword),
      specialChar: specialCharRegex.test(newPassword)
    });


    // Show error message if password doesn't meet all conditions
    setShowErrorMessage(!Object.values(criteriaMet).every(criterion => criterion));
  };

  const handleConfirmPasswordChange = (e) => {
    const newPassword = e.target.value;
    setConfirmPassword(newPassword);

    // Check if confirmed password matches the password
    setFailed(newPassword !== password);
    setpassWord(newPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword && Object.values(criteriaMet).every(criterion => criterion)) {
      // Passwords match, you can proceed with registration
      // For now, let's just log a success message
      handleClick();
    } else if (!Object.values(criteriaMet).every(criterion => criterion)) {
      setShowErrorMessage(true);
    } else {
      setFailed(true);
    }
  };
  const handleInputFocus = () => {
    setShowErrorMessage(true);
  };

  const handleInputBlur = () => {
    setShowErrorMessage(false);
  };
  const handleInputFocusCp = () => {
    setFailed(true);
  };

  const handleInputBlurCp = () => {
    setFailed(false);
  };



  return (
    <div className="form-box">
      <div className="form-structure">
        <div className="input-fields1">
          <div className="password-field">
            <div className="confirmation-field">
              <div className="welcome-message-area">
                <b className="welcome-to1">Welcome to</b>
              </div>
              <img
                className="skillmatrix-3-icon1"
                loading="lazy"
                alt=""
                src="/skillmatrix-3.svg"
              />
            </div>
            <div className="register-your-account1">Register your account</div>
          </div>
        </div>
      </div>
      <div className="separator-container">
        <div className="separator1ofRegPass" />
      </div>
      <form className="form2" onSubmit={handleSubmit}>
        <div className="input-and-button-box">
          <div className="field-labels-box">
            <div className="label-headers">
              <div className="enter-password">Enter Password</div>
            </div>
            <input
              className={`field-placeholders ${showErrorMessage ? 'error' : ''}`}
              placeholder="Password"
              type="password" // Changed to password type for security
              onChange={handlePasswordChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
            {showErrorMessage && (<div className="error-message1">
              Password must meet the criteria
              <ul className="one-uppercase-letter-one-lower">
                {!criteriaMet.length && <li >At least 8 characters</li>}
                {!criteriaMet.uppercase && <li >One uppercase letter</li>}
                {!criteriaMet.lowercase && <li >One lowercase letter</li>}
                {!criteriaMet.number && <li >One number</li>}
                {!criteriaMet.specialChar && <li>One special character (!@#$%^&*)</li>}
              </ul></div>
            )}
          </div>
          <div className="field-labels-box1">
            <div className="confirm-password-wrapper">
              <div className="confirm-password">Confirm Password</div>
            </div>
            <input
              className={`field-labels-box-child ${failed ? 'error' : ''}`}
              placeholder="Confirm Password"
              type="password" // Changed to password type for security
              onChange={handleConfirmPasswordChange}
              onFocus={handleInputFocusCp}
              onBlur={handleInputBlurCp}
            />
            {failed && (
              <div className="error-message">Passwords do not match. Please enter the same password in both fields.</div>
            )}
          </div>
        </div>
        <button className="log-in2" type="submit">
          <div className="button2ofRegPass">Confirm</div>
        </button>
        {/* <button type="submit">confirm</button> */}
      </form>
      {/* {(showErrorMessage || failed) && (
        <>
          {failed ? (
            <div className="popup-message02">
              <div className="password-must-be-container02">
                <p className="password-must-be-at-least-8-ch">
                  <span>
                    <span className="password-must">{'Passwords do not match. Please enter the same password in both fields.'}</span>
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <div className="popup-message">
              <div className="password-must-be-container">
                <p className="password-must-be-at-least-8-ch">
                  <span>
                    <span className="password-must">{'Password must be at least 8 characters long and '}</span>
                    <span className="include-at-least"> include at least</span>
                  </span>
                </p>
                <ul className="one-uppercase-letter-one-lower">
                  {!criteriaMet.length && <li className="one-uppercase-letter">At least 8 characters</li>}
                  {!criteriaMet.uppercase && <li className="one-uppercase-letter">One uppercase letter</li>}
                  {!criteriaMet.lowercase && <li className="one-lowercase-letter">One lowercase letter</li>}
                  {!criteriaMet.number && <li className="one-number">One number</li>}
                  {!criteriaMet.specialChar && <li>One special character (!@#$%^&*)</li>}
                </ul>
              </div>
            </div>
          )}
        </>
      )} */}
    </div>
  );
}

export default Password;