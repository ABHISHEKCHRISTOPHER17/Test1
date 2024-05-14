import React,{ useCallback, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "./LoginEmpId.css";


const FrameComponent = ({ setActiveComponent , setFirstName ,setempId}) => {
  const [employeeId, setEmployeeId] = useState("");
 
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  const onNextButtinClick = useCallback(async (e) => {
 
    try {
      // console.log("sdad")
      e.preventDefault();
      const response = await axios.get(`http://172.18.4.217:8080/getusername/${employeeId}`);
      if (response && response.data) {
        const firstName = response.data; 
        // console.log(firstName);
        // console.log(employeeId);
        setempId(employeeId);
        setFirstName(firstName);
        setActiveComponent("LoginPassword");
      } else {
        console.log("empty object");
      }
    } catch (error) {
      if (error.response && (error.response.status === 404 ||error.response.status === 401) ){

      setActiveComponent("LoginEmpIdError");
    } else {
      setError(error.response?.data?.message || "An error occurred");
    }
    }
  }, [employeeId, setActiveComponent, setFirstName,setempId]);

  function onRegisterContainerClick () {
    navigate("/register");
  }
  function onForgotPasswordClick () {
    navigate("/resetpassword");
  }

  return (
    <div className="frame-parentofLogin">
      <div className="frame-wrapper">
        <div className="welcome-to-parent">
          <h2 className="welcome-to">Welcome to</h2>
          <img
            className="skillmatrix-1-icon"
            loading="lazy"
            alt=""
            src="/skillmatrix-1.svg"
          />
          <div className="log-in-to">Log in to your account</div>
        </div>
      </div>
      <div className="line-wrapper">
        <div className="frame-child" />
      </div>
      <div className="dynamicsection">
        <form className="enter-your-employee-i-d" onSubmit={onNextButtinClick}>
      
          <div className="text-parent">
            <div className="text">
              <div className="enter-your-employee">Enter your Employee ID</div>
            </div>
            <input className="input" placeholder="Employee ID" type="text" value={employeeId} 
              onChange={(e) => setEmployeeId(e.target.value)}  />
          </div>
          <button className="nextbuttin" > {/* onClick={onNextButtinClick} */}
            <div className="log-in-button">
              <div className="button" type="submit" >Next</div>
            </div>
          </button>
        
        </form>
        <div className="bottomtext">
          <div className="register" >
            <div className="are-you-a-container">
              Are You a New User?  
              <span className="register1" onClick={onRegisterContainerClick}>Register</span>
            </div>
          </div>
          <div className="forgot">
            <div className="forgot-password"  onClick={onForgotPasswordClick}>Forgot Password?</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent;
