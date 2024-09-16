import React from "react";
import AnimatedPage from "../AnimatedPage";

import "../css/Contact.css";

export default function Contact({ data }) {
  let [videoSource, setVideoSource] = React.useState();

  React.useEffect(() => {
    if (data) {
      setVideoSource(`${data.attributes.video.data.attributes.url}`);
    }
  }, [data]);

  function handleMouseEnter(e) {
    const cursorImage = document.querySelector(".cursorImage > img");
    cursorImage.classList.remove("pulseCursor");
    cursorImage.classList.add("pulseCursor");

    const handleAnimationEnd = () => {
      cursorImage.classList.remove("pulseCursor");
      cursorImage.removeEventListener("animationend", handleAnimationEnd);
    };

    cursorImage.addEventListener("animationend", handleAnimationEnd);
  }

  function handleSeeMoreMouseLeave(e) {
    const cursorImage = document.querySelector(".cursorImage > img");

    const handleAnimationEnd = () => {
      cursorImage.classList.remove("pulseCursor");
      cursorImage.removeEventListener("animationend", handleAnimationEnd);
    };

    cursorImage.addEventListener("animationend", handleAnimationEnd);
  }

  return (
    <AnimatedPage>
      <main className="pageContainer contactPage">
        <div className="videoContainer">
          {videoSource && (
            <video autoPlay muted loop playsInline>
              <source src={videoSource} type="video/mp4" />
            </video>
          )}
        </div>

        <div className="contact">
          {/* <div className="desktop"></div> */}
          <div className="socials">
            <div>
              <a
                href="mailto:ciao@gg-office.com"
                target="blank"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleSeeMoreMouseLeave}
              >
                SHOOT US AN EMAIL
              </a>
            </div>
            <div className="instagram">
              <a
                href="https://www.instagram.com/gg__rugs/"
                target="blank"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleSeeMoreMouseLeave}
              >
                IG
              </a>
            </div>
          </div>
        </div>
      </main>
    </AnimatedPage>
  );
}
