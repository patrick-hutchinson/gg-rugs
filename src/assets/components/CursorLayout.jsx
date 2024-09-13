import React from "react";
import { Outlet } from "react-router-dom";

import "../css/CursorLayout.css";

export default function Layout() {
  let lastMousePosition = 0;

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

  return (
    <>
      <Outlet />

      <div className="cursorImage">
        <img src="/assets/img/eyes_reg.png" />
      </div>
    </>
  );
}
