export const SpeechFilterAlgo = (transcript, hotelData) => {
  const dishMatches = [];

  // Break the transcript into lines
  const lines = String(transcript).toLowerCase().split(".\n");

  hotelData.sections.forEach((section) => {
    section.subSections.forEach((subSection) => {
      subSection.items.forEach((item) => {
        let match = false;
        let explicit_end = false;
        // Iterate through each line
        for (const line of lines) {
          const words = line.split(" ");
          let negate = false; // Track if "not" has been encountered

          // Iterate through each word in the line
          for (const word of words) {
            if (word === "not") {
              negate = !negate; // Toggle negate mode
              continue;
            }

            if (!negate) {
              // Normal behavior
              if (item.positive_tags.includes(word)) {
                match = true;
              } else if (item.negative_tags.includes(word)) {
                match = false;
                explicit_end = true;
                break; // Exit the loop for this line and move to the next dish
              }
            } else {
              // Negate behavior
              if (item.positive_tags.includes(word)) {
                match = false;
                explicit_end = true;
                break; // Exit the loop for this line and move to the next dish
              }
              // Do nothing if there is a match with the positive element
            }
          }

          if (explicit_end) {
            // Unset due to negative match
            break;
          }
        }

        // If match is true after evaluating all lines, consider this dish
        if (match) {
          dishMatches.push(item);
        }
      });
    });
  });


  return dishMatches
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, 5)
    .map((dish) => dish.item);
};
