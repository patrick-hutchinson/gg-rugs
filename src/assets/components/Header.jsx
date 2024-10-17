import React from "react";
import { Link } from "react-router-dom";

import "../css/Header.css";

export default function Header({ isDesktop }) {
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
        <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="customButton">
          <Link to="/">
            <img src="assets/img/buttons/rugs.svg" />
          </Link>
        </li>

        <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="customButton">
          <Link to="/about">
            <img src="assets/img/buttons/about.svg" />
          </Link>
        </li>
        <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="customButton">
          <Link to="/commissions">
            <img src="assets/img/buttons/commission.svg" />
          </Link>
        </li>
        <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="customButton">
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
