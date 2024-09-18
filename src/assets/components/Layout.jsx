import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import "../css/Layout.css";

import Header from "./Header";

export default function Layout({ isDesktop, setShowOpeningPage }) {
  let lastMousePosition = 0;

  const location = useLocation();

  React.useEffect(() => {
    // Only show the opening page if the user is on the home route
    if (location.pathname === "/") {
      const hasSeenOpeningPage = localStorage.getItem("hasSeenOpeningPage");
      setShowOpeningPage(!hasSeenOpeningPage);
    } else {
      localStorage.setItem("hasSeenOpeningPage", true);
      setShowOpeningPage(false);
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
    console.log(copyrightNoticeRef.current.getBoundingClientRect().height);
    copyrightNoticeRef.current.style.right = `-${copyrightNoticeRef.current.getBoundingClientRect().height / 2 - 25}px`;

    let catalogueImages = document.querySelectorAll(".catalogueImage");
    catalogueImages.forEach((catalogueImage, index) => {
      catalogueImage.style.animationDelay = `${index * 0.1}s`;
    });
  }, [isDesktop]);

  return (
    <>
      <Header isDesktop={isDesktop} />
      <Outlet />

      <div className="cursorImage">
        <img src="/assets/img/eyes_reg.png" />
      </div>
      <div className="copyrightNotice" ref={copyrightNoticeRef}>
        2024 © Copyright. All rights Reserved
      </div>
    </>
  );
}
