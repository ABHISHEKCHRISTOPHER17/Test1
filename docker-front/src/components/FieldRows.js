import "./FieldRows.css";

const FieldRows = ({ enterEmployeeID, placeholderRowPlaceholder, setchange,error}) => {
  


  const handleInputChange = (e) => {
    setchange(e.target.value);
  }


  return (
    <div className="field-rows">
      <div className="field-labels-row">
        <div className="enter-employee-id">{enterEmployeeID}</div>

      </div>
      <input
        className={`placeholder-row ${error ? 'error' : ''}`}
        placeholder={placeholderRowPlaceholder}
        type="text"
        onChange={handleInputChange} // Call handleInputChange on input change
      />
       {/* {error && (
        <div className="error-message">Enter {placeholderRowPlaceholder.toLowerCase()}</div>
      )} */}
    </div>
  );
};

export default FieldRows;
