import React, { useState, useEffect } from "react";
import "./SearchModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const SearchModal = ({ onClose, onTranscriptComplete }) => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(true);
  const [listeningTimeExceeded, setListeningTimeExceeded] = useState(false);
  const keywords = ["and", "spicy", "not spicy", "not", "mexican", "italian", "cuisine", "french fries", "pasta"];
  const similarityThreshold = 0.5;
  let inactivityTimeout;

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support Speech Recognition");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true; // Enable interim results for real-time typing
    recognition.continuous = true; // Keep listening even with brief pauses

    // Start recognition and set listening to true
    recognition.start();
    setIsListening(true);

    // Minimum 3-second timeout
    const minListeningTimeout = setTimeout(() => {
      setListeningTimeExceeded(true);
    }, 3000);

    // Reset inactivity timer on each result
    const resetInactivityTimeout = () => {
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(() => {
        recognition.stop(); // Stop recognition if no input for 5 seconds
      }, 5000);
    };

    // Update transcript in real-time as speech is recognized
    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        interimTranscript += result[0].transcript;
        if (result.isFinal) {
          const finalTranscript = interimTranscript.toLowerCase();
          setTranscript(finalTranscript);
          const matchedKeywords = keywords.filter((keyword) =>
            finalTranscript.split(" ").some((word) => getSimilarity(word, keyword) >= similarityThreshold)
          );
          onTranscriptComplete({ transcript: finalTranscript, matchedKeywords });
        } else {
          setTranscript(interimTranscript);
        }
      }
      resetInactivityTimeout(); // Reset the inactivity timer with each result
    };

    // Handle end of speech recognition
    recognition.onend = () => {
      if (listeningTimeExceeded) {
        setIsListening(false);
        onClose();
      }
    };

    // Handle errors gracefully
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
      onClose();
    };

    // Clean up on unmount
    return () => {
      clearTimeout(minListeningTimeout);
      clearTimeout(inactivityTimeout);
      recognition.stop();
    };
  }, [onClose, onTranscriptComplete, listeningTimeExceeded]);

  const getSimilarity = (str1, str2) => {
    const len1 = str1.length;
    const len2 = str2.length;
    const matrix = Array.from({ length: len1 + 1 }, () => Array(len2 + 1).fill(0));

    for (let i = 0; i <= len1; i++) matrix[i][0] = i;
    for (let j = 0; j <= len2; j++) matrix[0][j] = j;

    for (let i = 1; i <= len1; i++) {
      for (let j = 1; j <= len2; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = 1 + Math.min(matrix[i - 1][j], matrix[i][j - 1], matrix[i - 1][j - 1]);
        }
      }
    }

    const levenshteinDistance = matrix[len1][len2];
    return 1 - levenshteinDistance / Math.max(len1, len2);
  };

  return (
    <div className="search-modal">
      <div className="search-modal-content">
        <textarea
          value={transcript}
          readOnly
          placeholder="Listening..."
          disabled
        />
        <button
          className={`close-btn ${isListening ? "glow" : ""}`}
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </div>
  );
};

export default SearchModal;
