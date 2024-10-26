import { Fragment, useState } from "react";
import Category from "./Category";

const Subsection = ({ subSectionObject }) => {


  return (
    <Fragment>
      {subSectionObject.map((e, index) => {
        console.log(e.category, index);
        return <Category category={e} index={index} size={subSectionObject.length} />
      })}
    </Fragment>
  )
};

export default Subsection;
