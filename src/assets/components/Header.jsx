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
      <li className="customButton">
        <img onMouseDown={handleOpenMenu} src="/assets/img/buttons/menu.svg" />
      </li>
    </ul>
  );

  let MobileMenu = () => (
    <div className="mobileMenu">
      <span className="closeMenu customButton">
        <img onMouseDown={handleMenuClick} src="/assets/img/buttons/x.svg" />
      </span>
      <ul>
        <li className="customButton">
          <Link to="/">
            <img onMouseDown={handleMenuClick} src="/assets/img/buttons/rugs_mobile.svg" />
          </Link>
        </li>
        <li className="customButton">
          <Link to="/about">
            <img onMouseDown={handleMenuClick} src="/assets/img/buttons/about_mobile.svg" />
          </Link>
        </li>
        <li className="customButton">
          <Link to="/commissions">
            <img onMouseDown={handleMenuClick} src="/assets/img/buttons/commission_mobile.svg" />
          </Link>
        </li>
        <li className="customButton">
          <Link to="/contact">
            <img onMouseDown={handleMenuClick} src="/assets/img/buttons/contacts_mobile.svg" />
          </Link>
        </li>
      </ul>
    </div>
  );

  let DesktopHeader = () => (
    <>
      <ul className="header">
        <li onMouseEnter={(e) => MouseEnterButton(e)} onMouseLeave={(e) => MouseLeaveButton(e)}>
          <Link to="/">
            <img src="assets/img/buttons/rugs.svg" className="customButton" />
          </Link>
        </li>

        <li onMouseEnter={(e) => MouseEnterButton(e)} onMouseLeave={(e) => MouseLeaveButton(e)}>
          <Link to="/about">
            <img src="assets/img/buttons/about.svg" className="customButton" />
          </Link>
        </li>
        <li onMouseEnter={(e) => MouseEnterButton(e)} onMouseLeave={(e) => MouseLeaveButton(e)}>
          <Link to="/commissions">
            <img src="assets/img/buttons/commission.svg" className="customButton" />
          </Link>
        </li>
        <li onMouseEnter={(e) => MouseEnterButton(e)} onMouseLeave={(e) => MouseLeaveButton(e)}>
          <Link to="/contact">
            <img src="assets/img/buttons/contacts.svg" className="customButton" />
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
