import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import AnimatedPage from "../AnimatedPage";

import "../css/Carpet.css";
import ImageGallery from "../components/ImageGallery";

export default function Carpet({ data }) {
  let pageContainerRef = useRef(null);

  const [imageData, setImageData] = useState();

  // Scroll window to top on load
  useEffect(() => {
    if (pageContainerRef.current) {
      pageContainerRef.current.scrollTo({ top: 0, left: 0 });
      window.scrollTo({ top: 0, left: 0 });
    }
  }, []);
  const { id } = useParams();

  // Find the carpet object that matches the ID
  const carpet = data?.find((carpet) => carpet.attributes.title.toLowerCase().replace(/ /g, "-") === id);

  // Handle setting the image data inside a useEffect
  useEffect(() => {
    if (carpet) {
      setImageData(carpet.attributes.images.data);
    }
  }, [carpet]);

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

  return (
    <AnimatedPage>
      <div className="pageContainer" ref={pageContainerRef}>
        <Link to="/" className="backButton customButton">
          <img src="/assets/img/backarrow.svg" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}></img>
        </Link>
        <div className="carpetContainer">
          <ImageGallery imageData={imageData} />
          <div className="carpetInfo">
            <h1>{carpet.attributes.title}</h1>
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
          </div>
          <button className="buyButton customButton" onClick={handleBuyClick}>
            <img src="/assets/img/buy.svg" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}></img>
          </button>
        </div>
      </div>
    </AnimatedPage>
  );
}
