import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";

export default function Header(props) {
  let isDesktop = props.isDesktop;
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

  let mobileHeader = (
    <ul className="header">
      <li>
        <img onMouseDown={handleOpenMenu} src="./src/assets/mat/svg/menu/menu.svg" />
      </li>
    </ul>
  );

  let mobileMenu = (
    <div className="mobileMenu">
      <span className="closeMenu">
        <img onMouseDown={handleMenuClick} src="./src/assets/mat/svg/menu/close.svg" />
      </span>
      <ul>
        <li>
          <Link to="/">
            <img onMouseDown={handleMenuClick} src="./src/assets/mat/svg/menu/home.svg" />
          </Link>
        </li>
        <li>
          <Link to="/about">
            <img onMouseDown={handleMenuClick} src="./src/assets/mat/svg/menu/about.svg" />
          </Link>
        </li>
        <li>
          <Link to="/commissions">
            <img onMouseDown={handleMenuClick} src="./src/assets/mat/svg/menu/commission.svg" />
          </Link>
        </li>
        <li>
          <Link to="/contact">
            <img onMouseDown={handleMenuClick} src="./src/assets/mat/svg/menu/contact.svg" />
          </Link>
        </li>
      </ul>
    </div>
  );

  let desktopHeader = (
    <>
      <ul className="header">
        <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Link to="/">
            <img src="./src/assets/mat/svg/menu/home.svg" />
          </Link>
        </li>

        <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Link to="/about">
            <img src="./src/assets/mat/svg/menu/about.svg" />
          </Link>
        </li>
        <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Link to="/commissions">
            <img src="./src/assets/mat/svg/menu/commission.svg" />
          </Link>
        </li>
        <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Link to="/contact">
            <img src="./src/assets/mat/svg/menu/contact.svg" />
          </Link>
        </li>
      </ul>
    </>
  );

  return (
    <header>
      <Link to="/">
        <Logo />
      </Link>
      {isDesktop ? desktopHeader : mobileHeader}
      {mobileMenu}
    </header>
  );
}
