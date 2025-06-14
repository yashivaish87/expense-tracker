// client/src/pages/DashboardPage.jsx
import React, { useEffect, useRef } from "react";

import Graph from "../utils/Graph";
import Form from "../utils/Form";

function DashboardPage() {
  //restrict going back to homepage after login
  const backPressCount = useRef(0);

  useEffect(() => {
    // Push current state so that we can trap back press
    window.history.pushState(null, "", window.location.href);

    const handleBackButton = (e) => {
      e.preventDefault();
      backPressCount.current += 1;

      if (backPressCount.current === 1) {
        alert("Press back again to exit the app.");
        setTimeout(() => {
          backPressCount.current = 0;
        }, 2000); // reset count after 2 sec
        window.history.pushState(null, "", window.location.href);
      } else if (backPressCount.current === 2) {
        window.onpopstate = null; // allow back to proceed
        window.history.back(); // go back or exit
      }
    };

    window.onpopstate = handleBackButton;

    return () => {
      window.onpopstate = null; // cleanup when component unmounts
    };
  }, []);

  return (
    <div className="text-center drop-shadow-lg dark:bg-[#141625] dark:text-gray-500 text-gray-800 duration-300 min-h-screen ">
      {/* <h1 className="text-4xl py-8 mb-10 text-white rounded shadow-lg sm:px-4" style={{backgroundColor: '#20504F'}}>Expense Tracker</h1> */}

      {/* grid columns */}
      <div className="pt-10 grid md:grid-cols-2 gap-6 mx-8 px-6 pb-10">
        {/* Chart */}
        <Graph></Graph>
        {/* Form */}
        <Form></Form>
      </div>
    </div>
  );
}

export default DashboardPage;
