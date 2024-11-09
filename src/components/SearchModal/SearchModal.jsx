import "regenerator-runtime/runtime";
import React, { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "./SearchModal.css";
import fanaIcon from "../../assets/fanaLogo.png";

const SearchModal = ({ onClose, onTranscriptComplete }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    if (browserSupportsSpeechRecognition) {
      SpeechRecognition.startListening({ continuous: true, language: "en-US" });
    } else {
      alert("Your browser does not support speech recognition.");
    }
    // Clean up by stopping listening when the component unmounts
    return () => SpeechRecognition.stopListening();
  }, [browserSupportsSpeechRecognition]);

  const handleSearchClick = () => {
    SpeechRecognition.stopListening()
    onTranscriptComplete(transcript); // Send final transcript back
    onClose();
  };
  return (
    <div className="search-modal">
      <div className="search-modal-content">
        <div id="transcript" className="transcript-display">{transcript}</div>
        <button className="search-btn" onClick={handleSearchClick}>
          <img src={fanaIcon} alt="Custom Search Icon" className="search-btn-icon" />
        </button>
      </div>
    </div>
  );
};

export default SearchModal;
