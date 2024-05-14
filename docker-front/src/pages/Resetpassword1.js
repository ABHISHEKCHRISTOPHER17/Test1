// Resetpassword.js
 
import React, { useState } from "react";
import ResetPass from "../components/ResetPass";
import SuccMess from "../components/SuccMess";
import "./Resetpassword1.css";
 
const Resetpassword = () => {
  // State to manage the display of the success message
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
 
  // Function to handle the display of the success message
  // const handleSuccessMessage = () => {
  //   setShowSuccessMessage(true);
  // };
 
  return (
    <div className="resetpassword">
      <img
        className="login-1-background-icon2"
        alt=""
        src="/login-1--background@2x.png"
      />
      <section className="login-form-container">
        <div className="logo2">
          <img
            className="torry-harris-integration-solut-icon2"
            loading="lazy"
            alt=""
            src="/torryharrisintegrationsolutionslogo-600-1@2x.png"
          />
        </div>
        <div className="skillmatrix-2-wrapper">
          <img
            className="skillmatrix-2-icon2"
            loading="lazy"
            alt=""
            src="/skillmatrix-2.svg"
          />
        </div>
      </section>
 
     
      <section className="password-fields-area">
 
         {!showSuccessMessage  && <ResetPass setShowSuccessMessage={setShowSuccessMessage} />}
        {showSuccessMessage && <SuccMess />}
      </section>
    </div>
  );
};
 
  
 
export default Resetpassword;