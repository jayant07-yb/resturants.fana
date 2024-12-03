import { Fragment, useEffect } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import useCart from "../../context/Cart";
import backLight from "../../assets/backLight.svg";
import backDark from "../../assets/backDark.svg";
import useTheme from "../../context/theme";
import CartFoodData from "./cartFoodData";
import { useNavigate } from "react-router-dom";
import useUserContext from "../../context/userContext";

const CartModal = () => {
  const navigate = useNavigate();
  const { themeMode } = useTheme();
  const { cartData, toggleCart, clearCart } = useCart();
  const { isOpen, foodData } = cartData;
  const {toggleAuthModal} = useUserContext()

  useEffect(() => {
    if (foodData.every((e) => e === null)) toggleCart();
  }, [cartData]);

  // Calculate total amount based on quantity and cost, with additional checks
  const totalAmount = foodData.reduce((acc, item, index) => {
    if (item && item.type && item.qnt) {
      const itemTotal = item.type.cost * item.qnt;
      console.log(`Item ${index + 1}:`, {
        name: item.name,
        cost: item.type.cost,
        quantity: item.qnt,
        itemTotal,
      });
      return acc + itemTotal;
    }
    console.warn(`Missing data for item at index ${index}`, item);
    return acc;
  }, 0);

  // Function to handle order
  const handleOrder = () => {
    //Use if else here to check authentication
    // Use below for authenticated user
    // toggleCart(); // Close the modal
    // clearCart(); // Clear the cart
    // below runs when there is no user authenticated
    console.log("Order placed:", foodData);
    toggleAuthModal();

  };

  return ReactDOM.createPortal(
    <Fragment>
      <AnimatePresence>
        {cartData.isOpen && (
          <Fragment>
            <motion.div
              initial={{ y: "100vh", height: 0 }}
              animate={{ y: 0, height: "100vh" }}
              exit={{ height: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="fixed flex flex-col bottom-0 bg-white text-black dark:text-white dark:bg-primary-bg-dark w-full"
              style={{ zIndex: "10000", gap: "20px", paddingTop: "10px" }}
            >
              {/* Top Bar */}
              <div className="top-bar-cart flex items-center px-4 py-2">
                {themeMode === "dark" ? (
                  <img
                    onClick={toggleCart}
                    src={backDark}
                    className="ml-2 mr-4 cursor-pointer"
                    style={{ height: "30px", width: "auto" }}
                  />
                ) : (
                  <img
                    onClick={toggleCart}
                    src={backLight}
                    className="ml-2 mr-4 cursor-pointer"
                    style={{ height: "30px", width: "auto" }}
                  />
                )}
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    marginLeft: "10px",
                  }}
                  className="rest-name"
                >
                  Apna Sweets
                </div>
              </div>

              {/* Food Data */}
              <div className="bg-tabs-bg dark:bg-tabs-bg-dark mx-4 px-2 py-2 rounded-xl food-data-div" style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
                {foodData.map((e, index) => {
                  if (e) return <CartFoodData key={index} index={index} />;
                  return null;
                })}
              </div>

              {/* Total Amount */}
              <div className="bg-tabs-bg dark:bg-tabs-bg-dark mx-4 px-4 py-4 rounded-xl" style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                >
                  Total Amount: ₹{totalAmount.toFixed(2)}
                </div>
              </div>

              {/* Order Button */}

              <div
                onClick={handleOrder}
                className="cart-btn-div flex justify-center items-center bg-secondary-bg-cart-btn dark:bg-secondary-bg-dark text-white fixed bottom-0 w-full"
                style={{
                  height: "10%",
                  zIndex: "9000",
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                }}
              >
                <div
                  className="items-count"
                  style={{ fontSize: "20px", fontWeight: "600" }}
                >
                  Order Now
                </div>
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
