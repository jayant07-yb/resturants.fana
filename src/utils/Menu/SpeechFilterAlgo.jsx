export const SpeechFilterAlgo = (transcript, hotelData) => {
  const transcriptWords = transcript.toLowerCase().split(" ");
  const dishMatches = [];

  hotelData.sections.forEach((section) => {
    section.subSections.forEach((subSection) => {
      subSection.items.forEach((item) => {
        const descriptionWords = item.information.toLowerCase().split(" ");
        let matchCount = transcriptWords.filter((word) =>
          descriptionWords.includes(word)
        ).length;
        matchCount += transcriptWords.filter((word) =>
          item.tags.includes(word)
        ).length;

        if (matchCount > 0) {
          dishMatches.push({ item, matchCount });
        }
      });
    });
  });

  return dishMatches
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, 5)
    .map((dish) => dish.item);
};
