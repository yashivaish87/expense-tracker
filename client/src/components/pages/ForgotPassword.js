import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Send");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsLoading(true);
    setButtonText("Processing...");
    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/forgot-password",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setIsLoading(false);
      setMessage(res.data.message);
      setIsSuccess(true);
      setButtonText("Sent");
      setEmail("");

      //reset from after 5 seconds
      setTimeout(() => {
        setMessage("");
        setIsSuccess(false);
        setButtonText("Send");
      }, 5000);
    } catch (err) {
      setIsLoading(false);
      setMessage("Something went wrong. Try again.");

      setTimeout(() => {
        setMessage("");
        setIsSuccess(false);
        setButtonText("Send");
      }, 5000);
      // setEmail("");

      console.log(err.response?.data || err.message);
    }
  };

  // const handleReset = () => {
  //   setEmail("");
  //   setMessage("");
  //   setIsLoading(false);
  //   setIsSuccess(false);
  //   setButtonText("Send");
  // };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="w-full p-2 border rounded mb-4"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className={`w-full p-2 rounded ${
            isLoading || buttonText === "Sent"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500"
          } text-white`}
          disabled={isLoading || buttonText === "Sent"}
        >
          {buttonText}
        </button>
      </form>
      {message && (
        <>
          <p
            className={`mt-4 text-center font-sm ${
              isSuccess ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>

          {/* {!isSuccess && (
            <div className="text-center">
              <button
                onClick={handleReset}
                className="text-sm bg-red-500 hover:bg-red-600 text-white p-2 mt-2 rounded-md"
              >
                Try Again
              </button>
            </div>
          )} */}
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
