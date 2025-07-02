const Loading = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: "0px",
        left: "0px",
        zIndex: 100,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          color: "#000",
          fontSize: "24px",
          lineHeight: "1",
          fontFamily: "Helvetica",
        }}
      >
        Loading...
      </div>
    </div>
  );
};

export default Loading;
