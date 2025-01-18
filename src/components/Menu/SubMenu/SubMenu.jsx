import { Fragment } from "react";
import allFoods from "../../../json/goaCafe.json";
const SubMenu = ({ toggleSubMenu, foodData }) => {
  const handleScroll = (event) => {
    console.log("Handle Scroll", event.target);
    const targetClass = event.target.id;
    console.log(targetClass);
    const targetElement = document.getElementsByClassName(targetClass)[0]; // Find the div with the corresponding ID
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" }); // Scroll to the element
    }
  };
  return (
    <Fragment>
      <div
        onClick={toggleSubMenu}
        className="sub-menu-overlay fixed bottom-0 right-0 left-0 top-0"
        style={{
          zIndex: "1500",
          background: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <div
          className="sub-menu-container bg-white rounded-2xl p-4 absolute"
          style={{
            fontSize: "23px",
            fontWeight: "500",
            width: "80%",
            maxHeight: "50%",
            right: "20px",
            bottom: foodData?.length ? "26%" : "17%",
            overflowY: "scroll",
            zIndex: "1600",
          }}
        >
          <ul>
            {allFoods.sections.map((e, index) => {
              return (
                <li
                  className="my-3 flex flex-row justify-between mx-3"
                  style={{}}
                  key={index}
                  id={e.sectionName}
                  onClick={handleScroll}
                >
                  <p id={e.sectionName}>{e.sectionName}</p>
                  <p id={e.sectionName}>{e.subSections.length}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};
export default SubMenu;
