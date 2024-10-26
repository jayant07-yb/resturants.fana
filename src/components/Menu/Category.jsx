import { Fragment, useState } from "react";
import downArrowWhite from "../../assets/downArrowWhite.svg";
import upArrowWhite from "../../assets/upArrowLight.svg";
import downArrowDark from "../../assets/downArrowDark.svg";
import upArrowDark from "../../assets/upArrowDark.svg";
import useTheme from "../../context/theme";
import food from "../../assets/food.jpeg";
import FoodItems from "./foodItems";

const Category = ({ category, index, size }) => {
  const [active, setActive] = useState(false);
  const { themeMode } = useTheme();
  const handleToggle = () => {
    setActive(!active);
  };

  console.log(category, index, size);
  return (
    <Fragment>
      <div
        style={{
          height: !active ? "50px" : "",
        }}
      >
        <div className="subsection-name my-3 py-3 flex flex-row justify-between">
          <h2 className="ml-4" style={{ fontSize: "18px", fontWeight: "500" }}>
            {category.category}
          </h2>
          <div className="arror mr-3 cursor-pointer" onClick={handleToggle}>
            {themeMode == "dark" ? (
              active ? (
                <img
                  src={upArrowWhite}
                  className=""
                  style={{ height: "20px" }}
                  alt=""
                />
              ) : (
                <img
                  src={downArrowWhite}
                  className=""
                  style={{ height: "20px" }}
                  alt=""
                />
              )
            ) : active ? (
              <img
                src={upArrowDark}
                className=""
                style={{ height: "20px" }}
                alt=""
              />
            ) : (
              <img
                src={downArrowDark}
                className=""
                style={{ height: "20px" }}
                alt=""
              />
            )}
          </div>
        </div>
        {category.items.map((e , index) => {
          return <FoodItems foodData={e} index={index} size={category.items.length} active={active} />;
        })}
      </div>
      {index < size - 1 ? (
        <div
          className="border-div bg-slate-500"
          style={{ height: "1px", width: "95%", margin: "0% 2.5%" }}
        ></div>
      ) : (
        <></>
      )}
    </Fragment>
  );
};

export default Category;
