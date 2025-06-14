import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  console.log("Token from URL:", token);

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setMessage("");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:8080/api/auth/reset-password/${token}`,
        { password }
      );
      setMessage(res.data.message);
      setError("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else if (err.response && err.response.data) {
        setError(JSON.stringify(err.response.data));
      } else {
        setError("Something went wrong");
      }
      setMessage("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Reset Your Password</h2>
      <form onSubmit={handleReset}>
        <input
          type="password"
          className="w-full p-2 border rounded mb-4"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full p-2 border rounded mb-4"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button className="w-full bg-green-600 text-white p-2 rounded">
          Reset Password
        </button>
      </form>

      {/* Error message */}
      {error && <p className="mt-4 text-red-500 font-medium">{error}</p>}

      {/* Success message */}
      {message && <p className="mt-4 text-green-600 font-medium">{message}</p>}
    </div>
  );
};

export default ResetPassword;
