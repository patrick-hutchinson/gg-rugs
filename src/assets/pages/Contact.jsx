import React from "react";
import AnimatedPage from "../AnimatedPage";

import "../css/Contact.css";
import sanityClient from "/src/client.js";

import GetMedia from "../utils/getMedia";

export default function Contact({ data }) {
  let [contactData, setContactData] = React.useState();
  React.useEffect(() => {
    sanityClient
      .fetch(
        `*[_type=="contact"]{
    backgroundmedia
}`
      )
      .then((data) => setContactData(data))
      .catch(console.error);
  }, []);

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

  if (!contactData || contactData.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <AnimatedPage>
      <main className="pageContainer contactPage">
        <div className="videoContainer">
          <GetMedia file={contactData[0].backgroundmedia} />
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
