import React, { useState } from "react";
import { Link } from "react-router-dom";
import AnimatedPage from "../AnimatedPage";

export default function Commissions(props) {
  let [data, setData] = React.useState();

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
      <main className="pageContainer">
        <Link to="/" className="backButton">
          <img
            src="./src/assets/mat/svg/menu/backarrow.svg"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          ></img>
        </Link>
        <div className="commissions">
          <div className="imageGallery">
            <img src="./src/assets/mat/img/01.png" alt="Rug design 1" />
            <img src="./src/assets/mat/img/02.png" alt="Rug design 2" />
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
              <div className="checkBoxContainer">
                <input
                  className="checkbox"
                  type="checkbox"
                  name="designOwnRug"
                  checked={formData.designOwnRug}
                  onChange={handleChange}
                />
                <label>I DESIGN MY RUG</label>
              </div>

              <button className="submitButton" type="submit">
                <img
                  src="./src/assets/mat/svg/menu/send.svg"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              </button>
            </form>
          </div>
        </div>
      </main>
    </AnimatedPage>
  );
}
