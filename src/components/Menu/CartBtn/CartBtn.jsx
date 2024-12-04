import { Fragment } from "react";
const CartBtn = ({foodData , isSearchModalOpen , toggleCart , cartData}) => {
  return (
    <Fragment>
      {foodData.length > 0 && !isSearchModalOpen && (
        <div
          onClick={toggleCart}
          className="cart-btn-div flex justify-center items-center bg-secondary-bg-cart-btn dark:bg-secondary-bg-dark text-white fixed bottom-0 w-full"
          style={{
            height: "10%",
            zIndex: "1500",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          }}
        >
          <div
            className="items-count"
            style={{ fontSize: "20px", fontWeight: "600" }}
          >
            {`${cartData.foodData.length} item${
              cartData.foodData.length > 1 ? "s" : ""
            } added ~>`}
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default CartBtn;
