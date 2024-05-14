import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./FrameComponent4.css";

const FrameComponent4 = () => {
  const navigate = useNavigate();

  const onInsideClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const onInside1Click = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  return (
    <div className="hero-wrapper">
      <div className="hero" >
        <div className="empower-your-growth-with-skill-parent">
          <div className="empower-your-growth">
            Empower Your Growth with SkillMatrix
          </div>
          <div className="personalized-skill-tracking">
            Personalized Skill Tracking Made Easy!
          </div>
        </div>
        <div className="main-content">
          <div className="welcome-to-skillmatrix">
            Welcome to SkillMatrix by Torry Harris Integrated Solutions. Our
            platform is designed to empower individuals at every level,
            providing efficient skill management solutions for admins, trainees,
            and employees. Take control of your skill development journey and
            drive success with SkillMatrix.
          </div>
        </div>
        <div className="main-cta">
          <button className="inside2ofLanding" onClick={onInsideClick}>
            <div className="button4">Log In</div>
            <img className="arrow-down-icon2" alt="" />
          </button>
          <button className="inside3" onClick={onInside1Click}>
            <div className="button5">Register</div>
            <img className="arrow-down-icon3" alt="" src="/arrowdown2.svg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent4;
