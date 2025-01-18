import { Fragment } from "react";
import menu from "../../../assets/menu.svg";
const MenuBtn = ({ toggleSubMenu, foodData }) => {
  return (
    <Fragment>
      <div
        onClick={toggleSubMenu}
        className="menu-btn-container fixed bg-blue-600 rounded-full"
        style={{
          height: "6%",
          width: "6vh",
          zIndex: "1500",
          padding: "5px",
          bottom: foodData?.length ? "19%" : "10%",
          right: "20px",
        }}
      >
        <img src={menu} />
      </div>
    </Fragment>
  );
};
export default MenuBtn;
