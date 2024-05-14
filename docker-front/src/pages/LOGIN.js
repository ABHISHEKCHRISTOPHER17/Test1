import React, { useState } from 'react';
import LoginEmpId from "../components/LoginEmpId";
import LoginPassword from "../components/LoginPassword";
import LoginEmpIdError from "../components/LoginEmpIdError";
import "./LOGIN.css";


const LOGIN = () => {
  const [activeComponent, setActiveComponent] = useState("LoginEmpId");
  const [firstName, setFirstName] = useState("");
  const [empId, setempId] = useState("");
  return (
    <div className="login-1">
      <img
        className="login-1-background-icon"
        alt=""
        src="/login-1--background@2x.png"
      />
      <section className="logo-parent">
        <div className="logo">
          <img
            className="torry-harris-integration-solut-icon"
            loading="lazy"
            alt=""
            src="/torryharrisintegrationsolutionslogo-600-1@2x.png"
          />
        </div>
        <div className="skillmatrix-2-wrapper">
          <img
            className="skillmatrix-2-icon"
            loading="lazy"
            alt=""
            src="/skillmatrix-2.svg"
          />
        </div>
      </section>
      <section className="login-1-inner">
      {activeComponent === "LoginEmpId" && <LoginEmpId setActiveComponent={setActiveComponent}  setFirstName={setFirstName} setempId={setempId} />}
      {activeComponent === "LoginPassword" && <LoginPassword setActiveComponent={setActiveComponent} firstName={firstName} empId={empId} />} 
      {activeComponent === "LoginEmpIdError" && <LoginEmpIdError setActiveComponent={setActiveComponent}/>}
      </section>
    </div>
  );
};

export default LOGIN;
