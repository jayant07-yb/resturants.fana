import { Fragment } from "react";
import { motion } from "framer-motion";

const Filters = ({ filters , toggleFilters }) => {
  return (
    <Fragment>
      <div
        className="overflow-x-auto scrollbar-hide flex flex-row items-center filter-row mt-4 py-3 border-t-tabs-bg dark:border-t-tabs-bg-dark"
        style={{ borderTopWidth: "10px", borderTopStyle: "solid" }}
      >
        {filters
          .filter((e) => e.flag === true)
          .map((e, index) => (
            <motion.div
              onClick={() => toggleFilters(e.filter)}
              key={e}
              className="whitespace-nowrap filter-container border-solid dark:bg-secondary-bg-dark bg-secondary-bg  dark:border-slate-500 rounded-md ml-4 mr-2"
              style={{
                padding: "4px 6px",
                borderWidth: "1px",
                fontSize: "80%",
              }}
              initial={{ opacity: 0 }} // Start with opacity 0 (hidden)
              animate={{ opacity: 1 }} // Animate to opacity 1 (fully visible)
              exit={{ opacity: 0 }} // Fade out when removed
              transition={{ duration: 0.5 }} // Transition duration for the fade effect
            >
              {e.filter}
            </motion.div>
          ))}
        {filters
          .filter((e) => e.flag === false)
          .map((e, index) => (
            <div
              key={index}
              onClick={() => toggleFilters(e.filter)}
              className="whitespace-nowrap filter-container border-solid dark:bg-tabs-bg-dark bg-tabs-bg dark:border-slate-500 rounded-md ml-4 mr-2"
              style={{
                padding: "4px 6px",
                borderWidth: "1px",
                fontSize: "80%",
              }}
            >
              <motion.div
                initial={{ opacity: 0 }} // Initial state (hidden)
                animate={{ opacity: 1 }} // Animated state (fully visible)
                exit={{ opacity: 0 }} // Exit state (fade out when removed)
                transition={{ duration: 0.5 }} // Transition duration for the fade
              >
                {e.filter}
              </motion.div>
            </div>
          ))}
      </div>
    </Fragment>
  );
};
export default Filters;
