import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { PortableText } from "@portabletext/react";

import AnimatedPage from "../AnimatedPage";

import sanityClient from "/src/client.js";
import GetMedia from "../utils/getMedia";

import "../css/Commissions.css";

export default function Commissions() {
  let [commissionsData, setCommissionsData] = React.useState();
  React.useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=="commissions"]{
    description,
    mediagallery,
    gridstructure
}`
      )
      .then((data) => setCommissionsData(data))
      .catch(console.error);
  }, []);

  // Initialize formData
  const [formData, setFormData] = useState({
    size: "",
    colors: "",
    theme: "",
    designOwnRug: false,
  });

  // updateFormData on change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Compose Email on Button Click
  const handleSubmit = (e) => {
    e.preventDefault();
    const { size, colors, theme, designOwnRug } = formData;
    const mailtoLink = `mailto:ciao@gg-office.com?subject=DESIGN ME A RUG!&body=${encodeURIComponent(
      `I NEED A RUG FROM YOU! Please, it has to be:\n\n Size: ${size}\nColors: ${colors}\nTheme: ${theme}\n\n ${
        designOwnRug
          ? "Don't worry, I will design my own rug!"
          : "I don't want to design my rug, please do it for me! Should we start talking about this sometime soon?"
      }`
    )}`;
    window.location.href = mailtoLink;
  };

  // Alternate between Button SVG's
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

  if (!commissionsData || commissionsData.length === 0) {
    return <p>Loading...</p>;
  }

  let ImageGrid = () => {
    let index = 0; // Initialize the index for slicing images

    return (
      commissionsData[0].gridstructure &&
      commissionsData[0].gridstructure.map((columnsInRow, rowIndex) => {
        const rowImages = commissionsData[0].mediagallery.slice(index, index + columnsInRow); // Slice the images for each row
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
    );
  };

  return (
    <AnimatedPage>
      <main className="pageContainer">
        <div className="carpetContainer">
          <ImageGrid />

          <div className="carpetInfo">
            <h1 className="carpetTitle">CREATE YOUR GGRUG</h1>
            <p className="carpetDescription">
              {" "}
              <PortableText value={commissionsData[0].description} />
            </p>

            <form className="commissioninfo-wrapper" onSubmit={handleSubmit}>
              <div className="commissioninfo">
                <input type="text" name="size" placeholder="SIZE" value={formData.size} onChange={handleChange} />
                <input type="text" name="colors" placeholder="COLORS" value={formData.colors} onChange={handleChange} />
                <input
                  type="text"
                  name="theme"
                  placeholder="SUBJECT/THEME"
                  value={formData.theme}
                  onChange={handleChange}
                />
              </div>

              <div className="submission-wrapper">
                <div className="checkboxContainer">
                  <label>I DESIGN MY RUG</label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    name="designOwnRug"
                    checked={formData.designOwnRug}
                    onChange={handleChange}
                  />
                </div>

                <button className="submitButton customButton" type="submit">
                  <img
                    src="/assets/img/buttons/send.svg"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </AnimatedPage>
  );
}
