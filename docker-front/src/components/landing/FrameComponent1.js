import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./FrameComponent1.css";

const FrameComponent1 = () => {
  const navigate = useNavigate();

  const onInsideClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const onInside1Click = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  return (
    <section className="cta-wrapper">
      <div className="cta">
        <div className="group">
          <img className="icon" loading="lazy" alt="" src="/0704-1@2x.png" />
          <div className="frame-parent4">
            <div className="frame-parent5">
              <div className="get-started-with-skillmatrix-t-wrapper">
                <b className="get-started-with">
                  Get Started with SkillMatrix Today.
                </b>
              </div>
              <div className="experience-the-power-of-skillm-wrapper">
                <div className="experience-the-power">
                  Experience the power of SkillMatrix in transforming your skill
                  management practices. Sign up now to unlock a world of
                  efficiency, insights, and empowerment for your organization.
                </div>
              </div>
            </div>
            <div className="inside-parent">
              <button className="inside4" onClick={onInsideClick}>
                Log In
                {/* <img className="arrow-down-icon4" alt="" /> */}
              </button>
              <button className="inside5" onClick={onInside1Click}>
                Register
                {/* <img className="arrow-down-icon5" alt="" /> */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrameComponent1;
