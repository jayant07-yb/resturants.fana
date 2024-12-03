import { Fragment, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ThemeProvider } from "./context/theme";
import "./App.css";
import Menu from "./components/Menu/Menu";
import { ModalProvider } from "./context/Modal";
import ModalComp from "./components/Modal/Modal";
import { CartModalProvider } from "./context/Cart";
import CartModal from "./components/Modal/Cart";
import SearchModal from "./components/SearchModal/SearchModal"; // Import SearchModal
import Slider from "./components/Auth/Slider";
import { SpeechModalProvider } from "./context/SpeechRecognition";
import { isMobile } from "react-device-detect";
import ErrorTemplate from "./components/Error/Errortemplate";
import useScreenWidthObserver from "./utils/screenObserver";
import { UserProvider } from "./context/userContext";

function App() {
  const screenWidth = useScreenWidthObserver();
  const [themeMode, setThemeMode] = useState("light");
  const navigate = useNavigate();
  const [modalDetails, setModalDetails] = useState({
    isOpen: false,
    foodData: null,
  });
  const [cartData, setCartData] = useState({ isOpen: false, foodData: [] });
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [transcriptData, setTranscriptData] = useState(null);
  const [speechData, setSpeechData] = useState({ speech: [], isOpen: false });

  const darkTheme = () => setThemeMode("dark");
  const lightTheme = () => setThemeMode("light");

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  const toggleModal = (foodData = null) => {
    setModalDetails({ isOpen: !modalDetails.isOpen, foodData });
  };

  const addItem = (newFoodItem) => {
    // newFoodItem= { name , qnt , type }
    setCartData((prevState) => {
      const existingFoodIndex = prevState.foodData.findIndex(
        (food) =>
          food.name === newFoodItem.name && food.type === newFoodItem.type
      );

      let updatedCartData;
      if (existingFoodIndex !== -1) {
        updatedCartData = [...prevState.foodData];
        updatedCartData[existingFoodIndex].qnt += newFoodItem.qnt;
      } else {
        updatedCartData = [...prevState.foodData, newFoodItem];
      }

      console.log({
        ...prevState,
        foodData: updatedCartData,
      });

      return {
        ...prevState,
        foodData: updatedCartData,
      };
    });
  };

  const changeQnt = (foodDataAndServing, extraAddition) => {
    setCartData((prevState) => {
      const updatedCartData = prevState.foodData
        .map((item, index) => {
          if (
            item.name === foodDataAndServing.name &&
            item.type === foodDataAndServing.type
          ) {
            if (item.qnt + extraAddition <= 0) return null;
            return { ...item, qnt: item.qnt + extraAddition };
          }
          return item;
        })
        .filter((e) => e !== null);

      return {
        ...prevState,
        foodData: updatedCartData,
      };
    });
  };

  const clearCart = () => {
    setCartData((prev) => ({ ...prev, foodData: [] })); // Resets foodData to an empty array
  };

  const toggleCart = () => {
    setCartData((prevData) => {
      return {
        ...prevData,
        isOpen: !prevData.isOpen,
      };
    });
  };
  const handleTranscriptComplete = (data) => {
    setTranscriptData(data); // Set the transcript data
  };
  //  Speech Search Modal
  const toggleSearchModal = () => {
    setSpeechData((prevState) => {
      return {
        ...prevState,
        isOpen: !prevState.isOpen,
      };
    });
  };

  const searchSpeechModal = (speechTranscript) => {
    setSpeechData((prevState) => {
      // This function is called when the speech recognition is turned off
      // The speech displayed over the screen is from the variable transcript
      // that the react lib has , we split it into an array and display it
      // Split the speechTranscript again
      const transcriptArray = speechTranscript.split(" ");
      console.log(transcriptArray);
      return {
        ...prevState,
        speech: transcriptArray,
      };
    });
  };
  
  // Check  for device type
  useEffect(() => {
    if (screenWidth > 800) {
      const retrace = window.location.pathname;
      navigate(`/error?retrace=${retrace}`);
    }
  }, [screenWidth]);
  
  // UserContext
  const [isOpen, setIsOpen] = useState(false);
  const toggleAuthModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <UserProvider value={{ isOpen, toggleAuthModal }}>
      <CartModalProvider
        value={{ cartData, toggleCart, addItem, changeQnt, clearCart }}
      >
        <SpeechModalProvider
          value={{ speechData, toggleSearchModal, setSpeechData }}
        >
          <ModalProvider value={{ toggleModal, modalDetails }}>
            <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
              {/* Conditional modals */}
              {modalDetails.isOpen && <ModalComp />}
              {cartData.isOpen && <CartModal />}
              {speechData.isOpen && (
                <SearchModal
                  searchSpeechModal={searchSpeechModal}
                  toggleSearchModal={toggleSearchModal}
                />
              )}
              {isOpen && <Slider />}
              {/* Routes */}
              <Routes>
                <Route path="/login" element={<Slider />} />{" "}
                <Route path="/" element={<Menu />} />{" "}
                <Route
                  path="/error"
                  element={
                    <ErrorTemplate
                      errorText={"Our App does not support landscape Mode"}
                    />
                  }
                />
              </Routes>
            </ThemeProvider>
          </ModalProvider>
        </SpeechModalProvider>
      </CartModalProvider>
    </UserProvider>
  );
}

export default App;
