import { Fragment } from "react";

const OAuthBtn = ({ textColor, bgColor, image, text , shadow = true}) => {
  return (
    <Fragment>
      <div
        className={`my-2 flex items-center flex-row auth-btn text-${textColor} ${bgColor} rounded-3xl`}
        style={{width : "80%"}}
      >
        <img
        className="rounded-full mx-2 my-1"
          src={image}
          style={{
            height: "15%",
            width: "15%",
            boxShadow:
              shadow ? "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px": "",
          }}
        />
        <p className="ml-4" >{text}</p>
      </div>
    </Fragment>
  );
};

export default OAuthBtn;
