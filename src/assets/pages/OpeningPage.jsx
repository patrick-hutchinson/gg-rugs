import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import CSS from "../components/css/logo.module.css";

import Logo from "../components/Logo";

export default function OpeningPage(props) {
  const location = useLocation();
  let navigate = useNavigate();

  window.addEventListener("resize", () => {
    scaleLogo();
  });

  React.useEffect(() => {
    scaleLogo();
  }, []);

  function scaleLogo() {
    let scaleFactor;

    if (props.isDesktop) {
      scaleFactor = window.innerWidth / window.innerHeight / 1.5;
      if (scaleFactor > 1.5) {
        scaleFactor = 1.5;
      }
    } else {
      scaleFactor = 0.4;
    }

    document.querySelector(`.${CSS.logoContainer}`).style.transform = `translate(-50%, -50%) scale(${scaleFactor}) `;
  }

  const [loading, setLoading] = React.useState(true);
  const LoadingScreen = () => {
    React.useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 500);

      // Cleanup the timer if the component unmounts before the timer completes
      return () => clearTimeout(timer);
    }, []);

    if (!loading) {
      return null;
    }

    return (
      <div id="loading">
        <span>Loading...</span>
      </div>
    );
  };

  return (
    <div className="openingPage">
      <div className={CSS.logoContainer}>
        <Logo />
      </div>
    </div>
  );
}
