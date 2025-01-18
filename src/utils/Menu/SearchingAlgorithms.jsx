const calculateIDF = (hotelData ,filters) => {
  const numItems = hotelData.sections.reduce(
    (total, section) =>
      total +
      section.subSections.reduce(
        (subTotal, subSection) => subTotal + subSection.items.length,
        0
      ),
    0
  );
  const filterDocCounts = filters.reduce((acc, { filter }) => {
    let count = 0;
    hotelData.sections.forEach((section) =>
      section.subSections.forEach((subSection) =>
        subSection.items.forEach((item) => {
          const text = `${item.name} ${item.tags.join(" ")} ${
            item.information
          }`.toLowerCase();
          if (text.includes(filter.toLowerCase())) count++;
        })
      )
    );
    acc[filter] = Math.log(numItems / (1 + count));
    return acc;
  }, {});
  return filterDocCounts;
};

export default calculateIDF;