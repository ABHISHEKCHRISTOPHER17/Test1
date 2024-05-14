import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll"; // Import animateScroll from react-scroll
import "./FrameComponent5.css";

const FrameComponent5 = () => {
  const navigate = useNavigate();

  const onInsideClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const onInside1Click = useCallback(() => {
    navigate("/register");
  }, [navigate]);

  const scrollToTop = () => {
    scroll.scrollToTop(); // Scroll to top using animateScroll
  };

  useEffect(() => {
    const body = document.body;
    let lastScroll = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll <= 0) {
        body.classList.remove("scroll-up");
      }
      if (currentScroll > lastScroll && !body.classList.contains("scroll-down")) {
        body.classList.remove("scroll-up");
        body.classList.add("scroll-down");
      }
      if (currentScroll < lastScroll && body.classList.contains("scroll-down")) {
        body.classList.remove("scroll-down");
        body.classList.add("scroll-up");
      }

      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="logo-container">
      <div className="logo2">
        <img
          className="torry-harris-integration-solut-icon2"
          loading="lazy"
          alt=""
          src="/torryharrisintegrationsolutionslogo-600-1@2x.png"
        />
      </div>
      <div className="navigation-bar">
        <div className="home">
          <ScrollLink to="" spy={true} smooth={true} offset={50} duration={500} className="home1" onClick={scrollToTop}>Home</ScrollLink>
        </div>
        <div className="features">
          <ScrollLink to="feature" spy={true} smooth={true} offset={50} duration={500} className="features1" >Features</ScrollLink>
        </div>
        <div className="how-it-works">
          <ScrollLink to="how-it-work" spy={true} smooth={true} offset={50} duration={500} className="how-it-works1" >How it Works</ScrollLink>
        </div>
        <div className="benefits">
          <ScrollLink to="benefit" spy={true} smooth={true} offset={50} duration={500} className="benefits1" >Benefits</ScrollLink>
        </div>
        <div className="contact-us">
          <ScrollLink to="contact" spy={true} smooth={true} offset={50} duration={500} className="contact-us1" >Contact Us</ScrollLink>
        </div>
      </div>
      <div className="sub-cta">
        <button className="inside" onClick={onInsideClick}>
          <div className="button2">Log In</div>
          {/* <img className="arrow-down-icon" alt="" /> */}
        </button>
        <button className="inside1" onClick={onInside1Click}>
          <div className="button3">Register</div>
          {/* <img className="arrow-down-icon1" alt="" src="/arrowdown.svg" /> */}
        </button>
      </div>
    </header>
  );
};

export default FrameComponent5;
