import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sanityClient from "/src/client.js";

import AnimatedPage from "../AnimatedPage";
import GetMedia from "../utils/getMedia";

import "../css/Home.css";
import OpeningPage from "./OpeningPage";

export default function Home({ isDesktop, showOpeningPage, setShowOpeningPage }) {
  let [homeData, setHomeData] = React.useState();
  React.useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "home"]{
  gridstructure[]{
    carpets[]->{
      _id,
      title,  // Whatever fields you want from the 'carpet' doc
      price,
      coverimage,
    name,
    slug
    }
  }
}`
      )
      .then((data) => setHomeData(data))
      .catch(console.error);
  }, []);

  function handleSeeMoreMouseEnter(e) {
    const cursorImage = document.querySelector(".cursorImage > img");
    cursorImage.classList.remove("pulseCursor");
    cursorImage.classList.add("pulseCursor");

    const handleAnimationEnd = () => {
      cursorImage.classList.remove("pulseCursor");
      cursorImage.removeEventListener("animationend", handleAnimationEnd);
    };

    cursorImage.addEventListener("animationend", handleAnimationEnd);
  }

  function handleOpen(e) {
    e.currentTarget.classList.toggle("flip");
  }

  function handleSeeMoreMouseLeave(e) {
    const cursorImage = document.querySelector(".cursorImage > img");

    const handleAnimationEnd = () => {
      cursorImage.classList.remove("pulseCursor");
      cursorImage.removeEventListener("animationend", handleAnimationEnd);
    };

    cursorImage.addEventListener("animationend", handleAnimationEnd);
  }

  if (!homeData || homeData.length === 0) {
    return <p>Loading...</p>;
  }

  let rows =
    homeData[0].gridstructure &&
    homeData[0].gridstructure.map((row, rowindex) => {
      return (
        <div className="row" key={`${rowindex}`}>
          {row.carpets.flatMap((carpet, carpetindex) => {
            return (
              <div key={carpetindex}>
                {isDesktop ? (
                  // Desktop view: Only the button inside the carpet div triggers the link
                  <div className="carpet" key={`${carpetindex}`}>
                    <div className="carpet-inner">
                      {/* <img className="catalogueImage carpet-front" src={carpet.slug.current} alt={carpet.name} /> */}
                      <div className="carpet-front catalogueImage">
                        <GetMedia file={carpet.coverimage} />
                      </div>
                      <Link className="carpetTextContainer carpet-back" to={`/${carpet.slug.current}`}>
                        <div className="carpetTitle">{carpet.name}</div>
                        <div>
                          {carpet?.price?.soldOut
                            ? "Sold Out"
                            : carpet?.price?.notForSale
                            ? "Not for Sale"
                            : `${carpet?.price?.price} EUR`}
                        </div>
                        <div className="carpetLink customButton">
                          <img
                            className="larger-screen"
                            onMouseEnter={handleSeeMoreMouseEnter}
                            onMouseLeave={handleSeeMoreMouseLeave}
                            src="/assets/img/buttons/take-a-look.svg"
                          />
                          <img
                            className="smaller-screen"
                            onMouseEnter={handleSeeMoreMouseEnter}
                            onMouseLeave={handleSeeMoreMouseLeave}
                            src="/assets/img/buttons/look.svg"
                          />
                        </div>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="carpet" key={`${carpetindex}`} onClick={handleOpen}>
                    <div className="carpet-inner">
                      <div className="carpet-front catalogueImage">
                        <GetMedia file={carpet.coverimage} />
                      </div>
                      <div className="carpetTextContainer carpet-back">
                        <div className="carpetTitle">{carpet.name}</div>
                        <div className="carpet-price">
                          {carpet?.price?.soldOut
                            ? "Sold Out"
                            : carpet?.price?.notForSale
                            ? "Not for Sale"
                            : `${carpet?.price?.price} EUR`}
                        </div>
                        <Link className="carpetLink customButton" to={`/${carpet.slug.current}`}>
                          <img src="/assets/img/buttons/take-a-look.svg" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    });

  return (
    <>
      {showOpeningPage && <OpeningPage setShowOpeningPage={setShowOpeningPage} isDesktop={isDesktop} />}
      <AnimatedPage>
        <main className="pageContainer">{rows}</main>
      </AnimatedPage>
    </>
  );
}
