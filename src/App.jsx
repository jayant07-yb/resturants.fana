import { Fragment, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/theme"; // Ensure this is set up correctly
import LandingPage from "./components/LandingPage"; // Adjust the path if necessary
import "./App.css";
import Menu from "./components/Menu/Menu";
import { ModalProvider } from "./context/Modal";
import ModalComp from "./components/Modal/Modal";

function App() {
  const [themeMode, setThemeMode] = useState("light");
  const [modalDetails, setModalDetails] = useState({
    isOpen: false,
    foodData: null,
  });

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

  return (
    <ModalProvider value={{ toggleModal , modalDetails }}>
      <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
        {modalDetails.isOpen ? <ModalComp /> : <></>}
        <Routes>
          <Route path="/" element={<LandingPage />} />{" "}
          <Route path="/menu" element={<Menu />} />{" "}
        </Routes>
      </ThemeProvider>
    </ModalProvider>
  );
}

export default App;
