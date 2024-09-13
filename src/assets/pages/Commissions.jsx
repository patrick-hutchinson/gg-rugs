import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import AnimatedPage from "../AnimatedPage";

import "../css/Commissions.css";
import ImageGallery from "../components/ImageGallery";

export default function Commissions({ data }) {
  //Declarations
  let pageContainerRef = React.useRef(null);

  // Scroll window to top on load
  useEffect(() => {
    if (pageContainerRef.current) {
      pageContainerRef.current.scrollTo({ top: 0, left: 0 });
      window.scrollTo({ top: 0, left: 0 });
    }
  }, []);

  const [imageData, setImageData] = useState();
  useEffect(() => {
    if (data) {
      setImageData(data.attributes.images.data);
    }
  }, [data]);

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
      `I NEED A RUG FROM YOU! Please, it has to be:\n\n Size: ${size}\nColors: ${colors}\nTheme: ${theme}\nDesign Own Rug: ${
        designOwnRug ? "Yes" : "No"
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

  return (
    <AnimatedPage>
      <main className="pageContainer" ref={pageContainerRef}>
        <div className="commissions">
          <ImageGallery imageData={imageData} />
          <div className="formWrapper">
            <h1>CREATE YOUR GGRUG</h1>
            <form onSubmit={handleSubmit}>
              <div className="alignTop">
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
              <div className="alignBottom">
                <div className="checkBoxContainer">
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
                  <img src="/assets/img/send.svg" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </AnimatedPage>
  );
}
