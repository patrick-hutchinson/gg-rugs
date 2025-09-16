import React, { useState } from "react";

import "../css/Logo.css";
import Logo from "../components/Logo";

import "../css/OpeningPage.css";

import { enableScroll, disableScroll } from "../utils/blockScrolling";

export default function OpeningPage({ isDesktop, showOpeningPage, setShowOpeningPage }) {
  const openingPageRef = React.useRef();

  const [imagesLoaded, setImagesLoaded] = useState(false);

  window.addEventListener("click", () => {
    handleOpeningPageClose();
  });

  const handleOpening = () => {
    if (showOpeningPage) {
      openingPageRef.current.classList.add("close");
      setTimeout(() => {
        handleAnimationComplete();
      }, 1000);
    }
  };

  function handleAnimationComplete() {
    enableScroll();
    document.querySelector("main").classList.remove("no-scroll");
  }

  const handleOpeningPageClose = () => {
    openingPageRef.current.classList.add("close");

    setTimeout(() => {
      setShowOpeningPage(false);
      enableScroll();
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

    document.querySelector(".logoContainer").style.transform = `translate(-50%, -50%) scale(${scaleFactor}) `;
  }

  return (
    <div
      onWheel={() => handleOpening()}
      onTouchStart={() => handleOpening()}
      className="openingPage"
      ref={openingPageRef}
    >
      <div className="logoContainer" style={{ opacity: imagesLoaded ? 1 : 0 }}>
        <Logo setImagesLoaded={setImagesLoaded} />
      </div>
    </div>
  );
}
