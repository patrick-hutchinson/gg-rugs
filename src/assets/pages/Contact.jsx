import React from "react";
import AnimatedPage from "../AnimatedPage";

export default function Contact(props) {
  let [data, setData] = React.useState();
  let [videoSource, setVideoSource] = React.useState();

  React.useEffect(() => {
    fetch(`${props.strapiBaseURL}/api/contact?populate=*`)
      .then((res) => res.json())
      .then((dataArray) => {
        setData(dataArray.data.attributes);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  React.useEffect(() => {
    if (data) {
      setVideoSource(`${data.backgroundVideo.data.attributes.url}`);
    }
  }, [data]);

  return (
    <AnimatedPage>
      <main className="pageContainer">
        <div className="videoContainer">
          {videoSource && (
            <video autoPlay muted loop>
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
