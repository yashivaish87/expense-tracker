import React, { useState, useEffect } from "react";
import axios from "axios";
import GuestList from "../utils/GuestList";
import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  //guest form
  const [guestTransactions, setGuestTransactions] = useState(() => {
    const saved = localStorage.getItem("guestTransactions");
    return saved ? JSON.parse(saved) : [];
  });
  const [desc, setDesc] = useState(""); //description
  const [income, setIncome] = useState(""); //income
  const [expense, setExpense] = useState(""); //expense
  const [notes, setNotes] = useState(localStorage.getItem("guestNotes") || ""); //notes
  const [showNotes, setShowNotes] = useState(false); //toggle notes visibility

  //signup or login
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); //toggle between login and signup
  const [errorMessage, setErrorMessage] = useState(""); //error message
  const [successMessage, setSuccessMessage] = useState(""); //success message

  const navigate = useNavigate();

  const balance = guestTransactions.reduce(
    (sum, t) => sum + parseFloat(t.amount),
    0
  );

  //saves guestTransactions to localStorage (ie, user data when its not logged in)
  useEffect(() => {
    localStorage.setItem(
      "guestTransactions",
      JSON.stringify(guestTransactions)
    );
  }, [guestTransactions]);

  //saves notes to localStorage (ie, user notes when its not logged in)
  useEffect(() => {
    localStorage.setItem("guestNotes", notes);
  }, [notes]);

  // handles adding a transaction
  const handleAdd = (e) => {
    e.preventDefault();
    let amount = 0;
    if (income) {
      amount = parseFloat(income);
    } else if (expense) {
      amount = -parseFloat(expense);
    } else {
      return;
    }

    const newTx = { desc, amount, date: new Date().toLocaleDateString() };
    setGuestTransactions([newTx, ...guestTransactions]); //adds new transaction to the beginning of the list
    //clears input fields after submission
    setDesc("");
    setIncome("");
    setExpense("");
  };

  // handles authentication (login/signup)
  const handleAuthSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password || (!isLogin && !name)) {
        setErrorMessage("Please fill all fields.");
        return;
      }

      const payload = isLogin ? { email, password } : { name, email, password };

      const url = isLogin
        ? "http://localhost:8080/api/auth/login"
        : "http://localhost:8080/api/auth/signup";

      const res = await axios.post(url, payload);
      console.log("Login response data:", res.data);

      setSuccessMessage(
        res.data.message ||
          (isLogin ? "Login successful!" : "Signup successful!")
      );

      if (isLogin && res.data.token) {
        localStorage.setItem("token", res.data.token);

        const userData = {
          name: res.data.name,
          email: res.data.email,
        };

        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/dashboard");
      }

      // Reset form
      setName("");
      setEmail("");
      setPassword("");

      // switch to login after signup
      if (!isLogin) setIsLogin(true);
    } catch (err) {
      console.error("Auth error:", err.response?.data || err);
      setErrorMessage(err.response?.data?.message || "Something went wrong.");
    }
  };

  //event listener to click after error or success message to clear message
  useEffect(() => {
    const handleClick = () => {
      setErrorMessage("");
      setSuccessMessage("");
    };

    if (errorMessage || successMessage) {
      document.addEventListener("click", handleClick);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [errorMessage, successMessage]);

  return (
    <div className="flex flex-col md:flex-row h-auto min-h-screen">
      {/* Left Half: Guest transactions */}
      <div className="w-full md:w-1/2 bg-gray-50 p-6 overflow-y-auto">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Guest Mode</h2>
            <h3 className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-lg font-medium shadow-sm">
              Balance: ₹{balance.toFixed(2)}
            </h3>
          </div>

          {/* transaction */}
          <form onSubmit={handleAdd} className="flex flex-col space-y-4 mb-6">
            {/* Description */}
            <input
              type="text"
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="border p-3 rounded-md"
              required
            />

            {/* Income and Expense fields */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <input
                  type="number"
                  placeholder="Income"
                  value={income}
                  onChange={(e) => {
                    setIncome(e.target.value);
                    setExpense("");
                  }}
                  className="border p-3 pl-8 rounded-md w-full"
                />
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-green-600 font-bold">
                  +
                </span>
              </div>
              <div className="flex-1 relative">
                <input
                  type="number"
                  placeholder="Expense"
                  value={expense}
                  onChange={(e) => {
                    setExpense(e.target.value);
                    setIncome("");
                  }}
                  className="border p-3 pl-8 rounded-md w-full"
                />
                <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-red-500 font-bold">
                  -
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-medium"
            >
              Add Transaction
            </button>
          </form>

          <p className="text-sm text-gray-600 mb-6">
            *Data is stored temporarily. Login to save permanently.
          </p>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setShowNotes(!showNotes)}
                className="text-sm bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600"
              >
                {showNotes ? "Hide Notes" : "Add Notes"}
              </button>
            </div>

            {showNotes && (
              <textarea
                rows="5"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Quick notes about your spending..."
                className="w-full border p-3 rounded-md resize-none"
              />
            )}
          </div>

          <GuestList
            guestTransactions={guestTransactions}
            setGuestTransactions={setGuestTransactions}
          />
        </div>
      </div>

      {/* Right Half: Login / Signup toggle */}
      <div className="w-full md:w-1/2  bg-gray-50 flex flex-col justify-center items-center p-20">
        {/* Guest mode alert */}
        <h3 className="text-sm text-gray-500 mb-6 text-center">
          Using guest mode —{" "}
          <span className="text-gray-700">data won't be saved.</span>
          <br />
          <span className="text-indigo-500 font-medium">
            Want to keep it? Log in or sign up.
          </span>
        </h3>

        {/* login or signup */}
        <div className="bg-white p-10 flex flex-col justify-center items-center shadow-lg rounded-3xl">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800">
              {isLogin ? "Login to your Account" : "Create a New Account"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {isLogin
                ? "Welcome back! Please enter your credentials."
                : "Let's get started by creating your account."}
            </p>
          </div>

          <form
            className="flex flex-col space-y-4 w-full max-w-md"
            onSubmit={handleAuthSubmit}
          >
            {!isLogin && (
              <input
                type="text"
                placeholder=" Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {errorMessage && (
              <div className="text-red-500 text-sm mb-2">{errorMessage}</div>
            )}

            {successMessage && (
              <div className="text-green-500 text-sm mb-2">
                {successMessage}
              </div>
            )}

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold py-2 rounded-md"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
            {isLogin && (
              <div className="text-center">
                <Link
                  to="/forgot-password"
                  className="text-sm text-indigo-600 hover:underline hover:text-blue-800"
                >
                  Forgot Password?
                </Link>
              </div>
            )}
          </form>

          <div className="mt-6 text-sm text-gray-600">
            {isLogin ? (
              <>
                Don’t have an account?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-indigo-600 underline hover:text-indigo-800 transition"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-indigo-600 underline hover:text-indigo-800 transition"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
