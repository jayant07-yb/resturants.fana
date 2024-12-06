import { Fragment } from "react";
import Subsection from "../Subsections";
const Sections = ({ filteredFoodData }) => {
  return (
    <Fragment>
      {filteredFoodData.map((section, index) => (
        <div
          key={index}
          className={`food-data-div mt-4 py-3 border-t-tabs-bg dark:border-t-tabs-bg-dark ${section.sectionName}`}
          style={{ borderTopWidth: "10px", borderTopStyle: "solid" }}
        >
          <h1
            className="text-black ml-4 dark:text-white"
            style={{ fontSize: "25px", fontWeight: "700" }}
          >
            {section.sectionName}
          </h1>
          <Subsection subSectionObject={section.subSections} />
        </div>
      ))}
    </Fragment>
  );
};
export default Sections;
