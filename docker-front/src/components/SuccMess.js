import "./SuccMess.css";
import { useNavigate } from 'react-router-dom';


const SuccMess = () => {

  const navigate = useNavigate();
  function handleClick(){
    navigate("/login");
  
  }
  

  return (
    <div className="status-message-box">
      <div className="icon-area-wrapper">
        <div className="icon-area">
          <img
            className="check-circle-fill0-wght400-gra-icon1"
            loading="lazy"
            alt=""
            src="/check-circle-fill0-wght400-grad0-opsz24-1.svg"
          />
          <div className="messages-wrapper">
            <div className="messages">
              <div className="password-changed-successfully1">
                Password Changed Successfully.
              </div>
              <div className="log-in-to1">
                Log In to your account to continue.
              </div>
            </div>
          </div>
          <button className="login-button-area1" onClick={handleClick}>
            <div className="log-in-button3">
              <div className="button5ofSucc">Log In</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccMess;
