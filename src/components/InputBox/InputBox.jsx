import { Fragment } from "react";
import "./InputBox.css"
// https://codepen.io/kod101/pen/gdjPaW
const InputBox = () => {
  return (
    <Fragment>
      <div class="form-item">
        <input type="password" id="password" autocomplete="off" required />
        <label for="password">Password</label>
      </div>
    </Fragment>
  );
};
