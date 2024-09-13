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
          <div className="contacts-specific"></div>
          <div className="socials">
            <div>
              <a href="mailto:ciao@gg-office.com" target="blank">
                SHOOT US AN EMAIL
              </a>
            </div>
            <div className="instagram">
              <a href="https://www.instagram.com/gg__rugs/" target="blank">
                IG
              </a>
            </div>
          </div>
        </div>
      </main>
    </AnimatedPage>
  );
}
