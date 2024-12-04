import { Fragment, useState } from "react";
import InputBox from "../InputBox/InputBox";
import ThemeBtn from "../Buttons/ThemeBtn";
import SubmitBtn from "../Buttons/SubmitBtn";
import PhoneInput from "./PhoneInput";
import OTP from "./OTP";
import ReactDOM from "react-dom";
import useUserContext from "../../context/userContext";

const Slider = () => {
  const [phn, setPhn] = useState(null);
  const [activeTab, setActiveTab] = useState("login");
  const {toggleAuthModal} = useUserContext()
  // OTP Data
  const [otp, setOtp] = useState(new Array(5).fill(""));
  const sendOtp = () => {
    console.log("Clicked Send Otp ");
    setActiveTab("otp");
  };

  return ReactDOM.createPortal(
    <Fragment>
      <div className="parent-div fixed top-0 left-0 right-0 bottom-0" style={{zIndex : "10000"}}>
        <div
        onClick={toggleAuthModal}
          className="overlay-div bg-opacity-40-"
          style={{
            height: "100%",
            background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0))", // Linear gradient
            zIndex: 1000, // Ensure it appears above other elements
          }}
        ></div>
        <div
          className="flex flex-col w-full items-center slider-container bg-white dark:bg-primary-bg-dark absolute bottom-0"
          style={{
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            height: "80%",
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
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
                  Verify
                </li>
              </div>
              <li style={{ margin: "5% 10%" }}>
                <ThemeBtn />
              </li>
            </ul>
          </div>
          {activeTab == "login" ? (
            <PhoneInput setPhn={setPhn} sendOtp={sendOtp} />
          ) : (
            <OTP otp={otp} setOtp={setOtp} />
          )}
        </div>
      </div>
    </Fragment>,
    document.getElementById("modal-portal")
  );
};

export default Slider;
