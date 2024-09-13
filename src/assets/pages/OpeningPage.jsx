import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import CSS from "../css/logo.module.css";
import Logo from "../components/Logo";
import "../css/OpeningPage.css";

export default function OpeningPage({ isDesktop, setShowOpeningPage }) {
  window.addEventListener("click", () => {
    handleOpeningPageClose();
  });

  const openingPageRef = React.useRef(null);

  const handleOpeningPageClose = () => {
    openingPageRef.current.style.top = "-100vh";

    setTimeout(() => {
      localStorage.setItem("hasSeenOpeningPage", "true");
      setShowOpeningPage(false);
    }, 1000);
  };

  window.addEventListener("resize", () => {
    scaleLogo();
  });

  React.useEffect(() => {
    scaleLogo();
  }, []);

  function scaleLogo() {
    let scaleFactor;

    if (isDesktop) {
      scaleFactor = window.innerWidth / window.innerHeight / 1.5;

      if (scaleFactor > 1.5) {
        scaleFactor = 1.5;
      }
    } else {
      scaleFactor = 0.4;
    }

    document.querySelector(`.${CSS.logoContainer}`).style.transform = `translate(-50%, -50%) scale(${scaleFactor}) `;
  }

  return (
    <div className="openingPage" ref={openingPageRef}>
      <div className={CSS.logoContainer}>
        <Logo />
      </div>
    </div>
  );
}
