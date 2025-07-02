import React, { useEffect, useState, useRef } from "react";
import letters from "../components/letters";
import "../css/Logo.css";

import Loading from "./Loading";

export default function Logo({ setImagesLoaded }) {
  let wordArray = ["G", "G", "Dash", "R", "U", "G", "S"];
  const totalImages = wordArray.length;
  const [loadedCount, setLoadedCount] = useState(0);
  const imagesLoaded = loadedCount === totalImages;

  useEffect(() => {
    if (loadedCount === totalImages) {
      setImagesLoaded(true);
    }
  }, [loadedCount]);

  const letterPointsRef = useRef([]);
  let globalIndex = 0;

  const pointScale = 0.14;
  const dashPointScale = 0.54;

  let [offsetX, setOffsetX] = useState(null);
  let [offsetY, setOffsetY] = useState(null);

  useEffect(() => {
    // Work with the data gotten from letters.js
    const allLefts = [];
    const allTops = [];

    Object.values(letters).forEach((letter) => {
      letter.letterPoints.forEach((point) => {
        allLefts.push(point.left);
        allTops.push(point.top);
      });
    });

    const smallestLeft = Math.min(...allLefts);
    const smallestTop = Math.min(...allTops);

    const translateX = smallestLeft * (pointScale * 1.2);
    const translateY = smallestTop * (pointScale * 1.2);

    setOffsetX(translateX);
    setOffsetY(translateY);

    // Mouse Interaction
    const hoverInRadius = 40;
    const hoverOutRadius = 50;

    const handleMouseMove = (e) => {
      requestAnimationFrame(() => {
        letterPointsRef.current.forEach((letterPoint) => {
          const rect = letterPoint.getBoundingClientRect();
          const distanceLeft = e.clientX - rect.left;
          const distanceTop = e.clientY - rect.top;
          if (
            distanceLeft > -hoverInRadius &&
            distanceLeft < hoverInRadius &&
            distanceTop > -hoverInRadius &&
            distanceTop < hoverInRadius
          ) {
            letterPoint.style.animationName = "bounce-in";
          } else if (
            distanceLeft < -hoverOutRadius ||
            distanceLeft > hoverOutRadius ||
            distanceTop < -hoverOutRadius ||
            distanceTop > hoverOutRadius
          ) {
            if (letterPoint.style.animationName === "bounce-in") {
              letterPoint.style.animationName = "bounce-out";
            }
          }
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleImageLoad = () => {
    setLoadedCount((count) => count + 1);
    console.log("loaded image");
    console.log(imagesLoaded, "images loaded?");
  };

  // if (!imagesLoaded) {
  //   return <div>Loading images...</div>;
  // }

  const LetterPoints = ({ letter }) => {
    const filteredArray = Object.values(letters).filter((item) => item.character === letter);
    if (!filteredArray.length) return null;

    return (
      <>
        {filteredArray[0].letterPoints.map((point) => {
          const thisIndex = globalIndex++; // unique index per point

          if (letter === "Dash") {
            return (
              <div
                key={thisIndex}
                className="letter_point"
                style={{
                  left: point.left * dashPointScale - 375 + "px",
                  top: point.top * dashPointScale - 230 + "px",
                }}
                ref={(el) => {
                  if (el) letterPointsRef.current[thisIndex] = el;
                }}
              ></div>
            );
          }

          return (
            <div
              key={thisIndex}
              className="letter_point"
              style={{
                left: point.left * pointScale - offsetX + "px",
                top: point.top * pointScale - offsetY + "px",
              }}
              ref={(el) => {
                if (el) letterPointsRef.current[thisIndex] = el;
              }}
            ></div>
          );
        })}
      </>
    );
  };

  return (
    <>
      {/* {!imagesLoaded && <Loading />} */}
      {wordArray.map((letter, index) => (
        <div key={index} className="letterContainer" style={{ opacity: imagesLoaded ? 1 : 0 }}>
          <div className="letter">
            <img src={`/assets/img/GG-Rugs_${letter}.svg`} alt={letter} onLoad={handleImageLoad} />
          </div>
          <LetterPoints letter={letter} />
        </div>
      ))}
    </>
  );
}
