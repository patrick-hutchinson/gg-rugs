import React from "react";
import Logo from "./Logo";
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
        <img onMouseDown={handleOpenMenu} src="/assets/img/menu.svg" />
      </li>
    </ul>
  );

  let MobileMenu = () => (
    <div className="mobileMenu">
      <span className="closeMenu customButton">
        <img onMouseDown={handleMenuClick} src="/assets/img/close.svg" />
      </span>
      <ul>
        <li className="customButton">
          <Link to="/">
            <img onMouseDown={handleMenuClick} src="/assets/img/home.svg" />
          </Link>
        </li>
        <li className="customButton">
          <Link to="/about">
            <img onMouseDown={handleMenuClick} src="/assets/img/about.svg" />
          </Link>
        </li>
        <li className="customButton">
          <Link to="/commissions">
            <img onMouseDown={handleMenuClick} src="/assets/img/commission.svg" />
          </Link>
        </li>
        <li className="customButton">
          <Link to="/contact">
            <img onMouseDown={handleMenuClick} src="/assets/img/contact.svg" />
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
            <img src="assets/img/home.svg" />
          </Link>
        </li>

        <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="customButton">
          <Link to="/about">
            <img src="assets/img/about.svg" />
          </Link>
        </li>
        <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="customButton">
          <Link to="/commissions">
            <img src="assets/img/commission.svg" />
          </Link>
        </li>
        <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="customButton">
          <Link to="/contact">
            <img src="assets/img/contact.svg" />
          </Link>
        </li>
      </ul>
    </>
  );

  return (
    <header>
      <Link to="/home">
        <div className="logoContainer">{/* <Logo /> */}</div>
      </Link>
      {isDesktop ? <DesktopHeader /> : <MobileHeader />}
      <MobileMenu />
    </header>
  );
}
