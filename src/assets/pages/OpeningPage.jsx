import React from "react";
import CSS from "../components/css/logo.module.css";

export default function OpeningPage(props) {
  let letters = {
    letterG: {
      character: "G",
      letterPoints: [
        { left: 981, top: 355 },
        { left: 945, top: 283 },
        { left: 883, top: 226 },
        { left: 811, top: 184 },
        { left: 729, top: 159 },
        { left: 646, top: 148 },
        { left: 561, top: 148 },
        { left: 478, top: 165 },
        { left: 400, top: 197 },
        { left: 330, top: 243 },
        { left: 271, top: 305 },
        { left: 224, top: 374 },
        { left: 193, top: 453 },
        { left: 176, top: 535 },
        { left: 172, top: 620 },
        { left: 182, top: 702 },
        { left: 204, top: 784 },
        { left: 242, top: 861 },
        { left: 293, top: 927 },
        { left: 357, top: 981 },
        { left: 433, top: 1020 },
        { left: 513, top: 1045 },
        { left: 597, top: 1052 },
        { left: 682, top: 1045 },
        { left: 762, top: 1019 },
        { left: 833, top: 977 },
        { left: 866, top: 965 },
        { left: 865, top: 1052 },
        { left: 946, top: 1052 },
        { left: 1027, top: 1052 },
        { left: 1027, top: 970 },
        { left: 1027, top: 888 },
        { left: 1027, top: 807 },
        { left: 1027, top: 725 },
        { left: 1027, top: 643 },
        { left: 1027, top: 562 },
        { left: 941, top: 562 },
        { left: 854, top: 562 },
        { left: 768, top: 562 },
        { left: 682, top: 562 },
        { left: 596, top: 562 },
        { left: 596, top: 642 },
        { left: 596, top: 723 },
        { left: 682, top: 723 },
        { left: 768, top: 723 },
        { left: 853, top: 726 },
        { left: 840, top: 806 },
        { left: 778, top: 865 },
        { left: 699, top: 897 },
        { left: 615, top: 905 },
        { left: 531, top: 890 },
        { left: 456, top: 851 },
        { left: 399, top: 787 },
        { left: 366, top: 709 },
        { left: 352, top: 625 },
        { left: 356, top: 540 },
        { left: 378, top: 457 },
        { left: 421, top: 384 },
        { left: 486, top: 330 },
        { left: 567, top: 303 },
        { left: 652, top: 301 },
        { left: 735, top: 318 },
        { left: 807, top: 362 },
        { left: 853, top: 435 },
        { left: 934, top: 435 },
        { left: 1015, top: 435 },
        { left: 1015, top: 435 },
      ],
    },
    letterR: {
      character: "R",
      letterPoints: [
        { left: 904, top: 567 },
        { left: 947, top: 492 },
        { left: 956, top: 405 },
        { left: 940, top: 323 },
        { left: 898, top: 248 },
        { left: 831, top: 193 },
        { left: 749, top: 162 },
        { left: 664, top: 149 },
        { left: 579, top: 147 },
        { left: 494, top: 147 },
        { left: 410, top: 147 },
        { left: 325, top: 147 },
        { left: 241, top: 147 },
        { left: 241, top: 229 },
        { left: 241, top: 312 },
        { left: 241, top: 394 },
        { left: 241, top: 477 },
        { left: 241, top: 558 },
        { left: 241, top: 641 },
        { left: 241, top: 724 },
        { left: 241, top: 805 },
        { left: 241, top: 880 },
        { left: 241, top: 970 },
        { left: 241, top: 1052 },
        { left: 322, top: 1052 },
        { left: 403, top: 1052 },
        { left: 403, top: 970 },
        { left: 403, top: 888 },
        { left: 403, top: 805 },
        { left: 403, top: 723 },
        { left: 485, top: 723 },
        { left: 568, top: 723 },
        { left: 650, top: 727 },
        { left: 730, top: 749 },
        { left: 788, top: 805 },
        { left: 797, top: 886 },
        { left: 797, top: 969 },
        { left: 797, top: 1052 },
        { left: 870, top: 1052 },
        { left: 958, top: 1052 },
        { left: 958, top: 974 },
        { left: 958, top: 897 },
        { left: 958, top: 819 },
        { left: 939, top: 744 },
        { left: 892, top: 683 },
        { left: 793, top: 633 },
        { left: 843, top: 624 },
        { left: 782, top: 384 },
        { left: 734, top: 317 },
        { left: 654, top: 290 },
        { left: 571, top: 287 },
        { left: 487, top: 288 },
        { left: 405, top: 300 },
        { left: 402, top: 383 },
        { left: 402, top: 466 },
        { left: 402, top: 548 },
        { left: 487, top: 562 },
        { left: 571, top: 562 },
        { left: 656, top: 558 },
        { left: 730, top: 534 },
        { left: 782, top: 467 },
      ],
    },
    letterU: {
      character: "U",
      letterPoints: [
        { left: 888, top: 147 },
        { left: 802, top: 147 },
        { left: 802, top: 230 },
        { left: 802, top: 312 },
        { left: 802, top: 394 },
        { left: 802, top: 476 },
        { left: 802, top: 559 },
        { left: 802, top: 642 },
        { left: 798, top: 723 },
        { left: 774, top: 801 },
        { left: 718, top: 861 },
        { left: 641, top: 889 },
        { left: 559, top: 889 },
        { left: 482, top: 860 },
        { left: 426, top: 801 },
        { left: 401, top: 724 },
        { left: 397, top: 642 },
        { left: 398, top: 560 },
        { left: 398, top: 478 },
        { left: 398, top: 395 },
        { left: 398, top: 313 },
        { left: 398, top: 230 },
        { left: 398, top: 147 },
        { left: 312, top: 147 },
        { left: 225, top: 147 },
        { left: 225, top: 230 },
        { left: 225, top: 315 },
        { left: 225, top: 399 },
        { left: 225, top: 483 },
        { left: 225, top: 566 },
        { left: 225, top: 650 },
        { left: 228, top: 734 },
        { left: 244, top: 816 },
        { left: 277, top: 893 },
        { left: 329, top: 958 },
        { left: 397, top: 1007 },
        { left: 475, top: 1037 },
        { left: 558, top: 1052 },
        { left: 642, top: 1051 },
        { left: 724, top: 1037 },
        { left: 802, top: 1007 },
        { left: 870, top: 958 },
        { left: 923, top: 893 },
        { left: 956, top: 817 },
        { left: 972, top: 735 },
        { left: 975, top: 650 },
        { left: 975, top: 566 },
        { left: 975, top: 483 },
        { left: 975, top: 399 },
        { left: 975, top: 315 },
        { left: 975, top: 231 },
        { left: 975, top: 147 },
      ],
    },
    letterS: {
      character: "S",
      letterPoints: [
        { left: 947, top: 353 },
        { left: 909, top: 278 },
        { left: 850, top: 219 },
        { left: 777, top: 179 },
        { left: 696, top: 156 },
        { left: 614, top: 148 },
        { left: 531, top: 150 },
        { left: 448, top: 165 },
        { left: 372, top: 197 },
        { left: 307, top: 249 },
        { left: 262, top: 319 },
        { left: 245, top: 400 },
        { left: 254, top: 482 },
        { left: 293, top: 556 },
        { left: 356, top: 611 },
        { left: 432, top: 645 },
        { left: 514, top: 662 },
        { left: 596, top: 676 },
        { left: 679, top: 690 },
        { left: 758, top: 715 },
        { left: 814, top: 774 },
        { left: 795, top: 852 },
        { left: 723, top: 892 },
        { left: 641, top: 905 },
        { left: 558, top: 901 },
        { left: 478, top: 876 },
        { left: 415, top: 823 },
        { left: 384, top: 745 },
        { left: 303, top: 745 },
        { left: 222, top: 745 },
        { left: 237, top: 828 },
        { left: 273, top: 903 },
        { left: 330, top: 964 },
        { left: 400, top: 1008 },
        { left: 479, top: 1035 },
        { left: 561, top: 1049 },
        { left: 645, top: 1051 },
        { left: 727, top: 1042 },
        { left: 808, top: 1020 },
        { left: 882, top: 980 },
        { left: 940, top: 921 },
        { left: 973, top: 844 },
        { left: 977, top: 762 },
        { left: 957, top: 681 },
        { left: 907, top: 614 },
        { left: 837, top: 569 },
        { left: 758, top: 542 },
        { left: 676, top: 527 },
        { left: 594, top: 512 },
        { left: 512, top: 496 },
        { left: 435, top: 463 },
        { left: 407, top: 389 },
        { left: 456, top: 324 },
        { left: 534, top: 298 },
        { left: 618, top: 295 },
        { left: 700, top: 311 },
        { left: 768, top: 357 },
        { left: 801, top: 434 },
        { left: 882, top: 434 },
        { left: 962, top: 434 },
      ],
    },
  };

  // Declare global variables
  let hoverInRadius = 40;
  let hoverOutRadius = 50;

  // Animation to Close the Opening Page
  React.useEffect(() => {
    if (props.closeOpeningPage && props.isDesktop) {
      document.querySelector(`.${CSS.logoContainer}`).style.transform = "translate(-50%, 0%) scale(0.4)";
      document.querySelector(`.${CSS.logoContainer}`).style.top = "15px";

      setTimeout(() => {
        document.querySelector(`.${CSS.logoContainer}`).style.transformOrigin = "top left";
        document.querySelector(`.${CSS.logoContainer}`).style.transform = "translate(-0%, 0%) scale(0.4)";
        document.querySelector(`.${CSS.logoContainer}`).style.left = "15px";
      }, 300);
    } else if (props.closeOpeningPage && !props.isDesktop) {
      document.querySelector(`.${CSS.logoContainer}`).style.transform = "translate(-50%, 0%) scale(0.2)";
      document.querySelector(`.${CSS.logoContainer}`).style.top = "15px";

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

  window.addEventListener("load", () => {
    scaleLogo();
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

  return (
    <div className="openingPage">
      <div className={CSS.logoContainer}>
        {/* <Link to="/"> */}
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
