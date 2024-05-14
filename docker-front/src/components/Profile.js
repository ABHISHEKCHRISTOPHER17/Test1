import { Button } from "@mui/material";
import { useState } from "react";
import "./Profile.css";

const Profile = ({ onNextClick }) => {
  const [level, setLevel] = useState("");
  const [account, setAccount] = useState("");
  const [businessUnit, setBusinessUnit] = useState("");
  const [baseBranch, setBaseBranch] = useState("");
  const [domain, setDomain] = useState("");
  const [area, setArea] = useState("");
  const [error, setError] = useState(false);

  const handleNextClickbt = () => {
    if (!level || !account || !businessUnit || !baseBranch || !domain || !area) {
      
      setError(true);
    } else {
      setError(false);
      onNextClick({ level, account, businessUnit, baseBranch, domain, area });
    }
  };
  return (
    <div className="profile-form">
      <div className="form-fields">
        <div className="complete-your-profile-parent">
          <h1 className="complete-your-profile">Complete Your Profile</h1>
          <h3 className="welcome-take-a">
            Welcome! Take a moment to fill out your profile and enjoy the full
            range of functionalities available to you!<br></br>
            <br></br>
            <b>Enter detials carefully you can't change again</b>
          </h3>
        </div>
      </div>
      <div className="divider">
        <div className="separator" />
      </div>
      <form className="inputs-parent">
        <div className="inputs">
          <div className="input-labels">
            <div className={`input-fields `}>
              <div className="entry-fields">
                <div className="data-labels">
                  <input 
                    type="text" 
                    className={`input-field ${!level && error ? 'error' : ''}`} 
                    placeholder="Enter Level" 
                    value={level} 
                    onChange={(e) => setLevel(e.target.value)} 
                  />
                </div>
              </div>
            </div>
            <div className={`input-fields1 `}>
              <div className="input-fields-inner">
                <div className="enter-account-wrapper">
                  <div className="enter-account">
                    <input 
                      type="text" 
                      className={`input-field ${!account && error ? 'error' : ''}`} 
                      placeholder="Enter Account"
                      value={account} 
                      onChange={(e) => setAccount(e.target.value)} 
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={`input-fields2 `}>
              <div className="input-fields-child">
                <div className="enter-business-unit-wrapper">
                  <div className="enter-business-unit-container">
                    <input 
                      type="text" 
                      className={`input-field ${!businessUnit && error ? 'error' : ''}`} 
                      placeholder="Enter Business Unit"
                      value={businessUnit} 
                      onChange={(e) => setBusinessUnit(e.target.value)} 
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={`input-fields3 `}>
              <div className="frame-div">
                <div className="enter-base-branch-wrapper">
                  <div className="enter-base-branch-container">
                    <input 
                      type="text" 
                      className={`input-field ${!baseBranch && error ? 'error' : ''}`} 
                      placeholder="Enter Base Branch"
                      value={baseBranch} 
                      onChange={(e) => setBaseBranch(e.target.value)} 
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={`input-fields4 `}>
              <div className="input-fields-inner1">
                <div className="enter-domain-wrapper">
                  <div className="enter-domain">
                    <input 
                      type="text" 
                      className={`input-field ${!domain && error ? 'error' : ''}`} 
                      placeholder="Enter Domain"
                      value={domain} 
                      onChange={(e) => setDomain(e.target.value)} 
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={`input-fields5 `}>
              <div className="input-fields-inner2">
                <div className="enter-area-wrapper">
                  <div className="enter-area">
                    <input 
                      type="text" 
                      className={`input-field ${!area && error ? 'error' : ''}`} 
                      placeholder="Enter Area"
                      value={area} 
                      onChange={(e) => setArea(e.target.value)} 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="button-area">
          {/* <Button
            className="inside"
            disableElevation={true}
            variant="outlined"
            sx={{
              textTransform: "none",
              color: "#1b1b1b",
              fontSize: "15.8",
              borderColor: "#888",
              borderRadius: "21.53433609008789px",
              "&:hover": { borderColor: "#888" },
            }}
          >
            Go Back
          </Button> */}
          <Button
            className="inside1ofProfile"
            disableElevation={true}
            variant="contained"
            sx={{
              textTransform: "none",
              color: "#fff",
              fontSize: "15.8",
              background: "linear-gradient(270deg, #1456ff, #5013ff)",
              borderRadius: "21.53433609008789px",
              "&:hover": {
                background: "linear-gradient(270deg, #1456ff, #5013ff)",
              },
              height: 43.1,
            }}
            onClick={handleNextClickbt}
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
