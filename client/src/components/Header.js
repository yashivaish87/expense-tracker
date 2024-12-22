import React, { useState } from "react";
import moon from "../assets/moon.svg";
import sun from "../assets/sun.svg";
import useDarkMode from "../hooks/useDarkMode";
import { motion } from "framer-motion";

export default function Header() {
  const [colorTheme, setTheme] = useDarkMode();
  const [setDarkSide] = useState(colorTheme === "light" ? true : false);

  const toggleDarkMode = () => {
    setTheme(colorTheme);
    setDarkSide((state) => !state);
  };

  const transition = {
    type: "spring",
    stiffness: 200,
    damping: 10,
  };
  return (
    <div>
      {/* Header */}
      <header className="h-[80px] z-50 duration-300 ease-in-out p-4 bg-[#20504F] flex items-center justify-between">
        {/* Title */}
        <h1 className="text-4xl text-white rounded shadow-lg p-4">
          Expense Tracker
        </h1>

        {/* Right side */}
        <div className="flex items-center">
          {/* DarkMode Button */}
          {colorTheme === "light" ? (
            <motion.img
              initial={{ scale: 0.6, rotate: 90 }}
              animate={{ scale: 1, rotate: 360, transition }}
              whileTap={{ scale: 0.9, rotate: 15 }}
              onClick={toggleDarkMode}
              src={moon}
              className=" cursor-pointer ml-8 h-10"
            />
          ) : (
            <motion.img
              initial={{ rotate: 45 }}
              animate={{ scale: 1, rotate: 360, transition }}
              whileTap={{ scale: 0.9, rotate: 15 }}
              onClick={toggleDarkMode}
              src={sun}
              className=" cursor-pointer ml-8 h-10"
            />
          )}
        </div>
      </header>
    </div>
  );
}
