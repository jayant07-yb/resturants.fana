import { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import useModal from "../../context/Modal";

const CartModal = () => {
  const { toggleModal, modalDetails } = useModal();
  const { isOpen, foodData } = modalDetails;
  const [selectedOption, setSelectedOption] = useState(0);
  const [count , setCount] = useState(1);

  const incrementCount =  () => {
    setCount(count + 1);
  }
  
  const decrementCount =  () => {
    if(count == 1) return
    setCount(count - 1);
  }


  const closePortal = () => {
    toggleModal();
    setSelectedOption(null); 
  };

  const handleRadioChange = (index) => {
    setSelectedOption(index);
    setCount(1);
  };

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
            </motion.div>
          </Fragment>
        )}
      </AnimatePresence>
    </Fragment>,
    document.getElementById("modal-portal")
  );
};

export default CartModal;
