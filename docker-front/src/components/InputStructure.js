import "./InputStructure.css";

const InputStructure = () => {
  return (
    <div className="input-structure">
      <div className="input-arrangement">
        <div className="input-grid">
          <div className="form-container">
            <div className="field-labels">
              <b className="welcome-to">Welcome to</b>
            </div>
            <img
              className="skillmatrix-3-icon"
              loading="lazy"
              alt=""
              src="/skillmatrix-3.svg"
            />
          </div>
          <div className="register-your-account">Register your account</div>
        </div>
      </div>
    </div>
  );
};

export default InputStructure;
