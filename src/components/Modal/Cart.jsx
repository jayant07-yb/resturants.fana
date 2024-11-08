import { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import useCart from "../../context/Cart";
import backLight from "../../assets/backLight.svg";
import backDark from "../../assets/backDark.svg";
import useTheme from "../../context/theme";
import CartFoodData from "./cartFoodData";
import timerDark from "../../assets/timerDark.svg";
import timerLight from "../../assets/timerLight.svg";

const CartModal = () => {
  const { themeMode } = useTheme();
  const { cartData, toggleCart } = useCart();
  const { isOpen, foodData } = cartData;
  useEffect(() => {
    if (foodData.every((e) => e === null)) toggleCart();
  }, [cartData]);
  console.log("cart data ", cartData);

  return ReactDOM.createPortal(
    <Fragment>
      <AnimatePresence>
        {isOpen && (
          <Fragment>
            <motion.div
              initial={{ y: "100vh", height: 0 }}
              animate={{ y: 0, height: "100vh" }}
              exit={{ height: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="absolute flex flex-col rounded-t-xl bottom-0 bg-white text-black dark:text-white dark:bg-primary-bg-dark w-full"
              style={{ zIndex: "10000", gap: "30px" }}
            >
              <div className="top-bar-cart flex flex-row jusify-center items-center">
                {themeMode === "dark" ? (
                  <img
                    onClick={toggleCart}
                    src={backDark}
                    className="ml-2 my-2 mr-4"
                    style={{ height: "30px", width: "auto" }}
                  />
                ) : (
                  <img
                    onClick={toggleCart}
                    src={backLight}
                    className="ml-2 my-2 mr-4"
                    style={{ height: "30px", width: "auto" }}
                  />
                )}
                <div
                  style={{ fontSize: "20px", fontWeight: "700" }}
                  className="rest-name mx-4"
                >
                  Apna Sweets
                </div>
              </div>
              <div className="bg-tabs-bg dark:bg-tabs-bg-dark mx-4 px-2 py-2 rounded-xl food-data-div">
                {foodData.map((e, index) => {
                  if (e) return <CartFoodData index={index} />;
                  return <></>;
                })}
              </div>
              <div className="bg-tabs-bg dark:bg-tabs-bg-dark mx-4 px-2 py-2 rounded-xl food-data-div">
                <div
                  className="flex flex-row ml-4 items-center"
                  style={{ borderStyle: "dotted" }}
                >
                  {themeMode == "dark" ? (
                    <img
                      src={timerDark}
                      style={{ height: "20px", width: "30px" }}
                    />
                  ) : (
                    <img
                      src={timerLight}
                      style={{ height: "20px", width: "30px" }}
                    />
                  )}
                  <p className="mx-2 my-2">Delivery in 26 mins</p>
                  {/* <div className="border-bottom border-b-black dark:border-b-slate-500 border-b-2" style={{borderStyle : "dotted"}}></div> */}
                </div>
                <div
                  className={`${"border-b-black dark:border-b-slate-500 border-b-2"} `}
                  style={{
                    width: "90%",
                    margin: "1% 5%",
                    borderStyle: "dotted",
                  }}
                ></div>
                
              </div>
            </motion.div>
          </Fragment>
        )}
      </AnimatePresence>
    </Fragment>,
    document.getElementById("modal-portal")
  );
};

export default CartModal;
