import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import AnimatedPage from "../AnimatedPage";

export default function Carpet(props) {
  let data = props.data;
  let pageContainerRef = useRef(null);

  let galleryRef = React.useRef(null);
  const scrollIntervalId = React.useRef(null);

  const [imageCatalogue, setImageCatalogue] = useState(
    <div className="errorText">No preview Images available at the moment, sorry!</div>
  );

  useEffect(() => {
    if (carpet && carpet.attributes.otherImages && carpet.attributes.otherImages.data) {
      const images = carpet.attributes.otherImages.data.map((image) => (
        <img src={`${image.attributes.url}`} key={image.id} alt="" />
      ));
      setImageCatalogue(images);
    }
  }, [data]);

  // AutoScroll ImageGallery
  useEffect(() => {
    if (props.isDesktop) {
      const galleryElement = galleryRef.current;

      const startAutoScroll = () => {
        if (galleryElement) {
          const scrollSpeed = 1; // Adjust this value to control the scroll speed
          scrollIntervalId.current = setInterval(() => {
            galleryElement.scrollBy({ top: scrollSpeed, behavior: "smooth" });
          }, 50); // Adjust the interval time to control the smoothness
        }
      };

      const stopAutoScroll = () => {
        if (scrollIntervalId.current) {
          clearInterval(scrollIntervalId.current);
        }
      };

      startAutoScroll();

      // Clean up interval on component unmount
      return () => stopAutoScroll();
    }
  }, [imageCatalogue]);

  const pauseGalleryScroll = () => {
    if (scrollIntervalId.current && props.isDesktop) {
      clearInterval(scrollIntervalId.current);
    }
  };

  const resumeGalleryScroll = () => {
    const galleryElement = galleryRef.current;
    if (galleryElement && props.isDesktop) {
      const scrollSpeed = 1; // Adjust this value to control the scroll speed
      scrollIntervalId.current = setInterval(() => {
        galleryElement.scrollBy({ top: scrollSpeed, behavior: "smooth" });
      }, 50); // Adjust the interval time to control the smoothness
    }
  };

  // Scroll window to top on Load
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

  // Compose Email when the user clicks "Buy"
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
          <div
            className="imageGallery"
            ref={galleryRef}
            onMouseEnter={pauseGalleryScroll}
            onMouseLeave={resumeGalleryScroll}
          >
            {imageCatalogue}
          </div>
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
