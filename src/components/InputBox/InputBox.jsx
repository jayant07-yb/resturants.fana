import { Fragment } from "react";
import "./InputBox.css"
// https://codepen.io/kod101/pen/gdjPaW
const InputBox = ({type , setFunc , label}) => {

  //Optimise with restricting api calls only after 2 sec of last typed word
  const handleChange = (e) => {
    setFunc(e.target.value);
  }

  return (
    <Fragment>
      <div className="form-item focus:border-secondary-bg dark:focus:border-secondary-bg-dark"style={{marginTop : "5%"}}>
        <input  style={{borderRadius : "10px" , borderWidth : "1px"}} className= "caret-custom-light border-black dark:border-inactive-txt-dark dark:caret-custom-dark peer focus:border-secondary-bg dark:focus:border-secondary-bg-dark text-black dark:text-slate-500 " id={label} type={`${type}`} onChange={handleChange} required />
        <label style={{borderRadius : "10px"}} className="peer-focus:text-secondary-bg dark:peer-focus:text-secondary-bg-dark bg-white dark:text-inactive-txt-dark dark:bg-primary-bg-dark" for={label}>{label}</label>
      </div>
    </Fragment>
  );
};

export default InputBox;
