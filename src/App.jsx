import { Fragment, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/theme";
import LandingPage from "./components/LandingPage";
import "./App.css";
import Menu from "./components/Menu/Menu";
import { ModalProvider } from "./context/Modal";
import ModalComp from "./components/Modal/Modal";
import SearchModal from "./components/SearchModal/SearchModal"; // New Import for the Search Modal

function App() {
  const [themeMode, setThemeMode] = useState("light");
  const [modalDetails, setModalDetails] = useState({
    isOpen: false,
    foodData: null,
  });
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false); // State for search modal

  const darkTheme = () => setThemeMode("dark");
  const lightTheme = () => setThemeMode("light");

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  const toggleModal = (foodData = null) => {
    setModalDetails({ isOpen: !modalDetails.isOpen, foodData });
  };

  const toggleSearchModal = () => {
    setIsSearchModalOpen(!isSearchModalOpen); // Toggle search modal state
  };

  return (
    <ModalProvider value={{ toggleModal, modalDetails }}>
      <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
        {modalDetails.isOpen && <ModalComp />}
        {isSearchModalOpen && <SearchModal onClose={toggleSearchModal} />}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/menu" element={<Menu onMicClick={toggleSearchModal} />} /> {/* Pass toggleSearchModal to Menu */}
        </Routes>
      </ThemeProvider>
    </ModalProvider>
  );
}

export default App;
