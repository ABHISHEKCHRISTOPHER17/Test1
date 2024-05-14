import "./LoginPassword.css";
import { getCookie } from "./GetCookies.js";
import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const FrameComponent1 = ({ setActiveComponent, firstName, empId }) => {
  const [passWord, setpassWord] = useState("");
  const [rememberMe, setRememberMe] = useState(false);


  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // useEffect(() => {
  //   const storedRememberMe = localStorage.getItem('rememberMe');
  //   if (storedRememberMe) {
  //     setRememberMe(JSON.parse(storedRememberMe));
  //   }
  // }, []);

  function onForgotPasswordClick() {
    navigate("/resetpassword");
  }
  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setRememberMe(isChecked);
    // console.log(isChecked);
    // localStorage.setItem('rememberMe', JSON.stringify(isChecked));
  };
  function setCookie(name, value, days) {
    let expires = "";

    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();

    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  


  // useEffect(() => {
  //   // Retrieve the token from the cookie when the component mounts
  //   const storedToken = getCookie(cookieName);
  //   setCookieValue(storedToken);
  // }, [cookieName]);



  const onLoginClick = useCallback(async (e) => {

    try {
      e.preventDefault();
      const response = await axios.post(`http://172.18.4.217:8080/login`, {
        empId: empId,
        password: passWord,
        rememberMe: rememberMe
      });

      const { token } = response.data.body;
      const { statusCodeValue } = response.data;

      if (rememberMe) {
        setCookie("token", token, 15);
      }
      else {
        setCookie("token", token, .5);
      }


      // if (response && response.data) {
      //   const { token } = response.data.body;
      //   const { statusCodeValue } = response.data;

      //   console.log("Token:", token);
      //   console.log("Status Code Value:", statusCodeValue);
      // localStorage.setItem('token', token); 

      // } else {
      //   console.log("empty object");
      // }
      // console.log("Token:", token);

      let storedToken = getCookie();
      console.log("Stored token:", storedToken);
      console.log("Status Code Value:", statusCodeValue);
      if (statusCodeValue === 400) {
        alert("Incorrect Password!");
        setpassWord("");
      }
    } catch (error) {
      if (statusCodeValue === 404) {
        // Handle 404 Not Found error by toggling to a different component
        // setActiveComponent("Component3");
      } else if (error.response && error.response.status === 400) {
        alert("Incorrect Password!");
        setpassWord("");
      }
      else {
        setError(error.response.data.message);
      }
    }
  }, [empId, setActiveComponent, firstName, passWord]);

  return (
    <div className="frame-groupofPassword">
      <div className="enteryour-password-password-wrapper">
        <div className="enteryour-password-password">
          <h3 className="hello-there">Hello there,</h3>
          <h1 className="first-nam">{firstName}</h1>
          <div className="log-in-to1">Log in to your account</div>
        </div>
      </div>
      <div className="forgot-password-link-wrapper">
        <div className="forgot-password-link" />
      </div>
      <div className="dynamicsection1">
        <form  className="login-background-color" onSubmit={onLoginClick}>
          <div className="logo-image">
            <div className="text1">
              <div className="enter-your-password">Enter your Password</div>
            </div>
            <input className="input1" placeholder="Password" type="password" value={passWord}
              onChange={(e) => setpassWord(e.target.value)} />
          </div>

          <button className="nextbuttin1" >
            <div className="log-in-button1">
              <div className="button1" type="submit" >Log In</div>
            </div>
          </button>
        
        </form>
        <div className="bottomtext1">
          <div className="remember-me-label">
            {/* <div className="remember-me-label-child" /> */}
            <div className="remember-me"> <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleCheckboxChange}
              />
              Remember Me
            </label>
            </div>
          </div>
          <div className="forgot1">
            <div className="forgot-password1" onClick={onForgotPasswordClick}>Forgot Password?</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent1;
