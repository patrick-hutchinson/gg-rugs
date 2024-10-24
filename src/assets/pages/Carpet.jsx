import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import AnimatedPage from "../AnimatedPage";

import "../css/Carpet.css";

export default function Carpet({ data, isDesktop }) {
  const { id } = useParams();

  React.useEffect(() => {
    console.log(data);
  }, [data]);

  // Find the carpet object that matches the ID
  const carpet = data?.find((carpet) => carpet.attributes.title.toLowerCase().replace(/ /g, "-") === id);

  if (!carpet) {
    return <NotFound />;
  }

  function handleMouseEnter(e) {
    let currentSource = e.target.getAttribute("src");
    let splicedSource = currentSource.slice(0, -4) + "_focus.svg";

    e.target.setAttribute("src", splicedSource);
  }
  function handleMouseLeave(e) {
    let currentSource = e.target.getAttribute("src");
    let splicedSource = currentSource.slice(0, -10) + ".svg";

    e.target.setAttribute("src", splicedSource);
  }

  // Compose Email when the user clicks "Buy"
  function handleBuyClick() {
    const subject = encodeURIComponent("I NEED IT!");
    const body = encodeURIComponent(`THE ${carpet.attributes.title} CARPET NEEDS TO BE MINE!`);

    const mailtoLink = `mailto:ciao@gg-office.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;
  }

  const ImageGrid = () => {
    return (
      <div className="imagegrid">
        {carpet.attributes.imagegrid.length > 0 ? (
          carpet.attributes.imagegrid.map((row) => {
            let imageAmount = row.row.data.length;

            return (
              <div
                className="imagegrid-row"
                key={row.id}
                style={{
                  gridTemplateColumns: `repeat(${imageAmount}, 1fr)`, // Dynamically set number of columns
                }}
              >
                {row.row.data.map((media) => (
                  <div className="imagegrid-media" key={media.id}>
                    {media.attributes.mime.includes("image") ? (
                      <img src={media.attributes.url} alt={media.attributes.title} />
                    ) : media.attributes.mime.includes("video") ? (
                      <video autoPlay defaultMuted loop playsInline>
                        <source src={media.attributes.url} type={media.attributes.mime} />
                        Your browser does not support the video tag.
                      </video>
                    ) : null}
                  </div>
                ))}
              </div>
            );
          })
        ) : (
          <div className="noCarpet-wrapper">
            <div className="noCarpet">
              <div className="yarn-emoji">🧶</div>
            </div>
            <span className="noCarpet-notice">We're currently working on the pictures, see more soon!</span>
          </div>
        )}
      </div>
    );
  };

  const currentCarpetIndex = data?.findIndex(
    (carpet) => carpet.attributes.title.toLowerCase().replace(/ /g, "-") === id
  );

  let CarpetSpecifications = () => {
    return (
      <div className="carpetSpecifications-wrapper">
        {isDesktop ? (
          <>
            <div className="carpetSpecifications">
              <div>
                <span className="key">SIZE</span>
                <span className="value">{carpet.attributes.dimensions}</span>
              </div>
              <div>
                <span className="key">YEAR</span>
                <span className="value">{carpet.attributes.year}</span>
              </div>
              <div>
                <span className="key">PRICE</span>
                <span className="value">{carpet.attributes.price} EUR</span>
              </div>
            </div>
            <button className="buyButton customButton" onClick={handleBuyClick}>
              <img src="/assets/img/buttons/buy.svg" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
            </button>
          </>
        ) : (
          <>
            <div className="carpetSpecifications">
              <div>
                <span className="key">SIZE</span>
                <span className="key">YEAR</span>
                <span className="key">PRICE</span>
              </div>
              <div>
                <span className="value">{carpet.attributes.year}</span>
                <span className="value">{carpet.attributes.dimensions}</span>
                <span className="value">{carpet.attributes.price} EUR</span>
              </div>
            </div>
            <button className="buyButton customButton" onClick={handleBuyClick}>
              <img src="/assets/img/buttons/buy.svg" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
            </button>
          </>
        )}
      </div>
    );
  };

  const prevCarpet = currentCarpetIndex > 0 ? data[currentCarpetIndex - 1] : null;
  const nextCarpet = currentCarpetIndex < data.length - 1 ? data[currentCarpetIndex + 1] : null;

  let ImageNavigation = () => {
    return (
      <div className="navigation-container">
        <div className="navigation-button">
          {/* Previous button */}
          <Link to={prevCarpet ? `/${prevCarpet.attributes.title.toLowerCase().replace(/ /g, "-")}` : "#"}>
            <img className="customButton" src="/assets/img/buttons/prev.svg" alt="Previous" />
          </Link>
        </div>

        <div className="navigation-button">
          {/* Home button */}
          <Link to="/">
            <img className="customButton" src="/assets/img/buttons/all-rugs.svg" alt="All Rugs" />
          </Link>
        </div>

        <div className="navigation-button">
          {/* Next button */}
          <Link to={nextCarpet ? `/${nextCarpet.attributes.title.toLowerCase().replace(/ /g, "-")}` : "#"}>
            <img className="customButton" src="/assets/img/buttons/next.svg" alt="Next" />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <AnimatedPage>
      <main className="pageContainer">
        {/* <Link to="/" className="backButton customButton desktop">
          <img
            src="/assets/img/buttons/backarrow.svg"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          ></img>
        </Link> */}

        <div className="carpetContainer">
          <div className="carpetInfo">
            <h1 className="carpetTitle">{carpet.attributes.title}</h1>
            <p className="carpetDescription">{carpet.attributes.description}</p>

            <CarpetSpecifications />
          </div>

          <ImageGrid />

          <ImageNavigation />
        </div>
      </main>
    </AnimatedPage>
  );
}
