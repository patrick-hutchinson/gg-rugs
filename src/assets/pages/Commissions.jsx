import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import AnimatedPage from "../AnimatedPage";

import "../css/Commissions.css";

export default function Commissions({ data }) {
  //   let [commissionsData, setCommissionsData] = useState();
  //   useEffect(() => {
  //     sanityClient
  //       .fetch(
  //         `*[_type=="project"]{
  //     name,
  //     coverimage,
  //     year,
  //     description,
  //     imagegallery,
  //     categories,
  //     credits,
  //     slug
  // }`
  //       )
  //       .then((data) => setCommissionsData(data))
  //       .catch(console.error);
  //   }, []);
  // Initialize formData
  const [formData, setFormData] = useState({
    size: "",
    colors: "",
    theme: "",
    designOwnRug: false,
  });

  // updateFormData on change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Compose Email on Button Click
  const handleSubmit = (e) => {
    e.preventDefault();
    const { size, colors, theme, designOwnRug } = formData;
    const mailtoLink = `mailto:ciao@gg-office.com?subject=DESIGN ME A RUG!&body=${encodeURIComponent(
      `I NEED A RUG FROM YOU! Please, it has to be:\n\n Size: ${size}\nColors: ${colors}\nTheme: ${theme}\n\n ${
        designOwnRug
          ? "Don't worry, I will design my own rug!"
          : "I don't want to design my rug, please do it for me! Should we start talking about this sometime soon?"
      }`
    )}`;
    window.location.href = mailtoLink;
  };

  // Alternate between Button SVG's
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

  const ImageGrid = () => {
    return (
      <div className="imagegrid">
        {data.attributes.imagegrid.map((row) => {
          let imageAmount = row.row.data.length;
          return (
            <div
              className="imagegrid-row"
              key={row.id}
              style={{
                gridTemplateColumns: `repeat(${imageAmount}, 1fr)`, // Dynamically set number of columns
              }}
            >
              {row.row.data.map((media) => (
                <div className="imagegrid-media" key={media.id}>
                  {media.attributes.mime.includes("image") ? (
                    <img src={media.attributes.url} alt={media.attributes.title} />
                  ) : media.attributes.mime.includes("video") ? (
                    <video autoPlay defaultMuted loop playsInline>
                      <source src={media.attributes.url} type={media.attributes.mime} />
                      Your browser does not support the video tag.
                    </video>
                  ) : null}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <AnimatedPage>
      <main className="pageContainer">
        {/* <Link to="/" className="backButton customButton desktop">
          <img
            src="/assets/img/buttons/backarrow.svg"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          ></img>
        </Link> */}

        <div className="carpetContainer">
          {data && <ImageGrid />}

          <div className="carpetInfo">
            <h1 className="carpetTitle">CREATE YOUR GGRUG</h1>
            <p className="carpetDescription">{data && data.attributes.description}</p>

            <form className="commissioninfo-wrapper" onSubmit={handleSubmit}>
              <div className="commissioninfo">
                <input type="text" name="size" placeholder="SIZE" value={formData.size} onChange={handleChange} />
                <input type="text" name="colors" placeholder="COLORS" value={formData.colors} onChange={handleChange} />
                <input
                  type="text"
                  name="theme"
                  placeholder="SUBJECT/THEME"
                  value={formData.theme}
                  onChange={handleChange}
                />
              </div>

              <div className="submission-wrapper">
                <div className="checkboxContainer">
                  <label>I DESIGN MY RUG</label>
                  <input
                    className="checkbox"
                    type="checkbox"
                    name="designOwnRug"
                    checked={formData.designOwnRug}
                    onChange={handleChange}
                  />
                </div>

                <button className="submitButton customButton" type="submit">
                  <img
                    src="/assets/img/buttons/send.svg"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </AnimatedPage>
  );
}
