import { Fragment } from "react";

const SubmitBtn = ({ handleClick, text }) => {
  return (
    <Fragment>
      <div
        className="px-2 py-2 flex flex-col justify-center items-center btn-container rounded-xl text-secondary-txt bg-secondary-bg dark:text-white dark:bg-secondary-bg-dark"
        onClick={handleClick}
        style={{width : "60%" , margin : "0% 20%" ,marginTop : "10%"}}
      >
        <p>{text}</p>
      </div>
    </Fragment>
  );
};

export default SubmitBtn;
