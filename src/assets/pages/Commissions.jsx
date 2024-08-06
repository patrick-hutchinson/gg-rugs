import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import AnimatedPage from "../AnimatedPage";

export default function Commissions(props) {
  let [data, setData] = React.useState();
  let pageContainerRef = React.useRef(null);

  let galleryRef = React.useRef(null);
  const scrollIntervalId = React.useRef(null);

  useEffect(() => {
    if (pageContainerRef.current) {
      pageContainerRef.current.scrollTo({ top: 0, left: 0 });
      window.scrollTo({ top: 0, left: 0 });
    }
  }, []);
  React.useEffect(() => {
    fetch(`${props.strapiBaseURL}/api/commission?populate=*`)
      .then((res) => res.json())
      .then((dataArray) => {
        setData(dataArray.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [imageCatalogue, setImageCatalogue] = useState(
    <div className="errorText">No preview Images available at the moment, sorry!</div>
  );

  useEffect(() => {
    if (data && data.attributes.commissionImages && data.attributes.commissionImages.data) {
      const images = data.attributes.commissionImages.data.map((image) => (
        <img src={`${image.attributes.url}`} key={image.id} alt="" />
      ));
      setImageCatalogue(images);
    }
  }, [data]);

  useEffect(() => {
    const galleryElement = galleryRef.current;

    const startAutoScroll = () => {
      if (galleryElement) {
        const scrollSpeed = 1; // Adjust this value to control the scroll speed
        scrollIntervalId.current = setInterval(() => {
          galleryElement.scrollBy({ top: scrollSpeed, behavior: "smooth" });
        }, 50); // Adjust the interval time to control the smoothness
      }
    };

    const stopAutoScroll = () => {
      if (scrollIntervalId.current) {
        clearInterval(scrollIntervalId.current);
      }
    };

    startAutoScroll();

    // Clean up interval on component unmount
    return () => stopAutoScroll();
  }, [imageCatalogue]);

  const pauseGalleryScroll = () => {
    if (scrollIntervalId.current) {
      clearInterval(scrollIntervalId.current);
    }
  };

  const continueGalleryScroll = () => {
    const galleryElement = galleryRef.current;
    if (galleryElement) {
      const scrollSpeed = 1; // Adjust this value to control the scroll speed
      scrollIntervalId.current = setInterval(() => {
        galleryElement.scrollBy({ top: scrollSpeed, behavior: "smooth" });
      }, 50); // Adjust the interval time to control the smoothness
    }
  };

  const [formData, setFormData] = useState({
    size: "",
    colors: "",
    theme: "",
    designOwnRug: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

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
        <Link to="/" className="backButton">
          <img src="/assets/img/backarrow.svg" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}></img>
        </Link>
        <div className="commissions">
          <div
            className="imageGallery"
            ref={galleryRef}
            onMouseEnter={pauseGalleryScroll}
            onMouseLeave={continueGalleryScroll}
          >
            {imageCatalogue}
          </div>
          <div className="rugForm">
            <h1>CREATE YOUR GGRUG</h1>
            <form onSubmit={handleSubmit}>
              <input type="text" name="size" placeholder="SIZE" value={formData.size} onChange={handleChange} />
              <input type="text" name="colors" placeholder="COLORS" value={formData.colors} onChange={handleChange} />
              <input
                type="text"
                name="theme"
                placeholder="SUBJECT/THEME"
                value={formData.theme}
                onChange={handleChange}
              />
              <div>
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
                <button className="submitButton" type="submit">
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
