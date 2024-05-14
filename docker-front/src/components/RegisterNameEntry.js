import InputStructure from "./InputStructure";
import React, { useState } from 'react';
import FieldRows from "./FieldRows";
import "./RegisterNameEntry.css";

const NameEntry = ({ setActiveComponent,setfirstName,setlastName}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const handleNextClick = (e) => {
    e.preventDefault();
    if (firstName.trim() === '') {
      setFirstNameError(true);
    }
    //  else {
    //   setFirstNameError(false);
    // }

    if (lastName.trim() === '') {
      setLastNameError(true);
    } 
    // else {
    //   setLastNameError(false);
    // }

    if (firstName.trim() !== '' && lastName.trim() !== '') {
      setfirstName(firstName);
      setlastName(lastName);
      setActiveComponent("RegisterPassword");
    }
  };
  return (
    <div className="form-container1">
      <InputStructure />
      <div className="divider">
        <div className="divider-child" />
      </div>
      <form className="form1" onSubmit={handleNextClick}>
        <div className="input-fields-grid">
          <FieldRows
            enterEmployeeID="Enter First Name"
            placeholderRowPlaceholder="First Name"
            setchange={setFirstName}
            error={firstNameError}

          />
          <FieldRows
            enterEmployeeID="Enter Last Name"
            placeholderRowPlaceholder="Last Name"
            setchange={setLastName}
            error={lastNameError} 
          />
        </div>
        <button className="log-in1"  >
          <div className="button1"type="submit">Next</div>
        </button>
      </form>
    </div>
  );
};

export default NameEntry;
