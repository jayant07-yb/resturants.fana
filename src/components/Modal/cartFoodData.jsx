import { Fragment } from "react";
import useCart from "../../context/Cart";

const CartFoodData = (data) => {
    const {index} = data;
    const {cartData} = useCart();
    console.log("cartComp" , index)
    const foodData = cartData.foodData[index]
    const {changeQnt} = useCart();

    const increment = () => {
        changeQnt(foodData , 1);
    }

    const decrement = () => {
        changeQnt(foodData , -1);
    }
  return (
    <Fragment>
      <div className="food flex flex-row justify-between">
        <div className="food-name">
          <p style={{ fontSize: "17px" }}>{foodData.name}</p>
          <p style={{ fontSize: "17px" }}>{foodData.type.details}</p>
        </div>
        <div className="food-cost-edit flex flex-col justify-center items-end">
          <div className="rounded-lg flex flex-row justify-center items-center btn bg-secondary-bg text-white dark:bg-secondary-bg-dark">
            <p onClick={decrement} style={{ fontSize: "18px" }} className="ml-2 mr-2">
              -
            </p>
            <p style={{ fontSize: "18px" }} className="mx-2">
              {cartData.foodData[index].qnt}
            </p>
            <p onClick={increment} style={{ fontSize: "18px" }} className="mr-2 ml-2">
              +
            </p>
          </div>
          <div className="cost">${foodData.type.cost}</div>
        </div>
      </div>
      
    </Fragment>
  );
};

export default CartFoodData;
