import React from "react";
import AnimatedPage from "../AnimatedPage";

export default function About(props) {
  let [data, setData] = React.useState();

  React.useEffect(() => {
    fetch(`${props.strapiBaseURL}/api/about`)
      .then((res) => res.json())
      .then((dataArray) => {
        setData(dataArray.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  React.useEffect(() => {
    const container = document.querySelector(".pistolContainer");

    const addWaterPistol = () => {
      let waterPistol = document.createElement("div");
      waterPistol.classList.add("waterPistol");
      waterPistol.textContent = `${data ? data.attributes.emoji : null}`;

      // Set random left position
      let randomLeft = Math.floor(Math.random() * window.innerWidth);
      waterPistol.style.left = `${randomLeft}px`;

      // Add animation and remove after animation ends
      waterPistol.style.animationName = "floatUp";
      waterPistol.addEventListener("animationend", () => {
        waterPistol.remove();
      });

      // Append to container
      container.appendChild(waterPistol);
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
  }, [data]);

  return (
    <AnimatedPage>
      <main className="pageContainer">
        <div className="pistolContainer"></div>
        <div className="about">
          <p>{data ? data.attributes.about : null}</p>
        </div>
      </main>
    </AnimatedPage>
  );
}
