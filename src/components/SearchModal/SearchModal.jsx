import React, { useEffect, useState } from "react";
import "./SearchModal.css";
import fanaIcon from "../../assets/fanaLogo.png";

const SearchModal = ({ onClose, onTranscriptComplete }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support Speech Recognition");
      return;
    }

    const recognition = new  webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.maxAlternatives = 1;

    recognition.start();
    setIsListening(true);
    console.log("Recognition started...");

    recognition.onresult = (event) => {
      const interimTranscript = event.results[0][0].transcript.trim().toLowerCase();
      console.log(interimTranscript);
      document.getElementById("transcript").textContent = interimTranscript;
      setTranscript(interimTranscript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    return () => {
      recognition.abort();
    };
  }, []);

  const handleSearchClick = () => {
    if (isListening) {
      setIsListening(false);
    }
    onTranscriptComplete(transcript); // Send final transcript back
    onClose();
  };

  return (
    <div className="search-modal">
      <div className="search-modal-content">
        <div id="transcript" className="transcript-display"></div>
        <button className="search-btn" onClick={handleSearchClick}>
          <img src={fanaIcon} alt="Custom Search Icon" className="search-btn-icon" />
        </button>
      </div>
    </div>
  );
};

export default SearchModal;
