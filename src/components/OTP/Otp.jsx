import { Fragment, useState } from "react";

const OtpInput = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));

  const handleInputChange = (e , index) => {
    const digit = e.target.value;
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    if(value && index < otp.length - 1){
        document.getElementById(`otp-input-${index+1}`).focus();
    }
  }


  return (
    <Fragment>
      {
        <div className="otp-input">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="number"
              min="0"
              max="9"
              required
              value={digit}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              id={`otp-input-${index}`}
            />
          ))}
        </div>
      }
    </Fragment>
  );
};

export default OtpInput;
