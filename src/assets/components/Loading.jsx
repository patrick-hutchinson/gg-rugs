const Loading = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <div>Loading...</div>
    </div>
  );
};

export default Loading;
