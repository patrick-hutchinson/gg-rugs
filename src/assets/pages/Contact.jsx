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
    let currentSource = e.target.getAttribute("src");
    let splicedSource = currentSource.slice(0, -4) + "_focus.svg";

    e.target.setAttribute("src", splicedSource);
  }
  function handleMouseLeave(e) {
    let currentSource = e.target.getAttribute("src");
    let splicedSource = currentSource.slice(0, -10) + ".svg";

    e.target.setAttribute("src", splicedSource);
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
          <div className="email">
            <a href="mailto:ciao@gg-rugs.com" target="_blank">
              <img
                className="customButton"
                src="/assets/img/buttons/shoot-us-an-email.svg"
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                alt=""
              />
            </a>
          </div>
        </div>
      </main>
    </AnimatedPage>
  );
}
