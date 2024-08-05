import React from "react";
import CSS from "../components/css/logo.module.css";

import letters from "../components/letters";

export default function OpeningPage(props) {
  // Animation to Close the Opening Page
  React.useEffect(() => {
    if (props.closeOpeningPage && props.isDesktop) {
      document.querySelector(`.${CSS.logoContainer}`).style.transform = "translate(-50%, 0%) scale(0.4)";
      document.querySelector(`.${CSS.logoContainer}`).style.top = "18px";

      setTimeout(() => {
        document.querySelector(`.${CSS.logoContainer}`).style.transformOrigin = "top left";
        document.querySelector(`.${CSS.logoContainer}`).style.transform = "translate(-0%, 0%) scale(0.4)";
        document.querySelector(`.${CSS.logoContainer}`).style.left = "15px";
      }, 300);
    } else if (props.closeOpeningPage && !props.isDesktop) {
      document.querySelector(`.${CSS.logoContainer}`).style.transform = "translate(-50%, 0%) scale(0.2)";
      document.querySelector(`.${CSS.logoContainer}`).style.top = "18px";

      setTimeout(() => {
        document.querySelector(`.${CSS.logoContainer}`).style.transformOrigin = "top left";
        document.querySelector(`.${CSS.logoContainer}`).style.transform = "translate(-0%, 0%) scale(0.2)";
        document.querySelector(`.${CSS.logoContainer}`).style.left = "15px";
      }, 300);
    }
  }, [props.closeOpeningPage]);

  // Add the points to each letter
  React.useEffect(() => {
    // Get the height of the letter svg's
    let element = document.querySelector(`.${CSS.letter} > img`);
    let elementHeight = parseInt(window.getComputedStyle(element).getPropertyValue("height"));

    // Calculate the distance between the highest and lowest point of a letter
    let smallestTop = Math.min(...letters.letterS.letterPoints.map((points) => points.top));

    let largestTop = Math.max(...letters.letterS.letterPoints.map((points) => points.top));

    let pointHeight = largestTop - smallestTop;

    // Calculate a scale value for the points so they always fit the letter
    let pointScale = elementHeight / pointHeight;

    Object.values(letters).forEach((letter) => {
      let leftValues = letter.letterPoints.map((points) => points.left);
      let topValues = letter.letterPoints.map((points) => points.top);
      let smallestLeft = Math.min(...leftValues);
      let smallestTop = Math.min(...topValues);

      let translateX = smallestLeft * (pointScale * 1.2);
      let translateY = smallestTop * (pointScale * 1.2);

      // For each object generate each point
      for (let i = 1; i < letter.letterPoints.length + 1; i++) {
        // Select the letterspecific html container to add the points to

        let className = `letterContainer_${letter.character}`;
        let classToSelect = CSS[className];

        document.querySelectorAll(`.${classToSelect}`).forEach((letterContainer) => {
          let letterPoint = document.createElement("div");
          letterPoint.classList.add(CSS.letter_point);

          //Assign the points positions
          letterPoint.style.left = letter.letterPoints[i - 1].left * pointScale - translateX + "px";
          letterPoint.style.top = letter.letterPoints[i - 1].top * pointScale - translateY + "px";

          letterContainer.append(letterPoint);
        });
      }
    });
  }, []);

  // Mouse Interaction

  let hoverInRadius = 40;
  let hoverOutRadius = 50;
  window.addEventListener("mousemove", (e) => {
    // Add Point Interaction
    document.querySelectorAll(`.${CSS.letter_point}`).forEach((letterPoint) => {
      let distanceLeft = e.clientX - letterPoint.getBoundingClientRect().left;
      let distanceTop = e.clientY - letterPoint.getBoundingClientRect().top;

      // If cursor is within the hoverInRadius, add the "bounce-in" animation
      if (
        distanceLeft > -hoverInRadius &&
        distanceLeft < hoverInRadius &&
        distanceTop > -hoverInRadius &&
        distanceTop < hoverInRadius
      ) {
        letterPoint.style.animationName = "bounce-in";
      }

      // If any of the distances to the poiint is larger than the hoverOutRadius, play the "bounce-out" animation
      if (
        distanceLeft < -hoverOutRadius ||
        distanceLeft > hoverOutRadius ||
        distanceTop < -hoverOutRadius ||
        (distanceTop > hoverOutRadius && letterPoint.style.animationName == "bounce-in")
      ) {
        letterPoint.style.animationName = "bounce-out";
      }
    });
  });

  window.addEventListener("resize", () => {
    scaleLogo();
  });

  React.useEffect(() => {
    scaleLogo();
  }, []);

  function scaleLogo() {
    let scaleFactor;

    if (props.isDesktop) {
      scaleFactor = window.innerWidth / window.innerHeight / 1.5;
      if (scaleFactor > 1.5) {
        scaleFactor = 1.5;
      }
    } else {
      scaleFactor = 0.4;
    }

    document.querySelector(`.${CSS.logoContainer}`).style.transform = `translate(-50%, -50%) scale(${scaleFactor}) `;
  }

  const imageUrls = [
    "/assets/img/00-GG-Rugs_G.svg",
    "/assets/img/01-GG-Rugs_R.svg",
    "/assets/img/02-GG-Rugs_U.svg",
    "/assets/img/03-GG-Rugs_S.svg",
    "/assets/img/about.svg",
    "/assets/img/about_focus.svg",
    "/assets/img/backarrow.svg",
    "/assets/img/backarrow_focus.svg",
    "/assets/img/buy.svg",
    "/assets/img/buy_focus.svg",
    "/assets/img/cart.svg",
    "/assets/img/close.svg",
    "/assets/img/commission.svg",
    "/assets/img/commission_focus.svg",
    "/assets/img/contact.svg",
    "/assets/img/contact_focus.svg",
    "/assets/img/eyes_reg.png",
    "/assets/img/eyes_down.png",
    "/assets/img/eyes_right.png",
    "/assets/img/eyes_up.png",
    "/assets/img/home.svg",
    "/assets/img/home_focus.svg",
    "/assets/img/menu.svg",
    "/assets/img/send.svg",
    "/assets/img/send_focus.svg",
    "/assets/img/take-a-look.svg",
    // "https://enduring-agreement-73590bea84.media.strapiapp.com/TERMINATOR_2e7d6fae36.mp4",
  ];

  const [isLoading, setIsLoading] = React.useState(true);

  const ImagePreloader = () => {
    React.useEffect(() => {
      let loadedCount = 0;
      const images = [];
      const videoUrls = imageUrls.filter((url) => url.endsWith(".mp4"));
      const imageUrlsOnly = imageUrls.filter((url) => !url.endsWith(".mp4"));

      const handleLoad = () => {
        loadedCount += 1;
        if (loadedCount === imageUrls.length) {
          setIsLoading(false);
          console.log("loaded all!");
        }
      };

      imageUrlsOnly.forEach((url) => {
        const img = new Image();
        img.src = url;
        img.onload = handleLoad;
        img.onerror = handleLoad; // Handle error case to avoid infinite loading
        images.push(img);
      });

      videoUrls.forEach((url) => {
        const video = document.createElement("video");
        video.src = url;
        video.onloadeddata = handleLoad;
        video.onerror = handleLoad;
      });
    }, []);

    return (
      <div>
        {isLoading ? (
          <div id="loading">
            <span>Loading...</span>
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div className="openingPage">
      <ImagePreloader />

      <div className={CSS.logoContainer}>
        <div className={`${CSS.letterContainer} ${CSS.letterContainer_G}`}>
          <div className={CSS.letter}>
            <img src="/assets/img/00-GG-Rugs_G.svg" />
          </div>
        </div>
        <div className={`${CSS.letterContainer} ${CSS.letterContainer_G}`}>
          <div className={CSS.letter}>
            <img src="/assets/img/00-GG-Rugs_G.svg" />
          </div>
        </div>
        <div className={`${CSS.letterContainer} ${CSS.letterContainer_R}`}>
          <div className={CSS.letter}>
            <img src="/assets/img/01-GG-Rugs_R.svg" />
          </div>
        </div>
        <div className={`${CSS.letterContainer} ${CSS.letterContainer_U}`}>
          <div className={CSS.letter}>
            <img src="/assets/img/02-GG-Rugs_U.svg" />
          </div>
        </div>
        <div className={`${CSS.letterContainer} ${CSS.letterContainer_G}`}>
          <div className={CSS.letter}>
            <img src="/assets/img/00-GG-Rugs_G.svg" />
          </div>
        </div>
        <div className={`${CSS.letterContainer} ${CSS.letterContainer_S}`}>
          <div className={CSS.letter}>
            <img src="/assets/img/03-GG-Rugs_S.svg" />
          </div>
        </div>
        <span className={CSS.trademark}>®</span>
        {/* </Link> */}
      </div>
    </div>
  );
}
