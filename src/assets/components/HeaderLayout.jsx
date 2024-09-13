import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";

export default function Layout({ isDesktop }) {
  let copyrightNoticeRef = React.useRef(null);

  React.useEffect(() => {
    console.log(copyrightNoticeRef.current.getBoundingClientRect().height);
    copyrightNoticeRef.current.style.right = `-${copyrightNoticeRef.current.getBoundingClientRect().height / 2 - 25}px`;

    let catalogueImages = document.querySelectorAll(".catalogueImage");
    catalogueImages.forEach((catalogueImage, index) => {
      catalogueImage.style.animationDelay = `${index * 0.1}s`;
    });
  }, []);
  return (
    <>
      <Header isDesktop={isDesktop} />

      <Outlet />

      <div className="copyrightNotice" ref={copyrightNoticeRef}>
        2024 © Copyright. All rights Reserved
      </div>
    </>
  );
}
