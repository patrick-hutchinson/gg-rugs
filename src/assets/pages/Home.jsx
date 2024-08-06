import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OpeningPage from "./OpeningPage";
import AnimatedPage from "../AnimatedPage";

export default function Home(props) {
  let [catalogueImages, setCatalogueImages] = useState([]);
  let [closeOpeningPage, setCloseOpeningPage] = useState(false);

  useEffect(() => {
    if (props.isFirstLoad) {
      let closeOpeningScreen = () => {
        let openingPage = document.querySelector(".openingPage");

        if (openingPage && props.isDesktop) {
          setTimeout(() => {
            openingPage.classList.add("hidden");
          }, 600);

          setTimeout(() => {
            props.toggleIsFirstLoad(false);
          }, 1000);
        } else {
          openingPage.classList.add("hidden");

          setTimeout(() => {
            props.toggleIsFirstLoad(false);
          }, 400);
        }
      };

      let handleScroll = () => {
        closeOpeningScreen();
        setCloseOpeningPage(true);
      };

      let handleClick = () => {
        closeOpeningScreen();
        setCloseOpeningPage(true);
        console.log("clicked");
      };

      window.addEventListener("scroll", handleScroll);
      window.addEventListener("click", handleClick);
    }
  }, [props.isFirstLoad]);

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
