import { Fragment, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/theme";
import "./App.css";
import Menu from "./components/Menu/Menu";
import { ModalProvider } from "./context/Modal";
import ModalComp from "./components/Modal/Modal";
import { CartModalProvider } from "./context/Cart";
import CartModal from "./components/Modal/Cart";
import SearchModal from "./components/SearchModal/SearchModal"; // Import SearchModal
import Slider from "./components/Auth/Slider"

function App() {
  const [themeMode, setThemeMode] = useState("light");
  const [modalDetails, setModalDetails] = useState({
    isOpen: false,
    foodData: null,
  });
  const [cartData, setCartData] = useState({ isOpen: false, foodData: [] });
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [transcriptData, setTranscriptData] = useState(null);

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
      const updatedCartData = prevState.foodData.map((item , index) => {
        if(item.name === foodDataAndServing.name && item.type === foodDataAndServing.type){
          if(item.qnt + extraAddition <= 0) return null;
          return {...item , qnt : item.qnt + extraAddition}
        }
        return item;
      }).filter((e) => e !== null)

      return {
        ...prevState ,
        foodData : updatedCartData
      }

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
  const toggleSearchModal = () => {
    setIsSearchModalOpen(!isSearchModalOpen);
  };

  return (
    <CartModalProvider value={{ cartData, toggleCart, addItem, changeQnt, clearCart }}>
      <ModalProvider value={{ toggleModal, modalDetails }}>
        <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
          
          {/* Conditional modals */}
          {modalDetails.isOpen && <ModalComp />}
          {cartData.isOpen && <CartModal />}
          {isSearchModalOpen && (
            <SearchModal onClose={toggleSearchModal} onTranscriptComplete={handleTranscriptComplete} />
          )}
  
          {/* Routes */}
          <Routes>
            <Route path="/login" element={<Slider />} />{" "}
            <Route path="/" element={<Menu />} />{" "}
          </Routes>
        </ThemeProvider>
      </ModalProvider>
    </CartModalProvider>
  );
}

export default App;
