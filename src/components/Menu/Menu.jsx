import { Fragment, useRef, useEffect } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

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
      <div className="menu-container min-h-screen overflow-auto w-full relative dark:bg-primary-bg-dark dark:text-white">
        <div
          style={{ height: "8%", zIndex: "1000" }}
          className="bg-white dark:bg-primary-bg-dark w-full flex flex-row justify-between top-navbar absolute top-0"
        >
          <div className="rest-name">Apna Sweets</div>
          <ThemeBtn />
        </div>
        <Parallax pages={2}>
          <ParallaxLayer offset={0} speed={-1}>
            <div
              className="my-4 relative mx-auto h-36 max-w-lg overflow-y-scroll bg-cover bg-fixed bg-center bg-no-repeat shadow-lg"
              style={{
                height: "50%",
                backgroundImage: `url(${restaurant})`,
              }}
            ></div>
          </ParallaxLayer>
          <ParallaxLayer offset={1} speed={1} style={{ top: "-90%" }}>
            <div
              className="w-full main-content absolute bg-white dark:bg-primary-bg-dark"
              style={{
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            >
              <div
                className="marker-top bg-slate-500"
                style={{
                  height: "5px",
                  borderRadius: "20px",
                  width: "20%",
                  margin: "3% 40%",
                }}
              ></div>

              {/* Hotel Name and ratings */}
              <div className="flex flex-row justify-between items-center mx-4">
                <h1
                  style={{ fontWeight: "600", fontSize: "25px" }}
                  className=""
                >
                  Apna Sweets
                </h1>
                <div
                  className="bg-secondary-bg rating-card flex flex-row justify-center items-center"
                  style={{
                    opacity: "0",
                    width: "15%",
                    height: "15%",
                    borderRadius: "5px",
                  }}
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
                className="overflow-x-auto scrollbar-hide flex flex-row items-center filter-row mt-4 py-3 border-t-tabs-bg dark:border-t-tabs-bg-dark"
                style={{ borderTopWidth: "10px", borderTopStyle: "solid" }}
              >
                {hotelData.filters.map((e) => {
                  return (
                    <div
                      key={e} // add a unique key to avoid React warnings
                      className="whitespace-nowrap filter-container border-solid dark:bg-tabs-bg-dark bg-tabs-bg dark:border-slate-500 rounded-md ml-4 mr-2"
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
              {hotelData.sections.map((e, index) => {
                return (
                  <div
                    key={index} // add a unique key to avoid React warnings
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
                );
              })}
            </div>
          </ParallaxLayer>
        </Parallax>
      </div>
      

    </Fragment>
  );
};

export default Menu;
