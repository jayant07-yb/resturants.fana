import { Fragment, useState } from "react";
import ThemeBtn from "../Buttons/ThemeBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import "./Menu.css";
import hotelData from "../../json/foodData.json";
import Subsection from "./Subsections";
import restaurant from "../../assets/restaurant.jpeg";
import SearchModal from "../SearchModal/SearchModal";

const Menu = () => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState({ transcript: "", matchedKeywords: [] });

  const toggleSearchModal = () => {
    setIsSearchModalOpen(!isSearchModalOpen);
  };

  const handleTranscriptComplete = (transcript) => {
    setSearchResults({ transcript, matchedKeywords: [] });
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
          {searchResults.transcript && (
            <div className="px-4 py-4 search-results-section">
              <h2 className="text-lg font-bold">Search Result:</h2>
              <input
                type="text"
                value={searchResults.transcript}
                readOnly
                className="w-full p-2 mt-2 border border-gray-300 rounded"
              />
              <div className="mt-2">
                {/* Add any additional results or matched keywords here if necessary */}
              </div>
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
