import React from "react";
import "../css/Footer.css";

import { MouseEnterButton } from "../utils/MouseEnterButton";
import { MouseLeaveButton } from "../utils/MouseLeaveButton";

export default function Footer({ isDesktop }) {
  let currentYear = new Date().getFullYear();

  let DesktopFooter = () => {
    return (
      <footer className="desktopFooter">
        <div className="copyrightnotice">{`© ${currentYear} GG–RUGS`}</div>
        <div>
          <a
            href="https://www.instagram.com/gg__rugs"
            target="_blank"
            onMouseEnter={(e) => MouseEnterButton(e)}
            onMouseLeave={(e) => MouseLeaveButton(e)}
          >
            <img className="customButton" src="/assets/img/buttons/ig.svg" alt="" />
          </a>
        </div>
        {/* <br className="mobile" /> */}
        <div>
          For any information write to us at <br />
          <a
            href="mailto:ciao@gg-rugs.com"
            onMouseEnter={(e) => MouseEnterButton(e)}
            onMouseLeave={(e) => MouseLeaveButton(e)}
            target="blank"
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
          <a href="mailto:ciao@gg-rugs.com" target="_blank">
            <img className="customButton" src="/assets/img/buttons/email.svg" />
          </a>
        </div>
      </footer>
    );
  };
  return <>{isDesktop ? <DesktopFooter /> : <MobileFooter />}</>;
}
