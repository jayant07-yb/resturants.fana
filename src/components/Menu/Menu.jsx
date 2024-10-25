import { Fragment } from "react";
import ThemeBtn from "../Buttons/ThemeBtn";
import star from "../../assets/star.svg";
import "./Menu.css";
import hotelData from "../../json/foodData.json";
import Subsection from "./Subsections";

const Menu = () => {
  return (
    <Fragment>
      <div className="menu-container min-h-screen w-full relative dark:bg-primary-bg-dark dark:text-white">
        <div
          style={{ height: "5%" }}
          className="flex flex-row justify-between top-navbar absolute top-0"
        >
          <div className="rest-name"></div>
          <ThemeBtn />
        </div>
        <div className="w-full main-content absolute" style={{ top: "10%" }}>
          {/* Hotel Name and ratings */}
          <div className="flex flex-row justify-between items-center mx-4">
            <h1
              style={{ fontWeight: "600", fontSize: "25px" }}
              className="mx-4"
            >
              Apna Sweets
            </h1>
            <div
              className="bg-secondary-bg  rating-card flex flex-row justify-center items-center"
              style={{ width: "15%", height: "15%", borderRadius: "5px" }}
            >
              <p className="mx-1 text-white ">4.2</p>
              <img
                src={star}
                style={{ height: "15px" }}
                className="stars mx-1"
              />
            </div>
          </div>
          {/* Filter */}
          <div
            className="overflow-x-auto scrollbar-hide flex flex-row  items-center filter-row mt-4 py-3 border-t-tabs-bg dark:border-t-tabs-bg-dark"
            style={{ borderTopWidth: "10px", borderTopStyle: "solid" }}
          >
            {hotelData.filters.map((e) => {
              return (
                <div
                  className="whitespace-nowrap filter-container border-solid
              dark:bg-tabs-bg-dark bg-tabs-bg dark:border-slate-500 rounded-md ml-4 mr-2"
                  style={{
                    padding: "4px 6px",
                    borderWidth: "1px",
                    fontSize: "80%",
                  }}
                >
                  {e}
                </div>
              );
            })}
          </div>
          <div
            className="food-data-div mt-4 py-3 border-t-tabs-bg dark:border-t-tabs-bg-dark"
            style={{ borderTopWidth: "10px", borderTopStyle: "solid" }}
          >
            <h1
              className="text-black ml-4 dark:text-white"
              style={{ fontSize: "25px", fontWeight: "700" }}
            >
                Bar
            </h1>
            <Subsection/>
            

          </div>
        </div>

        <div className="search-bar absolute bottom-0"></div>
      </div>
    </Fragment>
  );
};

export default Menu;
