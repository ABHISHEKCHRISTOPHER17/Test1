import "./LoginEmpIdError.css";
import { useNavigate } from 'react-router-dom';



const FrameComponent2 = ({ setActiveComponent}) => {
  const navigate = useNavigate();
  function handleClick(){
   navigate("/register");
  }
  

  return (
    
    <div className="contents-wrapper">
      <div className="contents">
        <img
          className="error-fill0-wght400-grad0-opsz-icon"
          loading="lazy"
          alt=""
          src="/error-fill0-wght400-grad0-opsz24-1.svg"
        />
        <div className="textcont">
          <div className="text2">
            <div className="oops-there-was-an-error-parent">
              <div className="oops-there-was">Oops, There was an Error.</div>
              <div className="check-your-employee">
                Check your Employee ID and try again.
              </div>
            </div>
          </div>
          <button className="button2ofLoginError" type= "submit" onClick={()=>{setActiveComponent("LoginEmpId")}}>

              Try Again

          </button>
          <div className="register2" >
            <div className="are-you-a-container1">
              Are You a New User?  
              <span className="register3"  onClick={handleClick}>Register</span>
            </div>
          </div>
        </div>
      </div>
    </div>
   
  );
};

export default FrameComponent2;
