import Profile from "../components/Profile";
import Profile1 from "../components/Profile1";
import ProfileToLogin from "../components/ProfileToLogin";
import React, { useState } from "react";
import "./CompleteProfile.css";

const COMPPROF = () => {
    const [showProfile, setShowProfile] = useState("0");
    const [profileData, setProfileData] = useState(null);

  
    const handleNextClick = (data) => {
      setProfileData(data);
      setShowProfile("1");
    };
  
    const handleGoBack = () => {
      
      setShowProfile("0");
    };
    const handleNextClick1 = () => {
  
      setShowProfile("2");
    };
    // const handleGoBack1 = () => {
      
    //   setShowProfile("1");
    // };
  return (
    <div className="comp-prof-1">
      <img
        className="login-1-background-icon"
        alt=""
        src="/login-1--background@2x.png"
      />
      <section className="content-structure">
        <div className="logo">
          <img
            className="torry-harris-integration-solut-icon"
            loading="lazy"
            alt=""
            src="/torryharrisintegrationsolutionslogo-600-1@2x.png"
          />
        </div>
        <div className="skill-matrix-area">
          <img
            className="skillmatrix-2-icon"
            loading="lazy"
            alt=""
            src="/skillmatrix-2.svg"
          />
        </div>
      </section>
      <section className="form-containerofCpProfile">
      {showProfile =="0" && (
        <Profile onNextClick={handleNextClick} />
      )}
      {showProfile =="1" &&(
        <Profile1 onGoBack={handleGoBack} onNextClick={handleNextClick1} profileData={profileData} />
      ) }
       {showProfile =="2" &&(<ProfileToLogin />
      ) }
      </section>
    </div>
  );
};

export default COMPPROF;
