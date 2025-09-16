import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { enableScroll, disableScroll } from "../utils/blockScrolling";

import "../css/Layout.css";

import Header from "./Header";
import Footer from "./Footer";

import OpeningPage from "../pages/OpeningPage";

export default function Layout({ isDesktop, setShowOpeningPage, showOpeningPage }) {
  let lastMousePosition = 0;

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const location = useLocation();

  React.useEffect(() => {
    // Only show the opening page if the user is on the home route
    if (location.pathname === "/" && isInitialLoad) {
      setShowOpeningPage(true);
      disableScroll();
    } else {
      setShowOpeningPage(false);
      enableScroll();
    }
  }, [location.pathname]);

  React.useEffect(() => {
    // Only show the opening page if the user is on the home route
    if (location.pathname === "/contact") {
      document.querySelector("header").classList.add("unblur");
    } else {
      document.querySelector("header").classList.remove("unblur");
    }
  }, [location.pathname]);

  useEffect(() => {
    setIsInitialLoad(false);
  }, []);

  window.addEventListener("mousemove", (e) => {
    // Handle the CursorImage
    let cursorImage = document.querySelector(".cursorImage img");
    cursorImage.style.left = e.clientX + "px";
    cursorImage.style.top = e.clientY + "px";

    if (e.clientX < lastMousePosition) {
      document.querySelector(".cursorImage img").setAttribute("src", "assets/img/eyes_reg.png");
    } else if (e.clientX > lastMousePosition) {
      document.querySelector(".cursorImage img").setAttribute("src", "assets/img/eyes_right.png");
    }

    lastMousePosition = e.clientX;
  });

  let lastScrollTop = 0;
  window.addEventListener("scroll", (e) => {
    // Handle the CursorImage
    var currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop) {
      document.querySelector(".cursorImage img").setAttribute("src", "assets/img/eyes_down.png");
    } else if (currentScroll < lastScrollTop) {
      document.querySelector(".cursorImage img").setAttribute("src", "assets/img/eyes_up.png");
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
  });

  window.addEventListener("scrollend", (e) => {
    document.querySelector(".cursorImage img").setAttribute("src", "assets/img/eyes_reg.png");
  });

  let copyrightNoticeRef = React.useRef(null);

  React.useEffect(() => {
    let catalogueImages = document.querySelectorAll(".catalogueImage");
    catalogueImages.forEach((catalogueImage, index) => {
      catalogueImage.style.animationDelay = `${index * 0.1}s`;
    });
  }, [isDesktop]);

  return (
    <>
      {showOpeningPage && (
        <OpeningPage showOpeningPage={showOpeningPage} setShowOpeningPage={setShowOpeningPage} isDesktop={isDesktop} />
      )}

      <Header isDesktop={isDesktop} />
      <Outlet />
      <Footer isDesktop={isDesktop} />

      <div className="cursorImage">
        <img src="/assets/img/eyes_reg.png" />
      </div>
    </>
  );
}
