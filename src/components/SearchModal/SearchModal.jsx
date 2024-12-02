import "regenerator-runtime/runtime";
import React, { Fragment, useEffect, useState, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import "./SearchModal.css";
// import "./style.css";
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

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }
    SpeechRecognition.startListening({ continuous: true, language: "en-US" });

    // Setting up Web Audio API
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        audioContextRef.current = new (window.AudioContext ||
          window.webkitAudioContext)();
        const audioContext = audioContextRef.current;

        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();

        analyser.fftSize = 256; // Lower FFT for simplicity
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        source.connect(analyser);

        analyserRef.current = analyser;
        dataArrayRef.current = dataArray;

        // Start updating the color intensity
        updateWaveform();
      })
      .catch((err) => {
        console.error("Error accessing microphone:", err);
      });

    // Clean up by stopping listening when the component unmounts
    return () => {
      SpeechRecognition.stopListening();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [browserSupportsSpeechRecognition]);

  const updateWaveform = () => {
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;

    const update = () => {
      if (!analyser) return;

      analyser.getByteFrequencyData(dataArray);
      const avgFrequency =
        dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

      // Map the average frequency to a color intensity (0 to 255)
      const intensity = Math.min(255, Math.max(0, avgFrequency));
      setColorIntensity(intensity);

      requestAnimationFrame(update);
    };

    update();
  };

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
      <div className="search-modal fixed top-0 left-0 right-0 bottom-0" style={{height : "100vh"}}>
        <div className="search-modal-content relative">
          <div
            className="waveform-bar absolute"
            style={{
              background:
                themeMode == "dark"
                  ? `rgb(
                  ${Math.round(255 - (colorIntensity / 255) * (255 - 240))}, 
                  ${Math.round(153 - (colorIntensity / 255) * (153 - 46))}, 
                  ${Math.round(204 - (colorIntensity / 255) * (204 - 240))}
                )`
                  : `rgb(${colorIntensity}, ${255 - colorIntensity}, ${
                      128 + colorIntensity / 2
                    })`,
              width: "100%",
              height: "10px",
              transition: "background 0.1s ease-in-out",
              top: "80%",
              left: "0",
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
            style={{ top: "70%", width: "100%", left: "0" }}
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
