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
        <input type="checkbox" class="checkbox" onClick={toggleTheme} id="checkbox" />
        <label for="checkbox" class="checkbox-label">
          <i class="fas fa-moon"></i>
          <i class="fas fa-sun"></i>
          <span class="ball"></span>
        </label>
      </div>
    </Fragment>
  );
};

export default ThemeBtn;
