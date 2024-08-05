import React from "react";
import { Outlet } from "react-router-dom";

// The Layout component takes care of all of the repetitive Components on a Page
import Header from "./Header";

export default function Layout(props) {
  let isDesktop = props.isDesktop;
  let lastMousePosition = 0;

  window.addEventListener("mousemove", (e) => {
    // Handle the CursorImage
    let cursorImage = document.querySelector(".cursorImage img");
    cursorImage.style.left = e.clientX + "px";
    cursorImage.style.top = e.clientY + "px";

    if (e.clientX < lastMousePosition) {
      document.querySelector(".cursorImage img").setAttribute("src", "./src/assets/mat/img/cursor/eyes_reg.png");
    } else if (e.clientX > lastMousePosition) {
      document.querySelector(".cursorImage img").setAttribute("src", "./src/assets/mat/img/cursor/eyes_right.png");
    }

    lastMousePosition = e.clientX;
  });

  let lastScrollTop = 0;

  window.addEventListener("scroll", (e) => {
    // Handle the CursorImage
    var currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop) {
      document.querySelector(".cursorImage img").setAttribute("src", "./src/assets/mat/img/cursor/eyes_down.png");
    } else if (currentScroll < lastScrollTop) {
      document.querySelector(".cursorImage img").setAttribute("src", "./src/assets/mat/img/cursor/eyes_up.png");
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
  });

  window.addEventListener("scrollend", (e) => {
    document.querySelector(".cursorImage img").setAttribute("src", "./src/assets/mat/img/cursor/eyes_reg.png");
  });

  React.useEffect(() => {
    //Handle the Copyright Notice
    let copyrightNotice = document.querySelector(".copyrightNotice");

    copyrightNotice.style.width = copyrightNotice.getBoundingClientRect().height + "px";
    copyrightNotice.style.height = copyrightNotice.getBoundingClientRect().height + "px";

    let catalogueImages = document.querySelectorAll(".catalogueImage");
    catalogueImages.forEach((catalogueImage, index) => {
      catalogueImage.style.animationDelay = `${index * 0.1}s`;
    });
  }, []);
  return (
    <>
      <Header isDesktop={isDesktop} />

      {/* Outlet Renders all of the Components and subComponents that should be found at the matching "/" url */}
      <Outlet />

      <div className="copyrightNotice">2024 © Copyright. All rights Reserved</div>
      <div className="cursorImage">
        <img src="./src/assets/mat/img/cursor/eyes_reg.png" />
      </div>
    </>
  );
}
