
import React, { useState } from 'react';
import RegisterEmployeeId from "../components/RegisterEmployeeId";
import "./REGISTER.css";
import RegisterNameEntry from '../components/RegisterNameEntry';
import RegisterPassword from '../components/RegisterPassword';
import RegisterComplete from '../components/RegisterComplete';


const REGISTER = () => {
  const [activeComponent, setActiveComponent] = useState("RegisterEmployeeId");
  const [empId, setempId] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [passWord, setpassWord] = useState("");


  return (
    <div className="register-1">
      <img
        className="login-1-background-icon"
        alt=""
        src="/login-1--background@2x.png"
      />
      <section className="main-container">
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
      <section className="input-fields">

      {activeComponent === "RegisterEmployeeId" && <RegisterEmployeeId  setActiveComponent={setActiveComponent}  setEmail={setEmail} setempId={setempId} />}
      {activeComponent === "RegisterNameEntry" && <RegisterNameEntry setActiveComponent={setActiveComponent} setfirstName={setfirstName} setlastName={setlastName} />} 
      {activeComponent === "RegisterPassword" && <RegisterPassword setActiveComponent={setActiveComponent} setpassWord={setpassWord} empId={empId} email={email}
      firstName={firstName} lastName={lastName} passWord={passWord}/>}
      {activeComponent === "RegisterComplete" && <RegisterComplete  empId={empId} email={email}firstName={firstName} lastName={lastName}
       passWord={passWord} />} 



     
      </section>
    </div>
  );
};

export default REGISTER;
