import React from "react";
import sanityClient from "/src/client.js";
import { PortableText } from "@portabletext/react";

import AnimatedPage from "../AnimatedPage";

import "../css/About.css";

export default function About() {
  let [aboutData, setAboutData] = React.useState();
  let emojiContainerRef = React.useRef(null);

  React.useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=="about"]{
    biography,
    emoji
}`
      )
      .then((data) => setAboutData(data))
      .catch(console.error);
  }, []);

  React.useEffect(() => {
    const addWaterPistol = () => {
      let waterPistol = document.createElement("div");
      waterPistol.classList.add("waterPistol");
      waterPistol.textContent = aboutData[0].emoji;

      // Set random left position
      let randomLeft = Math.floor(Math.random() * window.innerWidth);
      waterPistol.style.left = `${randomLeft}px`;

      // Add animation and remove after animation ends
      waterPistol.style.animationName = "floatUp";
      waterPistol.addEventListener("animationend", () => {
        waterPistol.remove();
      });

      // Append to container
      emojiContainerRef.current.appendChild(waterPistol);
    };

    // Add a new waterPistol every 0.2 seconds
    let pistolInterval;
    if (window.innerWidth > 1000) {
      pistolInterval = 200;
    }
    if (window.innerWidth < 1000) {
      pistolInterval = 400;
    }
    const intervalId = setInterval(addWaterPistol, pistolInterval);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [aboutData]);

  if (!aboutData || aboutData.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <AnimatedPage>
      <main className="pageContainer">
        <div className="pistolContainer" ref={emojiContainerRef}></div>
        <div className="about">
          <PortableText value={aboutData[0].biography} />
        </div>
      </main>
    </AnimatedPage>
  );
}
