import { Fragment } from "react";

const OrderModal = () => {
  return (
    <Fragment>
      <div className="absolute OrderModal bg-white text-black w-full bottom-0 rounded-xl" style={{ height: "70vh" , zIndex : "100000" }}>
        Order Modal
      </div>
    </Fragment>
  );
};

export default OrderModal;
