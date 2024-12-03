export const filterSections = (hotelData, idf, activeFilters) => {
  const filteredSections = hotelData.sections.map((section) => ({
    ...section,
    subSections: section.subSections.map((subSection) => ({
      ...subSection,
      items: subSection.items
        .map((item) => {
          const text = `${item.name} ${item.tags.join(" ")} ${
            item.information
          }`.toLowerCase();
          const tokenCounts = text.split(/\W+/).reduce((acc, word) => {
            acc[word] = (acc[word] || 0) + 1;
            return acc;
          }, {});
          const tfidfScore = activeFilters.reduce((score, filter) => {
            const tf = tokenCounts[filter] || 0;
            return score + tf * (idf[filter] || 0);
          }, 0);
          return { ...item, tfidfScore };
        })
        .filter((item) => item.tfidfScore > 0)
        .sort((a, b) => b.tfidfScore - a.tfidfScore),
    })),
  }));
  console.log(filteredSections);

  return filteredSections;
};

export const normalizeFilters = (filters) => {
  return filters.filter((f) => f.flag).map((f) => f.filter.toLowerCase());
};

export const removeUnnecessaryItems = (hotelData , activeFilters) => {
  const filteredSections = hotelData.sections.map((section) => ({
    ...section,
    subSections: section.subSections.map((subSection) => ({
      ...subSection,
      items: subSection.items.filter((item) => {
        const tagsMatch = item.tags.some((tag) =>
          activeFilters.includes(tag.toLowerCase())
        );
        return tagsMatch;
      }),
    })),
  }));

  const removedUnnecessaryItems = filteredSections.filter((section) => {
    const newSubSection = section.subSections.filter((subsectionelement) => {
      // console.log(subsectionelement.category , subsectionelement.items.length)
      return subsectionelement.items.length != 0;
    });
    return newSubSection.length > 0;
  });

  return removedUnnecessaryItems;
};
