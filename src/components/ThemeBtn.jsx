import { Fragment } from "react";
import useTheme from "../context/theme";

const ThemeBtn = () => {
    const { lightTheme, darkTheme, themeMode } = useTheme();

    const toggleTheme = () => {
        if (themeMode === "dark") {
            lightTheme();
        } else {
            darkTheme();
        }
    };

    return (
        <Fragment>
            <button 
                style={{ height: "100px", width: "100px" }} 
                className="theme-btn" 
                onClick={toggleTheme}
            >
                Switch to {themeMode === "dark" ? "Light" : "Dark"} Mode
            </button>
        </Fragment>
    );
};

export default ThemeBtn;
