import React from "react";
import "../css/Footer.css";

export default function Footer({ isDesktop }) {
  let currentYear = new Date().getFullYear();

  function handleMouseEnter(e) {
    let currentSource = e.currentTarget.querySelector("img").getAttribute("src");
    let splicedSource = currentSource.slice(0, -4) + "_focus.svg";

    e.currentTarget.querySelector("img").setAttribute("src", splicedSource);
  }

  function handleMouseLeave(e) {
    let currentSource = e.currentTarget.querySelector("img").getAttribute("src");
    let splicedSource = currentSource.slice(0, -10) + ".svg";

    e.currentTarget.querySelector("img").setAttribute("src", splicedSource);
  }

  let DesktopFooter = () => {
    return (
      <footer className="desktopFooter">
        <div className="copyrightnotice">
          {`© ${currentYear} GGRUGS.`}
          <br /> All rights reserved
        </div>
        {/* <br className="mobile" /> */}
        <div>
          <a
            href="https://www.instagram.com/gg__rugs"
            target="_blank"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img className="customButton" src="/assets/img/buttons/ig.svg" alt="" />
          </a>
        </div>
        {/* <br className="mobile" /> */}
        <div>
          For any information write to us at <br />
          <a
            href="mailto:ciao@gg-office.com"
            target="blank"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img className="customButton" src="/assets/img/buttons/email.svg" />
          </a>
        </div>
      </footer>
    );
  };

  let MobileFooter = () => {
    return (
      <footer className="mobileFooter">
        <div>
          <a href="https://www.instagram.com/gg__rugs" target="_blank">
            <img className="customButton" src="/assets/img/buttons/ig.svg" alt="" />
          </a>
        </div>
        <div>
          <span className="desktop">For any information write to us at</span> <br />
          <a href="mailto:ciao@gg-office.com" target="_blank">
            <img className="customButton" src="/assets/img/buttons/email.svg" />
          </a>
        </div>
      </footer>
    );
  };
  return <>{isDesktop ? <DesktopFooter /> : <MobileFooter />}</>;
}
