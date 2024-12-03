import { Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import useModal from "../../context/Modal";
import food from "../../assets/food.jpeg";
import useCart from "../../context/Cart";
import plus from "../../assets/plus.svg"
import minus from "../../assets/minus.svg"

const ModalComp = () => {
  const { toggleModal, modalDetails } = useModal();
  const { isOpen, foodData } = modalDetails;
  const { addItem } = useCart();
  const [selectedOption, setSelectedOption] = useState(0);
  const [count, setCount] = useState(1);
  const modalHeight = "50vh"; // Fixed to 50% viewport height

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count === 1) return;
    setCount(count - 1);
  };

  const closePortal = () => {
    toggleModal();
    setSelectedOption(null);
  };

  const handleRadioChange = (index) => {
    setSelectedOption(index);
    setCount(1);
  };

  const addToCart = () => {
    const foodObject = {
      name: foodData.name,
      type: foodData.servings[selectedOption],
      qnt: count
    };
    addItem(foodObject);
    toggleModal();
  };

  return ReactDOM.createPortal(
    <Fragment>
      <AnimatePresence>
        {isOpen && (
          <Fragment>
            <div
              onClick={closePortal}
              className="overlay-div fixed top-0 left-0 right-0 bottom-0"
              style={{ zIndex: "10000", backgroundColor: "rgba(0, 0, 0, 0.7)" }}
            ></div>
            <motion.div
              initial={{ y: "100vh", minHeight: 0 }}
              animate={{ y: 0, minHeight: modalHeight }}
              exit={{ height: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="fixed flex flex-col rounded-t-xl bottom-0 bg-white text-black dark:text-white dark:bg-primary-bg-dark w-full"
              style={{ zIndex: "10000", gap: "30px", height: modalHeight }}
            >
              <div
                className="rounded-t-xl flex flex-row items-center food-name-cont bg-tabs-bg dark:bg-tabs-bg-dark dark:text-white"
                style={{ width: "100%", height: "20%" }}
              >
                <img
                  src={food}
                  className="rounded-lg mx-4"
                  style={{ height: "50px", width: "50px" }}
                />
                <h1 style={{ fontSize: "20px", fontWeight: "600" }}>
                  {foodData.name}
                </h1>
              </div>
              <div className="mx-2 px-2 py-2 food-pricing rounded-xl bg-tabs-bg dark:bg-tabs-bg-dark dark:text-white">
                <div className="quantity-box mx-2">
                  <h1 style={{ fontSize: "20px", fontWeight: "600" }}>
                    Quantity
                  </h1>
                  <p className="text-gray-500">Choose one Mandatory</p>
                </div>
                {foodData.servings.map((e, index) => (
                  <div key={index} className="food-servings my-2 flex flex-row justify-between mx-3">
                    <div className="food-size">{e.details}</div>
                    <div className="food-cost flex flex-row">
                      <p>{e.cost}</p>
                      <input
                        className="mx-2 dark:accent-secondary-bg-dark accent-secondary-bg"
                        type="radio"
                        id={`option-${index}`}
                        name="foodOption"
                        checked={selectedOption === index}
                        onChange={() => handleRadioChange(index)}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className=" bg-tabs-bg dark:bg-tabs-bg-dark dark:text-white py-2 absolute bottom-0 food-picked-details w-full flex flex-row justify-between" style={{height : "20%"}}>
                <div style={{margin : "2% 3%" , width : "24%"}} className="flex flex-row justify-between items-center current-item rounded-lg  bg-secondary-bg text-white dark:bg-secondary-bg-dark">
                  <p className="mx-2" onClick={decrementCount}>
                    <img src={minus} style={{height : "20px"}} />
                  </p>
                  <p className="mx-2" >{count}</p>
                  <p className="mx-2" onClick={incrementCount}>
                    <img src={plus} style={{width : "15px"}} />
                  </p>
                </div>
                <div onClick={addToCart}  className="flex justify-center items-center add-item rounded-lg bg-secondary-bg text-white dark:bg-secondary-bg-dark" style={{width : "60%" , margin : "2% 5%"}}>
                  <p style={{fontWeight : "500" , fontSize : "18px"}}>Add items ${count * (foodData.servings[selectedOption].cost)}</p>
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

export default ModalComp;
