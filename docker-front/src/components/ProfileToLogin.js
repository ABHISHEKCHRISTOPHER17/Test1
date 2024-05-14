import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "./ProfileToLogin.css";

const LoginOptions = () => {
 
    // const history = useHistory(); // Initialize useHistory hook

    const navigate = useNavigate();
  
    // Function to handle login button click
    const handleLoginClick = () => {
      // Navigate to the desired page, replace "/desired-page-path" with the actual path
      // history.push("/desired-page-path");

      navigate('/login');
    };


  return (
    <div className="login-options">
      <div className="status-icon">
        <img
          className="check-circle-fill0-wght400-gra-icon"
          loading="lazy"
          alt=""
          src="/check-circle-fill0-wght400-grad0-opsz24-1.svg"
        />
        <div className="login-prompt">
          <div className="instruction-panel">
            <div className="your-account-has-been-created-parent">
              <div className="your-account-has">
                Your Account Has Been Created!
              </div>
              <div className="log-in-to">
                Log In to your account to continue
              </div>
            </div>
          </div>
          <div>
          <Button
            className="login-button-area"
            disableElevation={true}
            variant="contained"
            sx={{
              textTransform: "none",
              color: "#fff",
              fontSize: "18.2",
              background: "linear-gradient(90deg, #5013ff, #1456ff)",
              borderRadius: "30px",
              "&:hover": {
                background: "linear-gradient(90deg, #5013ff, #1456ff)",
              },
              width: 447.1,
              height: 54,
            }}
            onClick={handleLoginClick}
          >
            Log In
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginOptions;
