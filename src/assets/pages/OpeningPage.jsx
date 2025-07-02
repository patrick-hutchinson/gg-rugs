import React, { useState } from "react";

import "../css/Logo.css";
import Logo from "../components/Logo";
import Loading from "../components/Loading";
import "../css/OpeningPage.css";

export default function OpeningPage({ isDesktop, setShowOpeningPage }) {
  const openingPageRef = React.useRef();

  const [imagesLoaded, setImagesLoaded] = useState(false);

  window.addEventListener("click", () => {
    handleOpeningPageClose();
  });

  const handleOpeningPageClose = () => {
    openingPageRef.current.classList.add("close");

    setTimeout(() => {
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

    document.querySelector(".logoContainer").style.transform = `translate(-50%, -50%) scale(${scaleFactor}) `;
  }

  return (
    <div className="openingPage" ref={openingPageRef}>
      {!imagesLoaded && <Loading />}
      <div className="logoContainer">
        <Logo setImagesLoaded={setImagesLoaded} />
      </div>
    </div>
  );
}
