import React, { useRef } from "react";
import "../css/ImageGallery.css";

export default function ImageGallery({ imageData }) {
  let imageGalleryRef = useRef(null);

  /* Match image navitgation to the corresponding image and scroll to it*/
  function handleClick(imageNumber) {
    let currentImage = imageGalleryRef.current.querySelector(`#image-${imageNumber}`);

    const galleryTop = imageGalleryRef.current.getBoundingClientRect().top;
    const imageTop = currentImage.getBoundingClientRect().top;

    imageGalleryRef.current.scrollTo({
      top: imageGalleryRef.current.scrollTop + (imageTop - galleryTop),
      behavior: "smooth",
    });
  }

  return imageData ? (
    <div className="imageContainer">
      <div className="imageGallery" ref={imageGalleryRef}>
        {/* Generate all of the Image Tags */}
        {imageData.map((image, i) => (
          <img src={`${image.attributes.url}`} id={`image-${i}`} key={image.id} alt="" />
        ))}
      </div>
      {/* Generate the Image Navigation */}
      <div className="imageNavigation desktop">
        {imageData.map((image, i) => (
          <div className="imageButton" key={image.id} onClick={() => handleClick(i)}></div>
        ))}
      </div>
    </div>
  ) : (
    <div className="errorText">No preview Images available at the moment, sorry!</div>
  );
}
