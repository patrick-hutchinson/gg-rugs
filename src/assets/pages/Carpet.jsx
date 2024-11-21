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
  let newCarpetOrder = [];
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
      _id
    }
  }
}`
      )
      .then((data) => setHomeData(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    console.log(newCarpetOrder, "newCarpetOrder");
  }, [newCarpetOrder]);

  const { id } = useParams();

  const carpet = carpetData?.find((carpet) => carpet.slug.current === id);

  if (!carpet) {
    return <NotFound />;
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
                <span className="value">{carpet.price.soldOut ? "Sold Out" : carpet.price.price + " EUR"}</span>
              </div>
            </div>
            <button
              className="buyButton"
              onClick={handleBuyClick}
              onMouseEnter={(e) => MouseEnterButton(e)}
              onMouseLeave={(e) => MouseLeaveButton(e)}
            >
              <img className="customButton" src="/assets/img/buttons/buy.svg" />
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
                <span className="value">{carpet.price.soldOut ? "Sold Out" : carpet.price.price + " EUR"}</span>
              </div>
            </div>
            <button
              className="buyButton"
              onClick={handleBuyClick}
              onMouseEnter={(e) => MouseEnterButton(e)}
              onMouseLeave={(e) => MouseLeaveButton(e)}
            >
              <img class="customButton" src="/assets/img/buttons/buy.svg" />
            </button>
          </>
        )}
      </div>
    );
  };

  const currentCarpetIndex = carpetData?.findIndex((carpet) => carpet.slug.current === id);

  const prevCarpet = currentCarpetIndex > 0 ? carpetData[currentCarpetIndex - 1] : null;
  const nextCarpet = currentCarpetIndex < carpetData.length - 1 ? carpetData[currentCarpetIndex + 1] : null;

  homeData &&
    homeData[0] &&
    homeData[0].gridstructure &&
    homeData[0].gridstructure.forEach((row) => {
      row.carpets.forEach((carpet) => {
        newCarpetOrder.push(carpet);
      });
    });

  // Log the homeData so each carpet is listed in order of it's position, merging rows. Then don't change the carpet index for navigation, but compare the current number with the order number (position in the new positionArray) and select the carpet based on that

  let ImageNavigation = () => {
    return (
      <div className="navigation-container">
        <div className="navigation-button">
          {/* Previous button */}
          <Link
            to={prevCarpet ? `/${prevCarpet.name.toLowerCase().replace(/ /g, "-")}` : "#"}
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
            to={nextCarpet ? `/${nextCarpet.name.toLowerCase().replace(/ /g, "-")}` : "#"}
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
