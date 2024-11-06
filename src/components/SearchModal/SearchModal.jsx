import React, { useEffect, useState } from "react";
import "./SearchModal.css";
import fanaIcon from "../../assets/fanaLogo.png"; // Import your SVG file

const SearchModal = ({ onClose, onTranscriptComplete }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    if (!("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      alert("Your browser does not support Speech Recognition");
      return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.maxAlternatives = 1;

    // Start listening when component mounts
    recognition.start();
    setIsListening(true);
    console.log("Recognition started...");

    // Handle recognition results
    recognition.onresult = (event) => {
      const finalTranscript = event.results[0][0].transcript.trim().toLowerCase();
      console.log(`Interim transcript: ${finalTranscript}`);
      document.getElementById("transcript").textContent = finalTranscript; // Update the interim transcript display
      setTranscript(finalTranscript);
    };

    // Handle recognition end
    recognition.onend = () => {
      console.log("Recognition ended.");
      setIsListening(false);
    };

    // Handle recognition errors
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    return () => {
      recognition.abort();
      console.log("Recognition aborted and cleaned up.");
    };
  }, []);

  // Handle search button click
  const handleSearchClick = () => {
    console.log("Final transcript: " + transcript);
    if (isListening) {
      setIsListening(false);
    }
    if (transcript) {
      onTranscriptComplete(transcript);
    }
    onClose();
  };

  return (
    <div className="search-modal">
      <div className="search-modal-content">
        {/* Cross Button */}
        {/* <button className="close-btn" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button> */}

        {/* Display Interim Transcript */}
        <div id="transcript" className="transcript-display"></div>

        {/* Search Button */}
        <button
          className={`search-btn ${isListening ? "glow" : ""}`}
          onClick={handleSearchClick}
        >

        <img src={fanaIcon} alt="Custom Search Icon" className="search-btn-icon" />

        </button>
      </div>
    </div>
  );
};

export default SearchModal;
