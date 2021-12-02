import { Circle } from "better-react-spinkit";

function Loading() {
  return (
    <center
      style={{
        display: "grid",
        placeItems: "center",
        height: "100vh",
      }}
    >
      <div>
        <img
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
          alt="just a image"
          style={{ marginBottom: 10 }}
          height={250}
        />
        <Circle type="Puff" color="#3CBC28" size={60} />
      </div>
    </center>
  );
}

export default Loading;
