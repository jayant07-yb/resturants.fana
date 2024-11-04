import React, { useEffect, useState } from "react";
import "./SearchModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

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
      console.log(`Interime transcript: ${finalTranscript}`);
      document.getElementById("transcript").textContent = finalTranscript;
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
    console.log("final transcript:"+ transcript);
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
      <div id="transcript"></div>

        <button
          className={`search-btn ${isListening ? "glow" : ""}`}
          onClick={handleSearchClick}
        >
          <FontAwesomeIcon icon={faSearch} />
          {isListening ? " Stop Listening" : " Search"}
        </button>
      </div>
    </div>
  );
};

export default SearchModal;
