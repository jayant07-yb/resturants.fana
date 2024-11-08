import { Fragment } from "react";
import useCart from "../../context/Cart";

const CartFoodData = (data) => {
  const { index } = data;
  const { cartData } = useCart();
  console.log("cartComp", index);
  const foodData = cartData.foodData[index];
  const { changeQnt } = useCart();

  const increment = () => {
    changeQnt(foodData, 1);
  };

  const decrement = () => {
    changeQnt(foodData, -1);
  };
  return (
    <Fragment>
      <div className={`food flex flex-row justify-between my-3`}>
        <div className="food-name ml-3">
          <p style={{ fontSize: "19px" }}>{foodData.name}</p>
          <p className="mt-2" style={{ fontSize: "17px" }}>
            {foodData.type.details}
          </p>
        </div>
        <div className="food-cost-edit flex flex-col justify-center items-end mr-3">
          <div className="rounded-lg flex flex-row justify-center items-center btn bg-secondary-bg text-white dark:bg-secondary-bg-dark">
            <p
              onClick={decrement}
              style={{ fontSize: "18px" }}
              className="ml-2 mr-2"
            >
              -
            </p>
            <p style={{ fontSize: "18px" }} className="mx-2">
              {cartData.foodData[index].qnt}
            </p>
            <p
              onClick={increment}
              style={{ fontSize: "18px" }}
              className="mr-2 ml-2"
            >
              +
            </p>
          </div>
          <div className="cost mt-3">${foodData.type.cost}</div>
        </div>
      </div>
      <div
        className={`${
          index < cartData.foodData.length - 1
            ? "border-b-black dark:border-b-slate-500 border-b-2"
            : ""
        } `}
        style={{ width: "90%", margin: "5% 5%" }}
      ></div>
    </Fragment>
  );
};

export default CartFoodData;
