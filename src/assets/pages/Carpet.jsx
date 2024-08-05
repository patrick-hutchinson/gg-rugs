import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import AnimatedPage from "../AnimatedPage";

export default function Carpet(props) {
  let data = props.data;

  const { id } = useParams();

  // Find the carpet object that matches the ID
  const carpet = data?.find((carpet) => carpet.attributes.Title.toLowerCase().replace(/ /g, "-") === id);

  if (!carpet) {
    return <NotFound />;
  }

  // console.log();
  let imageCatalogue = <div className="errorText">Sorry, no images have been added yet — Check back soon!</div>;
  if (carpet.attributes.ExtraImages && carpet.attributes.ExtraImages.data) {
    imageCatalogue = carpet.attributes.otherImages.data.map((carpetImage) => {
      return <img src={`${carpetImage.attributes.url}`} key={carpetImage.id} alt="" />;
    });
  }

  function handleBuyClick() {
    window.location.href = "mailto:?subject=I%20need%20it!";
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
      <div className="pageContainer">
        <Link to="/" className="backButton">
          <img
            src="./src/assets/mat/svg/menu/backarrow.svg"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          ></img>
        </Link>
        <div className="carpetContainer">
          <div className="imageGallery">{imageCatalogue}</div>
          <div className="carpetInfo">
            <h1>{carpet.attributes.Title}</h1>
            <p className="description">{carpet.attributes.Description}</p>

            <ul className="carpetSpecifications">
              <li>
                <span className="category">SIZE:</span>
                {carpet.attributes.Size}
              </li>
              <li>
                <span className="category">YEAR:</span> {carpet.attributes.Year}
              </li>
              <li>
                <span className="category">PRICE:</span> {carpet.attributes.Price} Euro
              </li>
            </ul>
            <button className="buyButton" onClick={handleBuyClick}>
              <img
                src="./src/assets/mat/svg/menu/buy.svg"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              ></img>
            </button>
          </div>
        </div>
        ;
      </div>
    </AnimatedPage>
  );
}
