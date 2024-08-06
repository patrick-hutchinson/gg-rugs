import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import AnimatedPage from "../AnimatedPage";

export default function Carpet(props) {
  let data = props.data;
  let pageContainerRef = React.useRef(null);

  useEffect(() => {
    if (pageContainerRef.current) {
      pageContainerRef.current.scrollTo({ top: 0, left: 0 });
      window.scrollTo({ top: 0, left: 0 });
    }
  }, []);
  const { id } = useParams();

  // Find the carpet object that matches the ID
  const carpet = data?.find((carpet) => carpet.attributes.name.toLowerCase().replace(/ /g, "-") === id);

  if (!carpet) {
    return <NotFound />;
  }

  let imageCatalogue = <div className="errorText">Sorry, no images have been added yet — Check back soon!</div>;
  if (carpet.attributes.otherImages && carpet.attributes.otherImages.data) {
    imageCatalogue = carpet.attributes.otherImages.data.map((carpetImage) => {
      return <img src={`${carpetImage.attributes.url}`} key={carpetImage.id} alt="" />;
    });
  }

  function handleBuyClick() {
    const subject = encodeURIComponent("I NEED IT!");
    const body = encodeURIComponent(`THE ${carpet.attributes.name} CARPET NEEDS TO BE MINE!`);

    const mailtoLink = `mailto:ciao@gg-office.com?subject=${subject}&body=${body}`;

    window.location.href = mailtoLink;
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

  return (
    <AnimatedPage>
      <div className="pageContainer" ref={pageContainerRef}>
        <Link to="/" className="backButton">
          <img src="/assets/img/backarrow.svg" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}></img>
        </Link>
        <div className="carpetContainer">
          <div className="imageGallery">{imageCatalogue}</div>
          <div className="carpetInfo">
            <h1>{carpet.attributes.name}</h1>
            <p className="description">{carpet.attributes.description}</p>

            <div className="carpetSpecifications">
              <ul>
                <li>SIZE</li>
                <li>YEAR</li>
                <li>PRICE</li>
              </ul>
              <ul>
                <li>{carpet.attributes.dimensions}</li>
                <li>{carpet.attributes.year}</li>
                <li>{carpet.attributes.price}</li>
              </ul>
            </div>
            <button className="buyButton" onClick={handleBuyClick}>
              <img src="/assets/img/buy.svg" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}></img>
            </button>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
