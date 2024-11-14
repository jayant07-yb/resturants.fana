import { Fragment, useState } from "react";
import Category from "./Category";

const Subsection = ({ subSectionObject }) => {


  return (
    <Fragment>
      {subSectionObject.map((e, index) => {
        return <Category category={e} index={index} size={subSectionObject.length} key={index}/>
      })}
    </Fragment>
  )
};

export default Subsection;
