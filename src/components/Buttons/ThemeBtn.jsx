import { Fragment } from "react";
import useTheme from "../../context/theme";
import "./ThemeBtn.css";

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
      <div>
        <input type="checkbox" className="checkbox" onClick={toggleTheme} id="checkbox" />
        <label htmlFor="checkbox" className="checkbox-label">
          <i className="fas fa-moon"></i>
          <i className="fas fa-sun"></i>
          <span className="ball"></span>
        </label>
      </div>
    </Fragment>
  );
};

export default ThemeBtn;
