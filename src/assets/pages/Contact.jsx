import React from "react";
import AnimatedPage from "../AnimatedPage";

import "../css/Contact.css";
import sanityClient from "/src/client.js";

import GetMedia from "../utils/getMedia";

import { MouseEnterButton } from "../utils/MouseEnterButton";
import { MouseLeaveButton } from "../utils/MouseLeaveButton";

export default function Contact() {
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
            <a
              href="mailto:ciao@gg-rugs.com"
              target="_blank"
              onMouseEnter={(e) => MouseEnterButton(e)}
              onMouseLeave={(e) => MouseLeaveButton(e)}
              className="customButton"
            >
              <img src="/assets/img/buttons/shoot-us-an-email.svg" alt="" />
            </a>
          </div>
        </div>
      </main>
    </AnimatedPage>
  );
}
