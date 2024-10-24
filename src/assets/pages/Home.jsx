import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import sanityClient from "/src/client.js";

import AnimatedPage from "../AnimatedPage";

import "../css/Home.css";
import OpeningPage from "./OpeningPage";

export default function Home({ data, positiondata, isDesktop, showOpeningPage, setShowOpeningPage }) {
  let [carpetThumbnails, setCarpetThumbnails] = useState([]);

  useEffect(() => {
    if (positiondata) {
      let rows = positiondata.attributes.ruggrid.flatMap((row, rowindex) => {
        return (
          <div className="row" key={`${rowindex}`}>
            {row.carpets.data.flatMap((carpet, carpetindex) => {
              let carpetLink = carpet.attributes.title.toLowerCase().replace(/ /g, "-");
              let carpetURL = "";

              data.flatMap((altcarpet, index) => {
                if (altcarpet.attributes.title === carpet.attributes.title) {
                  carpetURL = `${altcarpet.attributes.thumbnail.data.attributes.url}`;
                }
              });

              return (
                <>
                  {isDesktop ? (
                    // Desktop view: Only the button inside the carpet div triggers the link
                    <div className="carpet" key={`${carpetindex}`}>
                      <div className="carpet-inner">
                        <img className="catalogueImage carpet-front" src={carpetURL} alt={carpet.attributes.title} />
                        <div className="carpetTextContainer carpet-back">
                          <div className="carpetTitle">{carpet.attributes.title}</div>
                          <div className="">{carpet.attributes.price} EUR</div>
                          <Link className="carpetLink customButton" to={`/${carpetLink}`}>
                            <img
                              onMouseEnter={handleSeeMoreMouseEnter}
                              onMouseLeave={handleSeeMoreMouseLeave}
                              src="/assets/img/buttons/take-a-look.svg"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="carpet" key={`${carpetindex}`} onClick={handleOpen}>
                      <div className="carpet-inner">
                        <img className="catalogueImage carpet-front" src={carpetURL} alt={carpet.attributes.title} />
                        <div className="carpetTextContainer carpet-back">
                          <div className="carpetTitle">{carpet.attributes.title}</div>
                          <div className="carpet-price">{carpet.attributes.price} EUR</div>
                          <Link className="carpetLink customButton" to={`/${carpetLink}`}>
                            <img src="/assets/img/buttons/take-a-look.svg" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              );
            })}
          </div>
        );
      });
      setCarpetThumbnails(rows);
    }
  }, [positiondata]);

  function handleSeeMoreMouseEnter(e) {
    e.currentTarget.src = "/assets/img/buttons/take-a-look_focus.svg";
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
    e.currentTarget.src = "/assets/img/buttons/take-a-look.svg";
    const cursorImage = document.querySelector(".cursorImage > img");

    const handleAnimationEnd = () => {
      cursorImage.classList.remove("pulseCursor");
      cursorImage.removeEventListener("animationend", handleAnimationEnd);
    };

    cursorImage.addEventListener("animationend", handleAnimationEnd);
  }

  return (
    <>
      {showOpeningPage && <OpeningPage setShowOpeningPage={setShowOpeningPage} isDesktop={isDesktop} />}
      <AnimatedPage>
        <main className="pageContainer">
          <div className="catalogue">{carpetThumbnails}</div>
        </main>
      </AnimatedPage>
    </>
  );
}
