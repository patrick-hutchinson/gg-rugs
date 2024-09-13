import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AnimatedPage from "../AnimatedPage";

import "../css/Home.css";
import OpeningPage from "./OpeningPage";

export default function Home({ data, isDesktop, showOpeningPage, setShowOpeningPage }) {
  let [carpetThumbnails, setCarpetThumbnails] = useState([]);

  // Generate each Carpet
  useEffect(() => {
    if (data) {
      let thumbnails = data.flatMap((carpet, index) => {
        let carpetLink = carpet.attributes.title.toLowerCase().replace(/ /g, "-");
        let carpetUrl = `${carpet.attributes.thumbnail.data.attributes.url}`;

        let randomNumber = Math.floor(Math.random() * 10) + 1; // Between 1 and 10

        return isDesktop ? (
          <div
            className="carpetWrapper"
            onMouseEnter={handleCarpetMouseEnter}
            onMouseLeave={handleCarpetMouseLeave}
            key={`${index}`}
          >
            <div className="carpetTextContainer">
              <div className="carpetTitle">{carpet.attributes.title}</div>
              <Link className="carpetLink customButton" to={`/${carpetLink}`}>
                <img
                  onMouseEnter={handleSeeMoreMouseEnter}
                  onMouseLeave={handleSeeMoreMouseLeave}
                  src="/assets/img/take-a-look.svg"
                />
              </Link>
            </div>
            <img
              className="catalogueImage"
              src={carpetUrl}
              alt={carpet.attributes.title}
              style={{
                animationDelay: `${randomNumber * 0.3}s`,
              }}
            />
          </div>
        ) : (
          <Link key={`${index}`} to={`/${carpetLink}`}>
            <img
              className="catalogueImage"
              src={carpetUrl}
              alt={carpet.attributes.title}
              style={{
                animationDelay: `${randomNumber * 0.3}s`,
              }}
            />
          </Link>
        );
      });
      setCarpetThumbnails(thumbnails);
    }
  }, [data]);

  function handleCarpetMouseEnter(e) {
    const catalogueImage = e.currentTarget.querySelector(".catalogueImage");
    catalogueImage.classList.add("hide");

    let textContainer = e.currentTarget.querySelector(".carpetTextContainer");
    textContainer.classList.add("visible");
  }

  function handleCarpetMouseLeave(e) {
    const catalogueImage = e.currentTarget.querySelector(".catalogueImage");
    catalogueImage.classList.remove("hide");

    let textContainer = e.currentTarget.querySelector(".carpetTextContainer");
    textContainer.classList.remove("visible");
  }

  function handleSeeMoreMouseEnter(e) {
    e.currentTarget.src = "/assets/img/take-a-look_focus.svg";
    const cursorImage = document.querySelector(".cursorImage > img");
    cursorImage.classList.remove("pulseCursor");
    cursorImage.classList.add("pulseCursor");

    const handleAnimationEnd = () => {
      cursorImage.classList.remove("pulseCursor");
      cursorImage.removeEventListener("animationend", handleAnimationEnd);
    };

    cursorImage.addEventListener("animationend", handleAnimationEnd);
  }

  function handleSeeMoreMouseLeave(e) {
    e.currentTarget.src = "/assets/img/take-a-look.svg";
    const cursorImage = document.querySelector(".cursorImage > img");

    const handleAnimationEnd = () => {
      cursorImage.classList.remove("pulseCursor");
      cursorImage.removeEventListener("animationend", handleAnimationEnd);
    };

    cursorImage.addEventListener("animationend", handleAnimationEnd);
  }

  return (
    <>
      {showOpeningPage && <OpeningPage setShowOpeningPage={setShowOpeningPage} />}
      <AnimatedPage>
        <main className="pageContainer">
          <div className="catalogue">{carpetThumbnails}</div>
        </main>
      </AnimatedPage>
    </>
  );
}
