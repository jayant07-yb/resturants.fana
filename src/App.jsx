import { Fragment, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/theme"; // Ensure this is set up correctly
import LandingPage from "./components/LandingPage"; // Adjust the path if necessary
import "./App.css";

function App() {
  const [themeMode, setThemeMode] = useState("light");

  const darkTheme = () => {
    setThemeMode("dark");
  };

  const lightTheme = () => {
    setThemeMode("light");
  };

  useEffect(() => {
    document.querySelector('html').classList.remove("light", "dark");
    document.querySelector('html').classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Use the element prop to render the component */}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
