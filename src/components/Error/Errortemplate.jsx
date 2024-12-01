import React, { useEffect } from "react";
import "./ErrorTemplate.css";
import useScreenWidthObserver from "../../utils/screenObserver";
import { useNavigate } from "react-router-dom";

const ErrorTemplate = ({errorCode = null , errorText}) => {
    const screenWidth = useScreenWidthObserver();
    const queryParams = new URLSearchParams(window.location.search);
    const retrace = queryParams.get('retrace');
    const navigate = useNavigate();

    useEffect(() => {
        if(screenWidth <= 800) navigate(retrace);
    } , [screenWidth])

  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>Oops!</h1>
          <h2>{errorCode ? `${errorCode} - ` : ``}{errorText}</h2>
        </div>
        <a href="/">Go TO Homepage</a>
      </div>
    </div>
  );
};

export default ErrorTemplate;
