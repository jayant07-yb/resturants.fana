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
            bottom: foodData.length ? "12%" : "20px", // Adjusts position based on cart presence
            right: "20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: "9999",
          }}
        >
          <FontAwesomeIcon icon={faMicrophone} />
        </button>
      )}
    </Fragment>
  );
};
export default SpeechBtn;
