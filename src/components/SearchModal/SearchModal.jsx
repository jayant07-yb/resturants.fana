import "regenerator-runtime/runtime";
import React, { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { motion } from "framer-motion";
import "./SearchModal.css";
import fanaIcon from "../../assets/fanaLogo.png";
import ReactDOM from "react-dom";
import ripple from "../../assets/ripple.svg";

const SearchModal = ({ toggleSearchModal, searchSpeechModal }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
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
    SpeechRecognition.stopListening();
    console.log(transcript);
    searchSpeechModal(transcript); // Send final transcript back
    toggleSearchModal();
  };

  const typingEffect = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05 },
    }),
  };

  return ReactDOM.createPortal(
    <div className="search-modal fixed top-0 left-0 right-0 bottom-0">
      <div className="search-modal-content">
        <div id="transcript" className="transcript-display">
          {transcript.split(" ").map((word, wordIndex) => (
            <span key={`word-${wordIndex}`} style={{ whiteSpace: "pre" }}>
              {word.split("").map((char, charIndex) => (
                <motion.span
                  key={`char-${wordIndex}-${charIndex}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: wordIndex * 0.3 + charIndex * 0.05 }}
                  style={{ display: "inline-block" }}
                >
                  {char}
                </motion.span>
              ))}
              {/* Add a space after each word except the last one */}
              {wordIndex < transcript.split(" ").length - 1 && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (wordIndex + 1) * 0.3 }}
                  style={{ display: "inline-block" }}
                >
                  {" "}
                </motion.span>
              )}
            </span>
          ))}
        </div>

        <button className="search-btn" onClick={handleSearchClick}>
          <img
            src={fanaIcon}
            alt="Custom Search Icon"
            className="search-btn-icon"
          />
        </button>
      </div>
    </div>,
    document.getElementById("speech-recognition")
  );
};

export default SearchModal;
