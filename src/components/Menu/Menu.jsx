import { Fragment, useState } from "react";
import ThemeBtn from "../Buttons/ThemeBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import "./Menu.css";
import hotelData from "../../json/foodData.json";
import Subsection from "./Subsections";
import restaurant from "../../assets/restaurant.jpeg";
import useCart from "../../context/Cart";


import SearchModal from "../SearchModal/SearchModal";

const Menu = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState({ transcript: "", matchedDishes: [] });
  const { toggleCart, cartData } = useCart();
  const { foodData } = cartData;
  const toggleSearchModal = () => {
    setIsSearchModalOpen(!isSearchModalOpen);
  };

  // Process transcript to match with dish descriptions
  const handleTranscriptComplete = (transcript) => {
    const matchedDishes = getMatchingDishes(transcript);
    setSearchResults({ transcript, matchedDishes });
  };

  // Function to find top matching dishes based on transcript
  const getMatchingDishes = (transcript) => {
    const transcriptWords = transcript.toLowerCase().split(" ");
    const dishMatches = [];

    hotelData.sections.forEach((section) => {
      section.subSections.forEach((subSection) => {
        subSection.items.forEach((item) => {
          const descriptionWords = item.information.toLowerCase().split(" ");
          const matchCount = transcriptWords.filter(word => descriptionWords.includes(word)).length;

          if (matchCount > 0) {
            dishMatches.push({ item, matchCount });
          }
        });
      });
    });

    // Sort by match count in descending order and pick top 4-5 matches
    return dishMatches
      .sort((a, b) => b.matchCount - a.matchCount)
      .slice(0, 5)
      .map(dish => dish.item);
  };

  return (
    <Fragment>
      <div className="menu-container min-h-screen w-full relative dark:bg-primary-bg-dark dark:text-white">
        
        {/* Fixed Background Image and Theme Button */}
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
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent 60%)",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "15px",
            }}
          >
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
          <div
            className="px-4 py-4 text-left font-bold text-xl"
            style={{
              color: "var(--text-color)",
            }}
          >
            Apna Sweets
          </div>

          {/* Filter Section */}
          <div
            className="overflow-x-auto scrollbar-hide flex flex-row items-center filter-row mt-4 py-3 border-t-tabs-bg dark:border-t-tabs-bg-dark"
            style={{ borderTopWidth: "10px", borderTopStyle: "solid" }}
          >
            {hotelData.filters.map((e) => (
              <div
                key={e}
                className="whitespace-nowrap filter-container border-solid dark:bg-tabs-bg-dark bg-tabs-bg dark:border-slate-500 rounded-md ml-4 mr-2"
                style={{
                  padding: "4px 6px",
                  borderWidth: "1px",
                  fontSize: "80%",
                }}
              >
                {e}
              </div>
            ))}
          </div>

          {/* Conditionally Render Search Result Section */}
          {searchResults.matchedDishes.length > 0 && (
          <div className="my-4">
            <Subsection
              subSectionObject={[
                {
                  category: "Search Results",
                  items: searchResults.matchedDishes
                }
              ]}
            />
          </div>
        )}


          {/* Sections */}
          {hotelData.sections.map((e, index) => (
            <div
              key={index}
              className="food-data-div mt-4 py-3 border-t-tabs-bg dark:border-t-tabs-bg-dark"
              style={{ borderTopWidth: "10px", borderTopStyle: "solid" }}
            >
              <h1
                className="text-black ml-4 dark:text-white"
                style={{ fontSize: "25px", fontWeight: "700" }}
              >
                {e.sectionName}
              </h1>
              <Subsection subSectionObject={e.subSections} />
            </div>
          ))}


          {/* Cart */}
          {foodData.length && (
          <div
          onClick={toggleCart}
            className="cart-btn-div flex justify-center items-center bg-secondary-bg-cart-btn dark:bg-secondary-bg-dark text-white absolute bottom-0 w-full"
            style={{ height: "10%", zIndex: "9000" }}
          >
            <div
              className="items-count"
              style={{ fontSize: "20px", fontWeght: "600" }}
            >{`${cartData.foodData.length} item${cartData.foodData.length > 1 ? "s" : ""}  added ~>`}</div>
          </div>
        )}
        
        </div>

        <button
          className="floating-mic-btn"
          onClick={toggleSearchModal}
          style={{
            position: "fixed",
            bottom: "20px",
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
            fontSize: "1.5rem",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            cursor: "pointer",
            zIndex: "10",
          }}
        >
          <FontAwesomeIcon icon={faMicrophone} />
        </button>

        {isSearchModalOpen && (
          <SearchModal
            onClose={toggleSearchModal}
            onTranscriptComplete={handleTranscriptComplete}
          />
        )}
      </div>
    </Fragment>
  );
};

export default Menu;
