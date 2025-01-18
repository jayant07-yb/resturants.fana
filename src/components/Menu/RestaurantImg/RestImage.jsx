import { Fragment } from "react";
import ThemeBtn from "../../Buttons/ThemeBtn";
import restaurant from "../../../assets/restaurant.jpeg";

const RestImage = () => {
  return (
    <Fragment>
      <div
        className="fixed top-0 left-0 w-full h-1/4"
        style={{
          backgroundImage: `url(${restaurant})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: "-1",
        }}
      >
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            height: "50%",
            background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0))",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent 60%)",
          }}
        />
        <div style={{ position: "absolute", top: "10px", right: "15px" }}>
          <ThemeBtn />
        </div>
      </div>
    </Fragment>
  );
};
export default RestImage;
