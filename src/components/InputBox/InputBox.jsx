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
      <div className="form-item focus:border-blue-500 dark:focus:border-dark-2">
        <input type={`${type}`} onChange={handleChange} required />
        <label for="password">{label}</label>
      </div>
    </Fragment>
  );
};

export default InputBox;
