import React from "react";
import AnimatedPage from "../AnimatedPage";

export default function Contact(props) {
  let [data, setData] = React.useState();
  let [gifSource, setGifSource] = React.useState();

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
      setGifSource(`${data.backgroundVideo.data.attributes.url}`);
    }
  }, [data]);

  return (
    <AnimatedPage>
      <main className="pageContainer">
        <div className="videoContainer">
          <video>
            <source src=""></source>
          </video>
          <img src={gifSource}></img>
        </div>
        <div className="contact">
          <div className="contacts-specific">
            {/* <p>ciao@gg—office.com</p>
          <br />
          <p>
            CORSO-UMBERTO-I-N°5 <br />
            97015 MODICA (RG)
          </p>
          <br />
          <p>
            ENRICO GISANA <br />
            CREATIVE DIRECTOR <br />
            +39-392-2678491
          </p>
          <br />
          <p>
            FRANCESCA GIAMPICCOLO <br />
            CLIENT DIRECTOR <br />
            +39-329-1557393
          </p> */}
          </div>
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
