import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import AnimatedPage from "../AnimatedPage";

import { MouseEnterButton } from "../utils/MouseEnterButton";
import { MouseLeaveButton } from "../utils/MouseLeaveButton";

import sanityClient from "/src/client.js";

import { PortableText } from "@portabletext/react";
import GetMedia from "../utils/getMedia";

import "../css/Carpet.css";

export default function Carpet({ isDesktop }) {
  // let updatedCarpetOrder = [];
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

  let [homeData, setHomeData] = React.useState();
  React.useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "home"]{
  gridstructure[]{
    carpets[]->{
      _id,
      name,
      slug
    }
  }
}`
      )
      .then((data) => setHomeData(data))
      .catch(console.error);
  }, []);

  const { id } = useParams();

  const carpet = carpetData?.find((carpet) => carpet.slug.current === id);

  if (!carpet) {
    return <NotFound />;
  }

  // Compose Email when the user clicks "Buy"
  function handleBuyClick() {
    const subject = encodeURIComponent("I NEED IT!");
    const body = encodeURIComponent(`THE ${carpet.name} CARPET NEEDS TO BE MINE!`);

    const mailtoLink = `mailto:ciao@gg-rugs.com?subject=${subject}&body=${body}`;

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
                  return <GetMedia file={image} key={imgIndex} isFullscreenable={true} isDesktop={isDesktop} />;
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
                <span className="value">
                  {carpet?.price?.soldOut
                    ? "Sold Out"
                    : carpet?.price?.notForSale
                    ? "Not for Sale"
                    : `${carpet?.price?.price} EUR`}
                </span>
              </div>
            </div>
            <button
              className="buyButton customButton"
              onClick={handleBuyClick}
              onMouseEnter={(e) => MouseEnterButton(e)}
              onMouseLeave={(e) => MouseLeaveButton(e)}
            >
              <img src="/assets/img/buttons/buy.svg" />
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
                <span className="value">{`${carpet.dimensions.width} × ${carpet.dimensions.height} CM`}</span>
                <span className="value">{carpet.year}</span>
                <span className="value">
                  {carpet?.price?.soldOut
                    ? "Sold Out"
                    : carpet?.price?.notForSale
                    ? "Not for Sale"
                    : `${carpet?.price?.price} EUR`}
                </span>
              </div>
            </div>
            <button
              onClick={handleBuyClick}
              onMouseEnter={(e) => MouseEnterButton(e)}
              onMouseLeave={(e) => MouseLeaveButton(e)}
              class="customButton"
            >
              <img src="/assets/img/buttons/buy.svg" />
            </button>
          </>
        )}
      </div>
    );
  };

  console.log(carpetData, "carpet data");
  console.log(homeData, "home data");

  const reorderedCarpets = homeData[0].gridstructure.flatMap((group) => group.carpets || []);

  console.log(reorderedCarpets, "reorderd carpts");

  const currentCarpetIndex = reorderedCarpets?.findIndex((carpet) => carpet.slug.current === id);

  const prevIndex = (currentCarpetIndex - 1 + reorderedCarpets.length) % reorderedCarpets.length;
  const nextIndex = (currentCarpetIndex + 1) % reorderedCarpets.length;

  const prevCarpet = reorderedCarpets[prevIndex];
  const nextCarpet = reorderedCarpets[nextIndex];

  let ImageNavigation = () => {
    return (
      <div className="navigation-container">
        <div className="navigation-button">
          {/* Previous button */}
          <Link
            to={prevCarpet ? `/${prevCarpet.slug.current}` : "#"}
            onMouseEnter={(e) => MouseEnterButton(e)}
            onMouseLeave={(e) => MouseLeaveButton(e)}
          >
            <img className="customButton" src="/assets/img/buttons/prev.svg" alt="Previous" />
          </Link>
        </div>

        <div className="navigation-button">
          {/* Home button */}
          <Link to="/" onMouseEnter={(e) => MouseEnterButton(e)} onMouseLeave={(e) => MouseLeaveButton(e)}>
            <img className="customButton" src="/assets/img/buttons/all-rugs.svg" alt="All Rugs" />
          </Link>
        </div>

        <div className="navigation-button">
          {/* Next button */}
          <Link
            to={nextCarpet ? `/${nextCarpet.slug.current}` : "#"}
            onMouseEnter={(e) => MouseEnterButton(e)}
            onMouseLeave={(e) => MouseLeaveButton(e)}
          >
            <img className="customButton" src="/assets/img/buttons/next.svg" alt="Next" />
          </Link>
        </div>
      </div>
    );
  };

  if (!carpetData || carpetData.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <AnimatedPage>
      <main className="pageContainer">
        <div className="carpetContainer">
          <div className="carpetInfo">
            <h1 className="carpetTitle">{carpet.name}</h1>

            <PortableText className="carpetDescription" value={carpet.description} />

            <CarpetSpecifications />
          </div>

          <ImageGrid />

          <ImageNavigation />
        </div>
      </main>
    </AnimatedPage>
  );
}
