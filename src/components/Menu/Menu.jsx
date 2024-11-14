import { Fragment, useState, useRef, useEffect } from "react";
import ThemeBtn from "../Buttons/ThemeBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import "./menu.css";
import hotelData from "../../json/foodData.json";
import Subsection from "./Subsections";
import restaurant from "../../assets/restaurant.jpeg";
import useCart from "../../context/Cart";
import SearchModal from "../SearchModal/SearchModal";
import { motion } from "framer-motion";

const Menu = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const { toggleCart, cartData } = useCart();
  const { foodData } = cartData;

  // Filter Hooks
  const [filters, setFilters] = useState(
    hotelData.filters.map((filter) => ({ filter, flag: false }))
  );
  const [filteredFoodData, setFilteredFoodData] = useState(hotelData.sections);

  // Speech Search hooks
  const [searchResults, setSearchResults] = useState({
    transcript: "",
    matchedDishes: [],
  });
  const searchResultsRef = useRef(null);

  const toggleSearchModal = () => {
    setIsSearchModalOpen(!isSearchModalOpen);
  };

  // Toggle Filter Activation
  const toggleFilters = (filterName) => {
    setFilters((prevState) => {
      return prevState.map((f) =>
        f.filter === filterName ? { ...f, flag: !f.flag } : f
      );
    });
  };

  // Calculate IDF values
  const calculateIDF = () => {
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

  // TF-IDF filtering
  useEffect(() => {
    const activeFilters = filters
      .filter((f) => f.flag)
      .map((f) => f.filter.toLowerCase());
    if (activeFilters.length === 0) {
      setFilteredFoodData(hotelData.sections);
      return;
    }

    const idf = calculateIDF();
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
    console.log(filteredSections)

    setFilteredFoodData(filteredSections);
  }, [filters]);

  // Filter logic for matching tags (OR condition between filters)
  useEffect(() => {
    const activeFilters = filters
      .filter((f) => f.flag)
      .map((f) => f.filter.toLowerCase());
    if (activeFilters.length === 0) {
      setFilteredFoodData(hotelData.sections);
      return;
    }

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
      })
      return newSubSection.length > 0;
    })

    setFilteredFoodData(removedUnnecessaryItems);
  }, [filters]);

  const handleTranscriptComplete = (transcript) => {
    const matchedDishes = getMatchingDishes(transcript);
    setSearchResults({ transcript, matchedDishes });
    if (searchResultsRef.current && matchedDishes.length > 0) {
      searchResultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getMatchingDishes = (transcript) => {
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

  return (
    <Fragment>
      <div className="menu-container min-h-screen w-full relative dark:bg-primary-bg-dark dark:text-white">
        <div
          className="fixed top-0 left-0 w-full h-1/4"
          style={{
            backgroundImage: `url(${restaurant})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: "-1",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent 60%)",
            }}
          />
          <div style={{ position: "absolute", top: "10px", right: "15px" }}>
            <ThemeBtn />
          </div>
        </div>

        <div
          className="w-full bg-white dark:bg-primary-bg-dark overflow-y-auto"
          style={{
            marginTop: "25vh",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            paddingBottom: "20px",
          }}
        >
          <div className="px-4 py-4 text-left font-bold text-xl">
            Apna Sweets
          </div>

          {/* Filter Section */}
          <div
            className="overflow-x-auto scrollbar-hide flex flex-row items-center filter-row mt-4 py-3 border-t-tabs-bg dark:border-t-tabs-bg-dark"
            style={{ borderTopWidth: "10px", borderTopStyle: "solid" }}
          >
            {filters
              .filter((e) => e.flag === true)
              .map((e, index) => (
                <motion.div
                  onClick={() => toggleFilters(e.filter)}
                  key={e}
                  className="whitespace-nowrap filter-container border-solid dark:bg-secondary-bg-dark bg-secondary-bg  dark:border-slate-500 rounded-md ml-4 mr-2"
                  style={{
                    padding: "4px 6px",
                    borderWidth: "1px",
                    fontSize: "80%",
                  }}
                  initial={{ opacity: 0 }} // Start with opacity 0 (hidden)
                  animate={{ opacity: 1 }} // Animate to opacity 1 (fully visible)
                  exit={{ opacity: 0 }} // Fade out when removed
                  transition={{ duration: 0.5 }} // Transition duration for the fade effect
                >
                  {e.filter}
                </motion.div>
              ))}
            {filters
              .filter((e) => e.flag === false)
              .map((e, index) => (
                <div
                  key={index}
                  onClick={() => toggleFilters(e.filter)}
                  className="whitespace-nowrap filter-container border-solid dark:bg-tabs-bg-dark bg-tabs-bg dark:border-slate-500 rounded-md ml-4 mr-2"
                  style={{
                    padding: "4px 6px",
                    borderWidth: "1px",
                    fontSize: "80%",
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0 }} // Initial state (hidden)
                    animate={{ opacity: 1 }} // Animated state (fully visible)
                    exit={{ opacity: 0 }} // Exit state (fade out when removed)
                    transition={{ duration: 0.5 }} // Transition duration for the fade
                  >
                    {e.filter}
                  </motion.div>
                </div>
              ))}
          </div>
          {/* Conditionally Render Search Result Section */}
          {searchResults.matchedDishes.length > 0 && (
            <div className="my-4" ref={searchResultsRef}>
              <Subsection
                subSectionObject={[
                  {
                    category: "Search Results",
                    items: searchResults.matchedDishes,
                  },
                ]}
              />
            </div>
          )}

          {/* Sections */}
          {filteredFoodData.map((section, index) => ( 
            <div
              key={index}
              className="food-data-div mt-4 py-3 border-t-tabs-bg dark:border-t-tabs-bg-dark"
              style={{ borderTopWidth: "10px", borderTopStyle: "solid" }}
            >
              <h1
                className="text-black ml-4 dark:text-white"
                style={{ fontSize: "25px", fontWeight: "700" }}
              >
                {section.sectionName}
              </h1>
              <Subsection subSectionObject={section.subSections} />
            </div>
          ))}

          {/* Cart and Search Button */}
          <button
            className="floating-mic-btn"
            onClick={toggleSearchModal}
            style={{
              position: "fixed",
              bottom: foodData.length ? "12%" : "20px", // Adjusts position based on cart presence
              right: "20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              zIndex: "9999",
            }}
          >
            <FontAwesomeIcon icon={faMicrophone} />
          </button>
        </div>
      </div>

      {isSearchModalOpen && (
        <SearchModal
          isOpen={isSearchModalOpen}
          onClose={toggleSearchModal}
          onTranscriptComplete={handleTranscriptComplete}
          searchResults={searchResults}
        />
      )}
    </Fragment>
  );
};

export default Menu;
