import { Fragment, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/theme"; // Ensure this is set up correctly
import LandingPage from "./components/LandingPage"; // Adjust the path if necessary
import "./App.css";
import Menu from "./components/Menu/Menu";
import { ModalProvider } from "./context/Modal";
import ModalComp from "./components/Modal/Modal";
import { CartModalProvider } from "./context/Cart";

function App() {
  const [themeMode, setThemeMode] = useState("light");
  const [modalDetails, setModalDetails] = useState({
    isOpen: false,
    foodData: null,
  });
  const [cartData, setCartData] = useState({ isOpen: false, cartData: [] });

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
    console.log("Opening Modal", foodData);
    setModalDetails({ isOpen: !modalDetails.isOpen, foodData });
  };

  const addItem = (newFoodItem) => {
    setCartData((prevState) => {
      const existingFoodIndex = prevState.cartData.findIndex(
        (food) => food.name === newFoodItem.name
      );

      let updatedCartData;
      if (existingFoodIndex !== -1) {
        updatedCartData = [...prevState.cartData];
        updatedCartData[existingFoodIndex].qnt += newFoodItem.qnt;
      } else {
        updatedCartData = [...prevState.cartData, newFoodItem];
      }

      return {
        ...prevState,
        cartData: updatedCartData,
      };
    });
  };

  const toggleCart = () => {
    setCartData((prevData) => {
      return{
        ...prevData,
        isOpen : !prevData.isOpen
      }
    })
  }

  return (
    <CartModalProvider value={{cartData , toggleCart , addItem}} >
      <ModalProvider value={{ toggleModal, modalDetails }}>
        <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
          {modalDetails.isOpen ? <ModalComp /> : <></>}
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
