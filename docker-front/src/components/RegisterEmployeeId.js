import InputStructure from "./InputStructure";
import FieldRows from "./FieldRows";
import React, { useState } from 'react';
import "./RegisterEmployeeId.css";
import "./FieldRows.css";

const EmployeeId = ({ setActiveComponent,setEmail,setempId }) => {
  const [email, setemail] = useState('');
  const [id, setid] = useState('');
  const [showemailErrorMessage, setShowemailErrorMessage] = useState(false);
  const [showEmpIdError, setShowEmpIdError] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setemail(value);
  }
  function toNext(e){
    e.preventDefault();
    // if ( email.trim() === '' || !email.includes('@thbs.com') ||id.trim() ==="") {
      if ( email.trim() === '' || !email.includes('@gmail.com') ||id.trim() ==="") {
      
      setShowemailErrorMessage(( email.trim() === '' || !email.includes('@gmail.com')));
      setShowEmpIdError(id.trim() ==="");
    } else {
      setempId(id);
      setEmail(email);
      setActiveComponent("RegisterNameEntry");
    }
  }
  


  return (
    <div className="input-field-area">
      <InputStructure />
      <div className="separator-wrapper">
        <div className="separator" />
      </div>
      <form className="form" onSubmit={toNext}>
        <div className="input-fields-area">
          <FieldRows
            enterEmployeeID="Enter Employee ID"
            placeholderRowPlaceholder="Employee ID"
            setchange={setid}
            error={showEmpIdError}
          />

        <div className="field-rows">
        <div className="field-labels-row">
        <div className="enter-employee-id">Enter Your Email</div>

        </div>
        <input
        className={`placeholder-row ${showemailErrorMessage ? 'error' : ''}`}
        placeholder= "Email"
        type="text"
        onChange={handleInputChange} 
        error={showemailErrorMessage}
      />
       {showemailErrorMessage && (
              <div className="error-message">Enter  Email</div>
            )}
    </div>  
        </div>
        <button className="log-in"   >
          <div className="button" type="submit" >Next</div>
        </button>
      </form>
    </div>
  );
};

export default EmployeeId;
