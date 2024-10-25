import { Fragment, useState } from "react";
import InputBox from "./InputBox/InputBox";
import ThemeBtn from "./Buttons/ThemeBtn";
import SubmitBtn from "./Buttons/SubmitBtn";

const Slider = () => {
  const [phn, setPhn] = useState(null);
  const [activeTab, setActiveTab] = useState("login");
  const sendOtp = () => {
    console.log("Clicked");
    setActiveTab("otp");
  };

  return (
    <Fragment>
      <div
        className="flex flex-col w-full items-center slider-container bg-white dark:bg-primary-bg-dark absolute bottom-0"
        style={{
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          height: "50%",
        }}
      >
        <div
          className="mark-div my-4"
          style={{
            backgroundColor: "gray",
            width: "50px",
            height: "3px",
            borderRadius: "10px",
          }}
        ></div>
        <div className="tab-div w-full mx-2 text-black dark:text-slate-500">
          {/* Add login for bottom border */}
          <ul className="flex flex-row justify-between">
            <div className="flex flex-row jsutify-center items-center tab-conatiner-flex">
              <li
                className={`${
                  activeTab == "login"
                    ? "dark:text-secondary-bg-dark text-secondary-bg border-b-solid border-b-2  border-b-secondary-bg dark:border-b-secondary-bg-dark pb-2"
                    : ""
                }`}
                style={{ margin: "5% 10%", marginLeft: "40%" }}
              >
                Login
              </li>
              <li
                className={`${
                  activeTab == "otp"
                    ? "dark:text-secondary-bg-dark text-secondary-bg border-b-solid border-b-2  border-b-secondary-bg dark:border-b-secondary-bg-dark pb-2"
                    : ""
                }`}
                style={{ margin: "5% 10%", marginLeft: "40%" }}
              >
                Login
              </li>
            </div>
            <li style={{ margin: "5% 10%" }}>
              <ThemeBtn />
            </li>
          </ul>
        </div>
        {activeTab == "login" ? (
          <>
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
              <InputBox type={"text"} label={"Phone"} setFunc={setPhn} />
              <SubmitBtn handleClick={sendOtp} text={"Send OTP"} />
            </div>
          </>
        ) : (
          <>
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
              <InputBox type={"text"} label={"Phone"} setFunc={setPhn} />
              <SubmitBtn handleClick={sendOtp} text={"Send OTP"} />
            </div>
          </>
        )}
      </div>
    </Fragment>
  );
};

export default Slider;
