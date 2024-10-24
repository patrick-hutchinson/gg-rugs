import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import AnimatedPage from "../AnimatedPage";

import sanityClient from "/src/client.js";

import { PortableText } from "@portabletext/react";
import GetMedia from "../utils/getMedia";

import "../css/Carpet.css";

export default function Carpet({ data, isDesktop }) {
  let [carpetData, setCarpetData] = React.useState();
  React.useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=="carpet"]{
    name,
    coverimage,
    year,
    price,
    dimensions,
    description,
    mediagallery,
    gridstructure,
    slug
}`
      )
      .then((data) => setCarpetData(data))
      .catch(console.error);
  }, []);

  const { id } = useParams();

  // Find the carpet object that matches the ID
  const carpet = carpetData?.find((carpet) => carpet.name.toLowerCase().replace(/ /g, "-") === id);

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
    const body = encodeURIComponent(`THE ${carpet.name} CARPET NEEDS TO BE MINE!`);

    const mailtoLink = `mailto:ciao@gg-office.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;
  }

  const ImageGrid = () => {
    let index = 0; // Initialize the index for slicing images
    return (
      <div className="imagegrid">
        {carpet.gridstructure ? (
          carpet.gridstructure.map((columnsInRow, rowIndex) => {
            const rowImages = carpet.mediagallery.slice(index, index + columnsInRow); // Slice the images for each row
            index += columnsInRow; // Update the index for the next row

            const rowStyles = {
              gridTemplateColumns: `repeat(${columnsInRow}, 1fr)`, // Use the value from gridStructure for this row
            };

            return (
              <div key={rowIndex} className="galleryRow" style={rowStyles}>
                {rowImages.map((image, imgIndex) => {
                  return <GetMedia file={image} key={imgIndex} />;
                })}
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

  const currentCarpetIndex = carpetData?.findIndex((carpet) => carpet.name.toLowerCase().replace(/ /g, "-") === id);

  let CarpetSpecifications = () => {
    return (
      <div className="carpetSpecifications-wrapper">
        {isDesktop ? (
          <>
            <div className="carpetSpecifications">
              <div>
                <span className="key">SIZE</span>
                <span className="value">{`${carpet.dimensions.width} × ${carpet.dimensions.height} CM`}</span>
              </div>
              <div>
                <span className="key">YEAR</span>
                <span className="value">{carpet.year}</span>
              </div>
              <div>
                <span className="key">PRICE</span>
                <span className="value">{carpet.price} EUR</span>
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
                <span className="value">{carpet.year}</span>
                <span className="value">{carpet.dimensions}</span>
                <span className="value">{carpet.price} EUR</span>
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

  const prevCarpet = currentCarpetIndex > 0 ? carpetData[currentCarpetIndex - 1] : null;
  const nextCarpet = currentCarpetIndex < carpetData.length - 1 ? carpetData[currentCarpetIndex + 1] : null;

  let ImageNavigation = () => {
    return (
      <div className="navigation-container">
        <div className="navigation-button">
          {/* Previous button */}
          <Link to={prevCarpet ? `/${prevCarpet.name.toLowerCase().replace(/ /g, "-")}` : "#"}>
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
          <Link to={nextCarpet ? `/${nextCarpet.name.toLowerCase().replace(/ /g, "-")}` : "#"}>
            <img className="customButton" src="/assets/img/buttons/next.svg" alt="Next" />
          </Link>
        </div>
      </div>
    );
  };

  if (!carpetData || carpetData.length === 0) {
    return <p>Loading...</p>;
  }

  console.log(carpetData, "carpet Data");

  return (
    <AnimatedPage>
      <main className="pageContainer">
        <div className="carpetContainer">
          <div className="carpetInfo">
            <h1 className="carpetTitle">{carpet.name}</h1>
            <p className="carpetDescription">
              <PortableText value={carpet.description} />
            </p>

            <CarpetSpecifications />
          </div>

          <ImageGrid />

          <ImageNavigation />
        </div>
      </main>
    </AnimatedPage>
  );
}
