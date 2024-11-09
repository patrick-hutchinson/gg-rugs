import React from "react";

import { MouseEnterButton } from "../../../utils/MouseEnterButton";
import { MouseLeaveButton } from "../../../utils/MouseLeaveButton";

export default function Form() {
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

  // Initialize formData
  const [formData, setFormData] = React.useState({
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

  return (
    <form className="commissioninfo-wrapper" onSubmit={handleSubmit}>
      <div className="commissioninfo">
        <input type="text" name="size" placeholder="SIZE" value={formData.size} onChange={handleChange} />
        <input type="text" name="colors" placeholder="COLORS" value={formData.colors} onChange={handleChange} />
        <input type="text" name="theme" placeholder="SUBJECT/THEME" value={formData.theme} onChange={handleChange} />
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

        <div
          className="submitButton customButton"
          onMouseEnter={(e) => MouseEnterButton(e)}
          onMouseLeave={(e) => MouseLeaveButton(e)}
          type="submit"
        >
          <img src="/assets/img/buttons/send.svg" />
        </div>
      </div>
    </form>
  );
}
