import "regenerator-runtime/runtime";
import React, { Fragment, useEffect, useState, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import "./SearchModal.css";
import fanaIcon from "../../assets/fanaLogo.png";
import useTheme from "../../context/theme";

const SearchModal = ({ toggleSearchModal, searchSpeechModal }) => {
  const { themeMode } = useTheme();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const [colorIntensity, setColorIntensity] = useState(0);
  const [isIncreasing, setIsIncreasing] = useState(true); // To track the direction of change

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIntensity((prev) => {
        if (prev >= 255 && isIncreasing) {
          setIsIncreasing(false); // Switch to decreasing
          return 255;
        } else if (prev <= 0 && !isIncreasing) {
          setIsIncreasing(true); // Switch to increasing
          return 0;
        }
        return isIncreasing ? prev + 5 : prev - 5; // Adjust intensity
      });
    }, 50); // Adjust interval speed if needed

    return () => clearInterval(interval); // Clean up interval
  }, [isIncreasing]);

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }
    SpeechRecognition.startListening({ continuous: true, language: "en-US" });
    return () => {
      SpeechRecognition.stopListening();
    };
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
    <Fragment>
      <div
        className="search-modal fixed top-0 left-0 right-0 bottom-0"
        style={{ height: "100vh" , zIndex : "100000" }}
      >
        <div className="search-modal-content relative">
          <div
            className="waveform-bar absolute"
            style={{
              background:
                themeMode === "dark"
                  ? `linear-gradient(to top, rgba(
          ${Math.round(255 - (colorIntensity / 255) * (255 - 240))}, 
          ${Math.round(153 - (colorIntensity / 255) * (153 - 46))}, 
          ${Math.round(204 - (colorIntensity / 255) * (204 - 240))}, 0), 
          rgba(
          ${Math.round(255 - (colorIntensity / 255) * (255 - 240))}, 
          ${Math.round(153 - (colorIntensity / 255) * (153 - 46))}, 
          ${Math.round(204 - (colorIntensity / 255) * (204 - 240))}, 1))`
                  : `linear-gradient(to top, rgba(${colorIntensity}, ${
                      255 - colorIntensity
                    }, ${
                      128 + colorIntensity / 2
                    }, 0), rgba(${colorIntensity}, ${255 - colorIntensity}, ${
                      128 + colorIntensity / 2
                    }, 1))`,
              width: "100%",
              height: "25%",
              transition: "background 0.1s ease-in-out",
              bottom: "0",
              left: "0",
              transform : "rotate(180deg)"
            }}
          ></div>

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
          <div
            className="btn-holder absolute flex flex-row justify-center items-center"
            style={{ top: "82%", width: "100%", left: "0" }}
          >
            <button className="search-btn mx-4" onClick={handleSearchClick}>
              <img
                src={fanaIcon}
                alt="Custom Search Icon"
                className="search-btn-icon"
              />
            </button>
          </div>
        </div>
      </div>
    </Fragment>,
    document.getElementById("speech-recognition")
  );
};

export default SearchModal;
