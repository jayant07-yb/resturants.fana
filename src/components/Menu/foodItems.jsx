import { Fragment } from "react";
import food from "../../assets/food.jpeg";
import useModal from "../../context/Modal";

const FoodItems = ({ foodData, active, index, size }) => {
  const { toggleModal } = useModal();
  const handleAdd = () => {
    toggleModal(foodData);
  };

  return (
    <Fragment>
      <div
        style={{
          borderBottom: index < size - 1 ? "dashed 1px" : "",
          paddingBottom: "10%",
        }}
        className={`border-b-black dark:border-b-slate-500 flex flex-row justify-center items-center mx-4 my-4 items-container  overflow-hidden ${
          active ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="food-details-container basis-1/2">
          <h1 style={{ fontSize: "18px", fontWeight: "700" }}>
            {foodData.name}
          </h1>
          {foodData.servings.length === 1 && (
            <div className="cost my-4">
             Rs {foodData.servings[0].cost}
            </div>
          )}
          <div className="food-details mr-1">{foodData.information}</div>
        </div>

        <div className="basis-1/2 food-image-container flex flex-col items-center justify-center relative">
          <img className="rounded-xl" src={food} alt="" />
          <div
            onClick={handleAdd}
            className="absolute btn-container rounded-md text-white  bg-secondary-bg dark:bg-secondary-bg-dark px-2 py-2 text-center"
            style={{ width: "50%", bottom: "-15%", left: "30%" }}
          >
            Add
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default FoodItems;
