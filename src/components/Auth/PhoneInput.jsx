import { Fragment } from "react";
import InputBox from "../InputBox/InputBox";
import SubmitBtn from "../Buttons/SubmitBtn";
import { text } from "framer-motion/client";

const PhoneInput = ({ setPhn, sendOtp }) => {
  return (
    <Fragment>
      <div
        className="text-display-div text-center"
        style={{ width: "80%", margin: "5% 0%" }}
      >
        <h1
          style={{ fontWeight: "500", fontSize: "20px" }}
          className="text-slate-500 dark:text-inactive-txt-dark"
        >
          OTP Verification
        </h1>
        <p className="text-slate-500 dark:text-inactive-txt-dark">
          Enter your phone number to get OTP
        </p>
      </div>
      <div
        className="input-box-div "
        style={{ width: "80%", margin: "0% 10%" }}
      >
        <div
          className="form-item focus:border-secondary-bg dark:focus:border-secondary-bg-dark"
          style={{ marginTop: "5%" }}
        >
          <input
            style={{ borderRadius: "10px", borderWidth: "1px" }}
            className="caret-custom-light border-black dark:border-inactive-txt-dark dark:caret-custom-dark peer focus:border-secondary-bg dark:focus:border-secondary-bg-dark text-black dark:text-slate-500 "
            id="Phone"
            type="text"
            onChange={(e) => {
              setPhn(e.target.value);
            }}
            required
          />
          <label
            style={{ borderRadius: "10px" }}
            className="peer-focus:text-secondary-bg dark:peer-focus:text-secondary-bg-dark bg-white dark:text-inactive-txt-dark dark:bg-primary-bg-dark"
            htmlFor="Phone"
          >
            Phone
          </label>
        </div>
        <div
          className="px-2 py-2 flex flex-col justify-center items-center btn-container rounded-xl text-secondary-txt bg-secondary-bg dark:text-white dark:bg-secondary-bg-dark"
          onClick={() => {
            sendOtp();
          }}
          style={{ width: "60%", margin: "0% 20%", marginTop: "10%" }}
        >
          <p>Send Otp</p>
        </div>
      </div>
    </Fragment>
  );
};

export default PhoneInput;
