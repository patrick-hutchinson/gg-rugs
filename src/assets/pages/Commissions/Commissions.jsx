import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { PortableText } from "@portabletext/react";

import AnimatedPage from "../../AnimatedPage";

import sanityClient from "/src/client.js";
import GetMedia from "../../utils/getMedia";

import Form from "./components/Form";

import "./styles/Commissions.css";

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

  if (!commissionsData || commissionsData.length === 0) {
    return <p>Loading...</p>;
  }

  const ImageGrid = React.memo(() => {
    let index = 0;
    return (
      commissionsData[0].gridstructure &&
      commissionsData[0].gridstructure.map((columnsInRow, rowIndex) => {
        const rowImages = commissionsData[0].mediagallery.slice(index, index + columnsInRow);
        index += columnsInRow;
        const rowStyles = { gridTemplateColumns: `repeat(${columnsInRow}, 1fr)` };
        return (
          <div key={rowIndex} className="galleryRow" style={rowStyles}>
            {rowImages.map((image, imgIndex) => (
              <GetMedia file={image} key={imgIndex} />
            ))}
          </div>
        );
      })
    );
  });

  return (
    <AnimatedPage>
      <main className="pageContainer commissions">
        <div className="carpetContainer">
          <div className="carpetInfo">
            <h1 className="carpetTitle">CREATE YOUR GGRUG</h1>
            <p className="carpetDescription">
              <PortableText value={commissionsData[0].description} />
            </p>

            <Form />
          </div>
          <ImageGrid />
        </div>
      </main>
    </AnimatedPage>
  );
}
