import "regenerator-runtime/runtime";
import React, { useEffect, useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import ReactDOM from "react-dom";
import "./SearchModal.css";
import "./style.css";
import useTheme from "../../context/theme";
import useSpeechModal from "../../context/SpeechRecognition";

const SearchModal = ({ toggleSearchModal, searchSpeechModal }) => {
  const {speechData} = useSpeechModal();
  // transcript => Holds the user speech 
  // browserSupportsSpeechRecognition => browser supports or not
  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  const { themeMode } = useTheme();

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const [colorIntensity, setColorIntensity] = useState(0);

  useEffect(() => {
    if(!speechData.isOpen) return;
    console.log("Opened")
    if (!browserSupportsSpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    // Start speech recognition
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

    return () => {
      SpeechRecognition.stopListening();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [speechData.isOpen]);

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
    searchSpeechModal(transcript);
    toggleSearchModal();
  };

  return ReactDOM.createPortal(
    <div
      className="search-modal relative top-0 left-0 right-0 bottom-0"
      style={{ backgroundColor: "white", opacity: "0.9" }}
    >
      <div className="search-modal-content">
        {/* Dynamic color-changing div */}
        <div
          className="waveform-bar absolute bottom-0"
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
          }}
        ></div>
        <div id="transcript" className="transcript-display">
          {transcript}
        </div>

        <button className="search-btn opacity-100 bg-opacity-100" onClick={handleSearchClick}>
          Search
        </button>
      </div>
    </div>,
    document.getElementById("speech-recognition")
  );
};

export default SearchModal;
