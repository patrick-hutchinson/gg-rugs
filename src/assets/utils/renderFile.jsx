import React, { useState } from "react";

export function renderFile(fileInfo, isFullscreenable, isDesktop) {
  const { src, extension } = fileInfo;
  const [isFullscreen, setIsFullscreen] = useState(false); // Track fullscreen state

  const imageExtensions = ["jpg", "jpeg", "png", "tif", "gif", "bmp", "webp", "svg"];
  const videoExtensions = ["mp4", "mov", "avi", "mkv", "webm"];

  function handleFullscreen(e) {
    // Prevent default behavior if it's not fullscreenable
    if (!isFullscreenable) return;

    // Toggle fullscreen state
    setIsFullscreen(true);
  }

  // Close the fullscreen media when clicking on it
  function closeFullscreen(e) {
    setIsFullscreen(false);
  }

  // Check if it's an image
  const isImage = imageExtensions.includes(extension);
  // Check if it's a video
  const isVideo = videoExtensions.includes(extension);

  return (
    <>
      {/* Conditionally render image or video */}
      {isImage && (
        <>
          {/* Regular image */}
          <img src={src} alt="Uploaded content" onClick={handleFullscreen} />

          {/* Fullscreen image overlay (only if not on desktop) */}
          {!isDesktop && isFullscreen && (
            <div
              className="fullscreen-container"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
                cursor: "zoom-out",
              }}
              onClick={closeFullscreen} // Close fullscreen when clicked
            >
              <img
                className="fullscreen"
                src={src}
                alt="Fullscreen content"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain", // or 'cover' depending on your preference
                }}
              />
            </div>
          )}
        </>
      )}

      {isVideo && (
        <>
          {/* Regular video */}
          <video autoPlay loop muted playsInline onClick={handleFullscreen}>
            <source src={src} type={`video/${extension}`} />
          </video>

          {/* Fullscreen video overlay (only if not on desktop) */}
          {!isDesktop && isFullscreen && (
            <div
              className="fullscreen-container"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
                cursor: "zoom-out",
              }}
              onClick={closeFullscreen} // Close fullscreen when clicked
            >
              <video
                className="fullscreen"
                autoPlay
                loop
                muted
                playsInline
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain", // Adjust this as per your preference
                }}
              >
                <source src={src} type={`video/${extension}`} />
              </video>
            </div>
          )}
        </>
      )}
    </>
  );
}
