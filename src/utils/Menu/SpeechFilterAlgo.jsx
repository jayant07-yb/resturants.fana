export const SpeechFilterAlgo = (transcript, hotelData) => {
  const dishMatches = [];
  const stopWords = new Set(["i", "want", "something", "that", "is", "am", "are", "was", "were", "the", "a", "an", "on", "at", "in", "with", "for"]);

  // Break the transcript into lines
  const wordMap = {
    nothing: "not",
    veg: "vegetarian",
    non: "not",
    "non-veg": "non veg",
    choco: "chocolate"
  };
  
  const processWords = (wordsArray) => {
    return wordsArray
      .map(word => word.toLowerCase()) // Step 1: Convert to lowercase
      .map(word => wordMap[word] || word) // Step 2: Apply wordMap
      .filter(word => !stopWords.has(word)); // Step 3: Remove stopwords
  };
  
  const words = processWords(transcript);
  console.log("The processed transcript: ", words);


  const positive_tags_transcript = new Set();
  const negative_tags_transcript = new Set();

  let negate = false; // Track if "not" has been encountered

  // Iterate through each word in the transcript
  for (const word of words) {
    if (word === "not") {
      negate = !negate; // Toggle negate mode
      continue;
    }

    if (!negate) {
      positive_tags_transcript.add(word);
    } else {
      negative_tags_transcript.add(word);
    }
  }
  console.log("Got the pos variables:", positive_tags_transcript);
  console.log("Gott the neg variables", negative_tags_transcript);

  hotelData.sections.forEach((section) => {
    section.subSections.forEach((subSection) => {
      subSection.items.forEach((item) => {
        let match = false;
        // Iterate through each line
        {
          const positive_tags_item = processWords([
            ...item.name.split(" "),  // Include item name in positive tags
            ...item.positive_tags,
            ...item.tags,  
          ]);
          const negative_tags_item = processWords(item.negative_tags);
         
          console.log("Got positive and neg for ", item.name, positive_tags_item, negative_tags_item);
          // Check if both positive and negative tags from transcript match the item → Ignore the item
          const has_positive_match = [...positive_tags_transcript].some(tag => positive_tags_item.includes(tag));
          const has_negative_match = [...negative_tags_transcript].some(tag => negative_tags_item.includes(tag));
        
          if (has_positive_match && has_negative_match) {
            match = false; // Skip this item
          } else if (has_positive_match || has_negative_match) {
            match = true; // Consider this item
          }
        }
        

        // If match is true after evaluating all lines, consider this dish
        if (match) {
          dishMatches.push(item);
        }
      });
    });
  });

  console.log("Matched the folowing dishes:", dishMatches);
  let finalMatch = dishMatches
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, 5);
  console.log("Got the final Match:", finalMatch);
  return finalMatch;
};
