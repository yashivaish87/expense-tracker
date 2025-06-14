import React, { useState } from "react";
import moon from "../../assets/moon.svg";
import sun from "../../assets/sun.svg";
import useDarkMode from "../../hooks/useDarkMode";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false); // Make sure this state is set correctly on login too
    navigate("/"); // Navigate to homepage or login screen
  };

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
      <header
        className={`h-[80px] z-50 duration-300 ease-in-out p-4 flex items-center justify-between ${
          isLoggedIn ? "bg-[#20504F]" : "bg-[#3b5598]"
        }`}
      >
        {/* Title */}
        <Link to="/" className="text-4xl text-white rounded shadow-lg p-4">
          Expense Tracker
        </Link>

        {/* Right side */}
        {/* Login/Signup or Profile button */}
        {isLoggedIn && (
          <div className="flex gap-2 items-center">
            {/* Profile Button */}
            <button
              onClick={handleProfileClick}
              className="text-sm px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
              👤 Profile
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="text-sm px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              🚪 Logout
            </button>

            {/* Dark Mode Toggle */}
            {colorTheme === "light" ? (
              <motion.img
                initial={{ scale: 0.6, rotate: 90 }}
                animate={{ scale: 1, rotate: 360, transition }}
                whileTap={{ scale: 0.9, rotate: 15 }}
                onClick={toggleDarkMode}
                src={moon}
                alt="dark mode"
                className="cursor-pointer ml-4 h-8"
              />
            ) : (
              <motion.img
                initial={{ rotate: 45 }}
                animate={{ scale: 1, rotate: 360, transition }}
                whileTap={{ scale: 0.9, rotate: 15 }}
                onClick={toggleDarkMode}
                src={sun}
                alt="light mode"
                className="cursor-pointer ml-4 h-8"
              />
            )}
          </div>
        )}
      </header>
    </div>
  );
};
export default Header;
