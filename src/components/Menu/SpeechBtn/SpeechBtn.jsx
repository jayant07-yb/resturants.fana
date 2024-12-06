import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

const SpeechBtn = ({speechData , toggleSearchModal , foodData}) => {
  return (
    <Fragment>
      {!speechData.isOpen && (
        <button
          className="floating-mic-btn"
          onClick={toggleSearchModal}
          style={{
            position: "fixed",
            bottom: foodData.length ? "12%" : "3%", // Adjusts position based on cart presence
            right: "20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "50%",
            height: "6%",
            width: "6vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: "1500",
          }}
        >
          <FontAwesomeIcon icon={faMicrophone} />
        </button>
      )}
    </Fragment>
  );
};
export default SpeechBtn;
