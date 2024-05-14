import FrameComponent5 from "../../components/landing/FrameComponent5";
import FrameComponent4 from "../../components/landing/FrameComponent4";
import FrameComponent3 from "../../components/landing/FrameComponent3";
import FrameComponent2 from "../../components/landing/FrameComponent2";
import FrameComponent1 from "../../components/landing/FrameComponent1";
import FrameComponent from "../../components/landing/FrameComponent";
import "./LANDING.css";

const LANDING = () => {
  return (
    <div>

    
    <div className="landing">
      <img className="landing-1-icon" alt="" src="/landing-1@2x.png" />
      <div className="landing-child"  />
      <section className="landing-inner">
        <div className="frame-parentofLanding">
          <FrameComponent5 />
          <FrameComponent4 />
        </div>
      </section>
      <section className="group-149-1-1-wrapper">
        <img
          className="group-149-1-1"
          loading="lazy"
          alt=""
          src="/group-149-1-1@2x.png"
          id = "feature"
        />
      </section>
      <div id ="how-it-work"/>
      <FrameComponent3 />
      <div id = "benefit"/>
      <section className="frame-section" >
        <div className="frame-group" >
          <div className="benefits-galore-with-skillmatr-wrapper">
            <b className="benefits-galore-with">
              Benefits Galore with SkillMatrix
            </b>
          </div>
          <div className="efficiency-insights-and">
            Efficiency, Insights, and Growth: Discover How SkillMatrix Empowers
            You to Excel
          </div>
        </div>
      </section>
      <FrameComponent2 />
      <FrameComponent1 />
      <FrameComponent />
    </div>
    </div>
  );
};

export default LANDING;
