import { Fragment, useState } from "react";

const Subsection = () => {
  const [active, setActive] = useState(true);
  const handleToggle = () => {
    setActive(!active)
  }
  return (
    <Fragment>
      <div
        style={{ borderBottomWidth: "1px", borderBottomStyle: "solid" }}
        className="border-b-slate-500  subsection-container"
      >
        <div className="subsection-name py-3 flex flex-row justify-between">
          <h2 className="ml-4">Indian</h2>
          <div className="arror mr-3" onClick={handleToggle}>^</div>
        </div>
        {active ? (
          <div className="items-container ">
            <div className="top-bar flex flex-row justify-between">
              <h1 className="ml-4">Biryani</h1>
              <div className="add-btn" style={{ marginRight: "5%" }}>
                add
              </div>
            </div>
            <p className="ml-4">339</p>
            <div className="details ml-4">creamy and flavorful</div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </Fragment>
  );
};

export default Subsection;
