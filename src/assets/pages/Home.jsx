import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OpeningPage from "./OpeningPage";
import AnimatedPage from "../AnimatedPage";

export default function Home(props) {
  let [catalogueImages, setCatalogueImages] = useState([]);
  let [closeOpeningPage, setCloseOpeningPage] = useState(false);

  useEffect(() => {
    let closeOpeningScreen = () => {
      let openingPage = document.querySelector(".openingPage");

      if (openingPage) {
        setTimeout(() => {
          openingPage.classList.add("hidden");
        }, 600);

        setTimeout(() => {
          props.toggleIsFirstLoad(false);
        }, 1000);
      }
    };

    let handleScroll = () => {
      closeOpeningScreen();
      setCloseOpeningPage(true);
    };

    let handleClick = () => {
      closeOpeningScreen();
      setCloseOpeningPage(true);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClick);
    };
  }, [props.toggleIsFirstLoad]);

  // Generate each Carpet
  useEffect(() => {
    if (props.data) {
      let images = props.data.flatMap((carpet, index) => {
        let carpetLink = carpet.attributes.name.toLowerCase().replace(/ /g, "-");
        let carpetUrl = `${carpet.attributes.titleImage.data.attributes.url}`;

        return props.isDesktop ? (
          <div
            className="carpetWrapper"
            onMouseEnter={handleCarpetMouseEnter}
            onMouseLeave={handleCarpetMouseLeave}
            key={`${index}`}
          >
            <div className="carpetTextContainer">
              <div className="carpetTitle">{carpet.attributes.name}</div>
              <Link className="carpetLink" to={`/${carpetLink}`}>
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
              alt={carpet.attributes.name}
              style={{
                animationDelay: `${index * 0.3}s`,
              }}
              onMouseMove={handleMouseMove}
            />
          </div>
        ) : (
          <Link key={`${index}`} to={`/${carpetLink}`}>
            <img
              className="catalogueImage"
              src={carpetUrl}
              alt={carpet.attributes.name}
              style={{
                animationDelay: `${index * 0.3}s`,
              }}
              onMouseMove={handleMouseMove}
            />
          </Link>
        );
      });
      setCatalogueImages(images);
    }
  }, [props.data]);

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
  function handleSeeMoreMouseEnter() {
    document.querySelector(".cursorImage > img").classList.add("scaleCursor");
  }
  function handleSeeMoreMouseLeave() {
    setTimeout(() => {
      document.querySelector(".cursorImage > img").classList.remove("scaleCursor");
    }, 700);
  }

  function handleMouseMove(e) {
    let computedStyle = window.getComputedStyle(e.target);
  }

  return (
    <>
      {props.isFirstLoad && (
        <OpeningPage closeOpeningPage={closeOpeningPage} isDesktop={props.isDesktop} isFirstLoad={props.isFirstLoad} />
      )}
      <AnimatedPage>
        <main className="pageContainer">
          <div className="catalogue">{catalogueImages}</div>
        </main>
      </AnimatedPage>
    </>
  );
}
