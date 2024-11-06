import { Fragment, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/theme"; // Ensure this is set up correctly
import LandingPage from "./components/LandingPage"; // Adjust the path if necessary
import "./App.css";
import Menu from "./components/Menu/Menu";
import { ModalProvider } from "./context/Modal";
import ModalComp from "./components/Modal/Modal";
import { CartModalProvider } from "./context/Cart";
import CartModal from "./components/Modal/Cart";

function App() {
  const [themeMode, setThemeMode] = useState("light");
  const [modalDetails, setModalDetails] = useState({
    isOpen: false,
    foodData: null,
  });
  const [cartData, setCartData] = useState({ isOpen: false, foodData: [] });

  const darkTheme = () => {
    setThemeMode("dark");
  };

  const lightTheme = () => {
    setThemeMode("light");
  };

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
      const index = prevState.foodData.findIndex(
        (food) =>
          food.name === foodDataAndServing.name &&
          food.type === foodDataAndServing.type
      );

      const { qnt } = prevState.foodData[index];
      if (extraAddition + qnt == 0) prevState.foodData.splice(index, 1);
      else {
        prevState.foodData[index].qnt += extraAddition;
      }

      return prevState;
    });
  };

  const toggleCart = () => {
    setCartData((prevData) => {
      return {
        ...prevData,
        isOpen: !prevData.isOpen,
      };
    });
  };

  return (
    <CartModalProvider value={{ cartData, toggleCart, addItem, changeQnt }}>
      <ModalProvider value={{ toggleModal, modalDetails }}>
        <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
          {modalDetails.isOpen ? <ModalComp /> : <></>}
          {cartData.isOpen ? <CartModal /> : <></>}
          <Routes>
            <Route path="/" element={<LandingPage />} />{" "}
            <Route path="/menu" element={<Menu />} />{" "}
          </Routes>
        </ThemeProvider>
      </ModalProvider>
    </CartModalProvider>
  );
}

export default App;
