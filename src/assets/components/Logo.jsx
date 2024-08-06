import React, { useEffect, useRef } from "react";
import letters from "../components/letters";
import CSS from "./css/logo.module.css";

export default function Logo() {
  const letterPointsRef = useRef([]);

  useEffect(() => {
    // Cache the points elements
    letterPointsRef.current = document.querySelectorAll(`.${CSS.letter_point}`);

    // Add points to each letter
    const element = document.querySelector(`.${CSS.letter} > img`);
    const elementHeight = parseInt(window.getComputedStyle(element).getPropertyValue("height"));

    // Calculate the distance between the highest and lowest point of a letter
    const smallestTop = Math.min(...letters.letterS.letterPoints.map((points) => points.top));
    const largestTop = Math.max(...letters.letterS.letterPoints.map((points) => points.top));
    const pointHeight = largestTop - smallestTop;
    const pointScale = elementHeight / pointHeight;

    Object.values(letters).forEach((letter) => {
      const leftValues = letter.letterPoints.map((points) => points.left);
      const topValues = letter.letterPoints.map((points) => points.top);
      const smallestLeft = Math.min(...leftValues);
      const smallestTop = Math.min(...topValues);
      const translateX = smallestLeft * (pointScale * 1.2);
      const translateY = smallestTop * (pointScale * 1.2);

      letter.letterPoints.forEach((point, i) => {
        const className = `letterContainer_${letter.character}`;
        const classToSelect = CSS[className];

        document.querySelectorAll(`.${classToSelect}`).forEach((letterContainer) => {
          const letterPoint = document.createElement("div");
          letterPoint.classList.add(CSS.letter_point);

          letterPoint.style.left = point.left * pointScale - translateX + "px";
          letterPoint.style.top = point.top * pointScale - translateY + "px";

          letterContainer.append(letterPoint);
        });
      });
    });

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
      <div className={`${CSS.letterContainer} ${CSS.letterContainer_G}`}>
        <div className={CSS.letter}>
          <img src="/assets/img/00-GG-Rugs_G.svg" alt="G" />
        </div>
      </div>
      <div className={`${CSS.letterContainer} ${CSS.letterContainer_G}`}>
        <div className={CSS.letter}>
          <img src="/assets/img/00-GG-Rugs_G.svg" alt="G" />
        </div>
      </div>
      <div className={`${CSS.letterContainer} ${CSS.letterContainer_R}`}>
        <div className={CSS.letter}>
          <img src="/assets/img/01-GG-Rugs_R.svg" alt="R" />
        </div>
      </div>
      <div className={`${CSS.letterContainer} ${CSS.letterContainer_U}`}>
        <div className={CSS.letter}>
          <img src="/assets/img/02-GG-Rugs_U.svg" alt="U" />
        </div>
      </div>
      <div className={`${CSS.letterContainer} ${CSS.letterContainer_G}`}>
        <div className={CSS.letter}>
          <img src="/assets/img/00-GG-Rugs_G.svg" alt="G" />
        </div>
      </div>
      <div className={`${CSS.letterContainer} ${CSS.letterContainer_S}`}>
        <div className={CSS.letter}>
          <img src="/assets/img/03-GG-Rugs_S.svg" alt="S" />
        </div>
      </div>
      <span className={CSS.trademark}>®</span>
    </>
  );
}
