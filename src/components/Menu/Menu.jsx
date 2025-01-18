import { Fragment, useState, useRef, useEffect } from "react";
import "./menu.css";
import hotelData from "../../json/foodData.json";
import Subsection from "./Subsections";
import useCart from "../../context/Cart";
import useSpeechModal from "../../context/SpeechRecognition";
//Utils Import
import calculateIDF from "../../utils/Menu/SearchingAlgorithms";
import {
  filterSections,
  normalizeFilters,
  removeUnnecessaryItems,
} from "../../utils/Menu/FilterFoodAlgo";
import { SpeechFilterAlgo } from "../../utils/Menu/SpeechFilterAlgo";
import RestImage from "./RestaurantImg/RestImage";
import Filters from "./Filters/Filters";
import Sections from "./Sections/Sections";
import CartBtn from "./CartBtn/CartBtn";
import SpeechBtn from "./SpeechBtn/SpeechBtn";
import useModal from "../../context/Modal";
import useUserContext from "../../context/userContext";
import MenuBtn from "./MenuBtn/MenuBtn";
import SubMenu from "./SubMenu/SubMenu";

const Menu = () => {
  // Context Hooks
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const { modalDetails } = useModal();
  const { toggleCart, cartData } = useCart();
  const { foodData } = cartData;
  const { toggleSearchModal, speechData } = useSpeechModal();
  const [searchResults, setSearchResults] = useState({
    transcript: "",
    matchedDishes: [],
  });
  // Hooks
  const [filters, setFilters] = useState(
    hotelData.filters.map((filter) => ({ filter, flag: false }))
  );
  const [filteredFoodData, setFilteredFoodData] = useState(hotelData.sections);
  const searchResultsRef = useRef(null);
  // Local SubMenu Modal Hook
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  // Toggle Local SubMenu
  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };
  // Toggle Filter Activation
  const toggleFilters = (filterName) => {
    setFilters((prevState) => {
      return prevState.map((f) =>
        f.filter === filterName ? { ...f, flag: !f.flag } : f
      );
    });
  };

  // TF-IDF filtering
  useEffect(() => {
    const activeFilters = normalizeFilters(filters);
    if (activeFilters.length === 0) {
      setFilteredFoodData(hotelData.sections);
      return;
    }
    const idf = calculateIDF(hotelData, filters);
    const filteredSections = filterSections(hotelData, idf, activeFilters);
    setFilteredFoodData(filteredSections);
  }, [filters]);

  // Filter logic for matching tags (OR condition between filters)
  // ***************NOTE : DONOT MERGE THIS AND THE ABOVE useEffect ******************************************************
  // Both are used differently as the removal of unnecesary items will be from
  // the items that satisfy the current condition and this can happen after filtering
  // If used under one useEffect React's BATCHING will prevent the unnecessary removal to workonthe old data
  useEffect(() => {
    const activeFilters = normalizeFilters(filters);
    if (activeFilters.length === 0) {
      setFilteredFoodData(hotelData.sections);
      return;
    }
    const removedUnnecessaryItems = removeUnnecessaryItems(
      hotelData,
      activeFilters
    );
    setFilteredFoodData(removedUnnecessaryItems);
  }, [filters]);

  useEffect(() => {
    console.log("Data Updated ", speechData);
    const { speech } = speechData;
    const matchedDishes = SpeechFilterAlgo(speech, hotelData);
    console.log(matchedDishes);
    setSearchResults({ speech, matchedDishes });
    if (searchResultsRef.current && matchedDishes.length > 0) {
      searchResultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [speechData]);

  return (
    <Fragment>
      <div
        className="menu-container min-h-screen w-full relative dark:bg-primary-bg-dark dark:text-white"
        style={{ position: modalDetails.isOpen ? "fixed" : "" }}
      >
        <RestImage />
        <div
          className="w-full bg-white dark:bg-primary-bg-dark overflow-y-auto"
          style={{
            marginTop: "35%",
            borderTopLeftRadius: "25px",
            borderTopRightRadius: "25px",
            paddingBottom: "20px",
            boxShadow: "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
            minHeight: "100vh",
          }}
        >
          <div className="px-4 py-4 text-left font-bold text-xl">
            Apna Sweets
          </div>
          <Filters filters={filters} toggleFilters={toggleFilters} />
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
          <Sections filteredFoodData={filteredFoodData} />
          <CartBtn
            foodData={foodData}
            isSearchModalOpen={isSearchModalOpen}
            toggleCart={toggleCart}
            cartData={cartData}
          />
          {isSubMenuOpen && (
            <SubMenu toggleSubMenu={toggleSubMenu} foodData={foodData} />
          )}
          <MenuBtn toggleSubMenu={toggleSubMenu} foodData={foodData} />
          <SpeechBtn
            foodData={foodData}
            speechData={speechData}
            toggleSearchModal={toggleSearchModal}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Menu;
