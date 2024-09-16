import React, { useEffect, useRef } from "react";
import letters from "../components/letters";
import "../css/Logo.css";

export default function Logo() {
  const letterPointsRef = useRef([]);

  useEffect(() => {
    // Get the height css height of any letter SVG for reference, here the first is chosen
    const element = document.querySelector(`.letter > img`);
    const elementHeight = parseInt(window.getComputedStyle(element).getPropertyValue("height"));

    // Calculate the distance between the highest and lowest point of a letter and determine scale
    const smallestTop = Math.min(...letters.letterS.letterPoints.map((points) => points.top));
    const largestTop = Math.max(...letters.letterS.letterPoints.map((points) => points.top));
    const pointHeight = largestTop - smallestTop;
    const pointScale = elementHeight / pointHeight;

    // Collect all letter point elements after they are created
    const letterPointElements = [];

    // Work with the data gotten from letters.js
    Object.values(letters).forEach((letter) => {
      const leftValues = letter.letterPoints.map((points) => points.left);
      const topValues = letter.letterPoints.map((points) => points.top);
      const smallestLeft = Math.min(...leftValues);
      const smallestTop = Math.min(...topValues);

      //Translation adjustments to make the letters fit onto the image
      const translateX = smallestLeft * (pointScale * 1.2);
      const translateY = smallestTop * (pointScale * 1.2);

      letter.letterPoints.forEach((point) => {
        //Select the correct lettercontainer to add the points into
        const className = `.letterContainer_${letter.character}`;

        // For each lettercontainer, create and append the points
        document.querySelectorAll(className).forEach((letterContainer) => {
          console.log(`${className}`, "className");

          const letterPoint = document.createElement("div");
          letterPoint.classList.add("letter_point");

          letterPoint.style.left = point.left * pointScale - translateX + "px";
          letterPoint.style.top = point.top * pointScale - translateY + "px";

          letterContainer.append(letterPoint);
          letterPointElements.push(letterPoint); // Collect the created elements
        });
      });
    });

    // Update the ref after elements are created
    letterPointsRef.current = letterPointElements;

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

  return (
    <>
      <div className="letterContainer letterContainer_G">
        <div className="letter">
          <img src="/assets/img/00-GG-Rugs_G.svg" alt="G" />
        </div>
      </div>
      <div className="letterContainer letterContainer_G">
        <div className="letter">
          <img src="/assets/img/00-GG-Rugs_G.svg" alt="G" />
        </div>
      </div>
      <div className="letterContainer letterContainer_R">
        <div className="letter">
          <img src="/assets/img/01-GG-Rugs_R.svg" alt="R" />
        </div>
      </div>
      <div className="letterContainer letterContainer_U">
        <div className="letter">
          <img src="/assets/img/02-GG-Rugs_U.svg" alt="U" />
        </div>
      </div>
      <div className="letterContainer letterContainer_G">
        <div className="letter">
          <img src="/assets/img/00-GG-Rugs_G.svg" alt="G" />
        </div>
      </div>
      <div className="letterContainer letterContainer_S">
        <div className="letter">
          <img src="/assets/img/03-GG-Rugs_S.svg" alt="S" />
        </div>
      </div>
      <span className="trademark">®</span>
    </>
  );
}
