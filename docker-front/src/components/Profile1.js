import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import "./Profile1.css";
import axios from "axios";


const Profile1 = ({ onGoBack,onNextClick,profileData }) => {


  const [level, setLevel] = useState(profileData && profileData.level ? profileData.level : "");
  const [account, setAccount] = useState(profileData && profileData.account ? profileData.account : "");
  const [businessUnit, setBusinessUnit] = useState(profileData && profileData.businessUnit ? profileData.businessUnit : "");
  const [baseBranch, setBaseBranch] = useState(profileData && profileData.baseBranch ? profileData.baseBranch : "");
  const [domain, setDomain] = useState(profileData && profileData.domain ? profileData.domain : "");
  const [area, setArea] = useState(profileData && profileData.area ? profileData.area : "");
  

  const [directors, setDirectors] = useState("");
  const [reportingManager, setReportingManager] = useState("");
  const [reportingManagerID, setReportingManagerID] = useState("");
  const [sdm, setSdm] = useState("");
  const [sdmID, setSdmID] = useState("");
  const [domainManager, setDomainManager] = useState("");
  const [error, setError] = useState(false);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve data from sessionStorage
    const storedData = sessionStorage.getItem('userData');
    if (storedData) {
      const userData = JSON.parse(storedData);
      setUserData(userData);
      // Clear sessionStorage to prevent data from persisting beyond this session
      sessionStorage.removeItem('userData');
    }
  }, []);
  // Access individual data properties from userData
  const { empId, email, firstName, lastName, passWord } = userData || {};


  const handleGoBack = () => {
    onGoBack(); 
  };

  const handleSave = async () => {
    if (!directors || !reportingManager || !reportingManagerID || !sdm || !sdmID || !domainManager) {
      setError(true);
     
    } else {
      setError(false);
      const emp_id =empId;
      const name =(firstName+" "+lastName);
      // console.log(name);

      const requestData = {
        email: email,
        name: name,
        password: passWord,
        directors: directors,
        reporting_manager: reportingManager,
        rm_emp_id: reportingManagerID,
        service_delivery_manager: sdm,
        sdm_emp_id: sdmID,
        domain_manager: domainManager,
        role: "USER",
        level:level,
        business_unit:businessUnit,
        account:account,
        base_branch:baseBranch,
        domain:domain,
        area:area
      };
      try {
         console.log(requestData);
        const response = await axios.post(
          `http://172.18.4.236:1111/api/users/${emp_id}/enterData`,
          requestData,
          {
            headers: {
              'Content-Type': 'application/json' // Set content type to JSON
            }
          }
        );
        if (response && response.data) {
          const { token } = response.data;
          // console.log(token);

        } else {
          console.log("empty object");
        } 
        if (response.status === 200){
          onNextClick();
        }
       
      } catch (error) {
        if (statusCodeValue === 400) {
          alert("Incorrect emai!");
        }
        else{
        console.error("Error:", error); // Handle error
      
        }
      }


     
    }
  };
  return (
    <div className="completion-info">
      <div className="completion-info-inner">
        <div className="complete-your-profile-group">
          <h1 className="complete-your-profile1">Complete Your Profile</h1>
          <h3 className="great-job-youre">
            Great job! You’re almost there. Complete your profile now and unlock
            the full potential of your dashboard experience!<br></br>
            <br></br>
            <b>Enter detials carefully you can't change again</b>
          </h3>
        </div>
      </div>
      <div className="separator1">
        <div className="separator-child" />
      </div>
      <form className="management-input">
        <div className="management-form">
          <div className="manager-input-fields">
            <div className="manager-names-input">
              <div className="manager-i-ds-input">
                <div className="management-titles">
                <input 
                    type="text" 
                    className={`input-field ${!directors && error ? 'error' : ''}`} 
                    placeholder="Enter Directors"
                    value={directors}
                    onChange={(e) => setDirectors(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="manager-names-input1">
              <div className="manager-names-input-inner">
                <div className="enter-reporting-manager-wrapper">
                <input 
                      type="text" 
                      className={`input-field ${!reportingManager && error ? 'error' : ''}`}
                      placeholder="Enter Reporting Manager"
                      value={reportingManager}
                      onChange={(e) => setReportingManager(e.target.value)}
                    />
                </div>
              </div>
            </div>
            <div className="manager-names-input2">
              <div className="manager-names-input-child">
                <div className="enter-reporting-manager-id-wrapper">
                <input 
                      type="text" 
                      className={`input-field ${!reportingManager && error ? 'error' : ''}`} 
                      placeholder="Enter Reporting Manager ID"
                      value={reportingManagerID}
                      onChange={(e) => setReportingManagerID(e.target.value)}
                    />
                </div>
              </div>
            </div>
            <div className="manager-names-input3">
              <div className="manager-names-input-inner1">
                <div className="enter-sdm-wrapper">
                <input 
                      type="text" 
                      className={`input-field ${!sdm && error ? 'error' : ''}`}
                      placeholder="Enter SDM"
                      value={sdm}
                      onChange={(e) => setSdm(e.target.value)}
                    />
                </div>
              </div>
            </div>
            <div className="manager-names-input4">
              <div className="manager-names-input-inner2">
                <div className="enter-sdm-id-wrapper">
                <input 
                      type="text" 
                      className={`input-field ${!sdmID && error ? 'error' : ''}`}
                      placeholder="Enter SDM ID"
                      value={sdmID}
                      onChange={(e) => setSdmID(e.target.value)}
                    />
                </div>
              </div>
            </div>
            <div className="manager-names-input5">
              <div className="manager-names-input-inner3">
                <div className="enter-domain-manager-wrapper">
                <input 
                      type="text" 
                      className={`input-field ${!domainManager && error ? 'error' : ''}`} 
                      placeholder="Enter Domain Manager"
                      value={domainManager}
                      onChange={(e) => setDomainManager(e.target.value)}
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="button-area1">
          <Button
            className="inside2"
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
            onClick={handleGoBack}
          >
            Go Back
          </Button>
          <Button
            className="inside3ofProfile"
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
            onClick={handleSave}
            
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Profile1;
