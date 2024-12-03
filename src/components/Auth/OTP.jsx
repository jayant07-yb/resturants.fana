import { Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";

const OTP = ({ otp, setOtp }) => {
  const inputRefs = useRef([]);
  const queryParams = new URLSearchParams(window.location.search);
  let retrace = queryParams.get("retrace");
  const navigate = useNavigate();
  const handleChange = (e, index) => {
    if (e.length > 1) e = e[e.length - 1];
    setOtp((prevState) => {
      const newState = [...otp];
      newState[index] = e;
      return newState;
    });
    if (e.length === 1 && index < otp.length - 1)
      inputRefs.current[index + 1].focus();
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }

    if (e.key === "e") {
      e.preventDefault();
    }
  };

  const handleVerify = () => {
    if (retrace == "") retrace = "/";
    navigate(retrace);
  };

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
          An otp has been sent to 1234567890
        </p>
      </div>
      <div
        className="input-box-div "
        style={{ width: "80%", margin: "0% 10%" }}
      >
        <div
          className="form-item flex flex-row focus:border-secondary-bg dark:focus:border-secondary-bg-dark"
          style={{ marginTop: "5%" }}
        >
          {otp.map((value, index) => {
            return (
              <input
                ref={(e) => (inputRefs.current[index] = e)}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="bg-slate-400 focus:border-secondary-bg dark:focus:border-secondary-bg-dark border-black text-black dark:border-white dark:text-white border-solid border-2 mx-2 rounded-lg"
                key={index}
                type="number"
                value={value}
                min={0}
                max={9}
                maxLength={1}
              />
            );
          })}
        </div>
        <div
          className="px-2 py-2 flex flex-col justify-center items-center btn-container rounded-xl text-secondary-txt bg-secondary-bg dark:text-white dark:bg-secondary-bg-dark"
          onClick={handleVerify}
          style={{ width: "60%", margin: "0% 20%", marginTop: "10%" }}
        >
          <p>Verify</p>
        </div>
      </div>
    </Fragment>
  );
};

export default OTP;
