import "./RegisterComplete.css";
import { useNavigate } from 'react-router-dom';

const AuthInterface = ({empId,email,firstName,lastName,passWord}) => {
  const navigate = useNavigate();
 function handleClick(){

  // console.log(empId);
  // console.log(email);
  // console.log(firstName);
  // console.log(lastName);
  // console.log(passWord);
  const userData = {
    empId,
    email,
    firstName,
    lastName,
    passWord
  };
  // console.log(userData);
  sessionStorage.setItem('userData', JSON.stringify(userData));
  navigate("/complete-profile");
 }
 
  return (
    <div className="auth-interface">
      <div className="auth-status">
        <img
          className="check-circle-fill0-wght400-gra-icon"
          loading="lazy"
          alt=""
          src="/check-circle-fill0-wght400-grad0-opsz24-1.svg"
        />
        <div className="auth-messaging">
          <div className="message-panel">
            <div className="your-account-has-been-created-parent">
              <div className="your-account-has">
                Your Account Has Been Created!
              </div>
              <div className="log-in-to">
                Please Update your profile to procede further
              </div>
            </div>
          </div>
          <button className="login-action" onClick={handleClick}>           
              <div className="button-registor" >Update Profile</div>        
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthInterface;
