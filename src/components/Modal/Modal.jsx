import { Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import useModal from "../../context/Modal";
import food from "../../assets/food.jpeg";
import useCart from "../../context/Cart";

const ModalComp = () => {
  const { toggleModal, modalDetails } = useModal();
  const { isOpen, foodData } = modalDetails;
  const { addItem } = useCart();
  const [selectedOption, setSelectedOption] = useState(0);
  const [count, setCount] = useState(1);
  const [modalHeight, setModalHeight] = useState("50vh");

  useEffect(() => {
    const updateModalHeight = () => {
      const vh = window.innerHeight * 0.01;
      setModalHeight(`calc(${vh * 100}px - 10px)`); // Adding some buffer
    };

    updateModalHeight(); // Set initially
    window.addEventListener("resize", updateModalHeight);
    
    return () => window.removeEventListener("resize", updateModalHeight);
  }, []);

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
      name,
      type: servings[selectedOption],
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
              className="absolute flex flex-col rounded-t-xl bottom-0 bg-white text-black dark:text-white dark:bg-primary-bg-dark w-full"
              style={{ zIndex: "10000", gap: "30px", height: modalHeight }}
            >
              {/* Rest of the content */}
            </motion.div>
          </Fragment>
        )}
      </AnimatePresence>
    </Fragment>,
    document.getElementById("modal-portal")
  );
};

export default ModalComp;
