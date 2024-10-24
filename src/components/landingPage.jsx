import { Fragment } from "react";
import Slider from "./Slider";

const LandingPage = () => {
  return (
    <Fragment>
      <div class="px-0 bg-dark-bg w-full min-h-screen max-w-screen-sm mx-auto p-4 relative">
        <Slider/>
      </div>
    </Fragment>
  );
};

export default LandingPage;
