import React from "react";
import { Link } from "react-router-dom";

import { MouseEnterButton } from "../utils/MouseEnterButton";
import { MouseLeaveButton } from "../utils/MouseLeaveButton";

import "../css/Header.css";

export default function Header({ isDesktop }) {
  function handleOpenMenu() {
    document.querySelector(".mobileMenu").classList.add("visible");
  }

  function handleMenuClick() {
    document.querySelector(".mobileMenu").classList.remove("visible");
  }

  let MobileHeader = () => (
    <ul className="header">
      <li>
        <img className="customButton" onMouseDown={handleOpenMenu} src="/assets/img/buttons/menu.svg" />
      </li>
    </ul>
  );

  let MobileMenu = () => (
    <div className="mobileMenu">
      <span className="closeMenu">
        <img className="customButton" onMouseDown={handleMenuClick} src="/assets/img/buttons/x.svg" />
      </span>
      <ul>
        <li>
          <Link to="/">
            <img className="customButton" onMouseDown={handleMenuClick} src="/assets/img/buttons/rugs_mobile.svg" />
          </Link>
        </li>
        <li>
          <Link to="/about">
            <img className="customButton" onMouseDown={handleMenuClick} src="/assets/img/buttons/about_mobile.svg" />
          </Link>
        </li>
        <li>
          <Link to="/commissions">
            <img
              className="customButton"
              onMouseDown={handleMenuClick}
              src="/assets/img/buttons/commission_mobile.svg"
            />
          </Link>
        </li>
        <li>
          <Link to="/contact">
            <img className="customButton" onMouseDown={handleMenuClick} src="/assets/img/buttons/contacts_mobile.svg" />
          </Link>
        </li>
      </ul>
    </div>
  );

  let DesktopHeader = () => (
    <>
      <ul className="header">
        <li
          onMouseEnter={(e) => MouseEnterButton(e)}
          onMouseLeave={(e) => MouseLeaveButton(e)}
          className="customButton"
        >
          <Link to="/">
            <img src="assets/img/buttons/rugs.svg" />
          </Link>
        </li>

        <li
          onMouseEnter={(e) => MouseEnterButton(e)}
          onMouseLeave={(e) => MouseLeaveButton(e)}
          className="customButton"
        >
          <Link to="/about">
            <img src="assets/img/buttons/about.svg" />
          </Link>
        </li>
        <li
          onMouseEnter={(e) => MouseEnterButton(e)}
          onMouseLeave={(e) => MouseLeaveButton(e)}
          className="customButton"
        >
          <Link to="/commissions">
            <img src="assets/img/buttons/commission.svg" />
          </Link>
        </li>
        <li
          onMouseEnter={(e) => MouseEnterButton(e)}
          onMouseLeave={(e) => MouseLeaveButton(e)}
          className="customButton"
        >
          <Link to="/contact">
            <img src="assets/img/buttons/contacts.svg" />
          </Link>
        </li>
      </ul>
    </>
  );

  return (
    <>
      <header>
        <Link to="/">
          <img className="logo" src="/assets/img/gg-logo.svg" />
        </Link>
        {isDesktop ? <DesktopHeader /> : <MobileHeader />}
      </header>
      <MobileMenu />
    </>
  );
}
