import React, { useState } from "react";
import ResetEmail from "../components/ResetEmail";
import ResetEmailSent from "../components/ResetEmailSent";
import "./ResetPassword.css";

const EmailPage = () => {
  const [showEmailComp, setShowEmailComp] = useState(true);

  const handleNext = () => {
    setShowEmailComp(!showEmailComp);
  };

  const handleEmailSent = () => {
    console.log("Email sent successfully!");
    // You can add more logic here, such as navigating to another page
  };

  return (
    <div className="emailpage">
      <img
        className="login-1-background-icon"
        alt=""
        src="/login-1--background@2x.png"
      />
      <section className="login-structure">
        <div className="logo">
          <img
            className="torry-harris-integration-solut-icon"
            loading="lazy"
            alt=""
            src="/torryharrisintegrationsolutionslogo-600-1@2x.png"
          />
        </div>
        <div className="content-area">
          <img
            className="skillmatrix-2-icon"
            loading="lazy"
            alt=""
            src="/skillmatrix-2.svg"
          />
        </div>
      </section>
      <section className="input-area">
        {showEmailComp ? (
          <ResetEmail startEmail handleNext={handleNext} handleEmailSent={handleEmailSent} />
        ) : (
          <ResetEmailSent />
        )}
      </section>
    </div>
  );
};

export default EmailPage;
