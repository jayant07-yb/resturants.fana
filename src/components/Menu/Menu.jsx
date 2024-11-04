import { Fragment } from "react";
import ThemeBtn from "../Buttons/ThemeBtn";
import star from "../../assets/star.svg";
import "./Menu.css";
import hotelData from "../../json/foodData.json";
import Subsection from "./Subsections";
import restaurant from "../../assets/restaurant.jpeg";
import OrderModal from "./OrderModal";

const Menu = () => {
  return (
    <Fragment>
      <div className="menu-container min-h-screen w-full relative dark:bg-primary-bg-dark dark:text-white">
        
        {/* Fixed Background Image and Theme Button */}
        <div
          className="fixed top-0 left-0 w-full h-1/4"
          style={{
            backgroundImage: `url(${restaurant})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: "-1",
          }}
        >
          {/* Black Gradient Overlay at the Bottom of the Image */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent 60%)",
            }}
          ></div>

          {/* Theme Button at Top Right */}
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "15px",
            }}
          >
            <ThemeBtn />
          </div>
        </div>

        {/* Main Content, including Apna Sweets Text */}
        <div
          className="w-full bg-white dark:bg-primary-bg-dark overflow-y-auto"
          style={{
            marginTop: "25vh", // Start content just below the fixed image
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            paddingBottom: "20px",
          }}
        >
          {/* Apna Sweets Title */}
          <div
            className="px-4 py-4"
            style={{
              textAlign: "left",
              fontWeight: "bold",
              fontSize: "24px",
              color: "black", // Default color
              color: "var(--text-color)", // Use CSS variable for theme
            }}
          >
            Apna Sweets
          </div>

          <div
            className="marker-top bg-slate-500"
            style={{
              height: "5px",
              borderRadius: "20px",
              width: "20%",
              margin: "3% 40%",
            }}
          ></div>

          {/* Filter */}
          <div
            className="overflow-x-auto scrollbar-hide flex flex-row items-center filter-row mt-4 py-3 border-t-tabs-bg dark:border-t-tabs-bg-dark"
            style={{ borderTopWidth: "10px", borderTopStyle: "solid" }}
          >
            {hotelData.filters.map((e) => (
              <div
                key={e}
                className="whitespace-nowrap filter-container border-solid dark:bg-tabs-bg-dark bg-tabs-bg dark:border-slate-500 rounded-md ml-4 mr-2"
                style={{
                  padding: "4px 6px",
                  borderWidth: "1px",
                  fontSize: "80%",
                }}
              >
                {e}
              </div>
            ))}
          </div>

          {/* Sections */}
          {hotelData.sections.map((e, index) => (
            <div
              key={index}
              className="food-data-div mt-4 py-3 border-t-tabs-bg dark:border-t-tabs-bg-dark"
              style={{ borderTopWidth: "10px", borderTopStyle: "solid" }}
            >
              <h1
                className="text-black ml-4 dark:text-white"
                style={{ fontSize: "25px", fontWeight: "700" }}
              >
                {e.sectionName}
              </h1>
              <Subsection subSectionObject={e.subSections} />
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default Menu;
