import React, { useEffect, useState } from "react";

function UserProfile() {
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Invalid user data in localStorage", error);
      }
    }
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 bg-white rounded-xl shadow-lg text-center">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">
        Welcome, {user.name || "User"} 👋
      </h2>
      <p className="text-lg text-gray-600 mb-2">
        <strong>Email:</strong> {user.email || "Not available"}
      </p>

      {/* Optional Logout Button */}
      <button
        onClick={() => {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setTimeout(() => {
            window.location.href = "/"; // Or use navigate("/")
          }, 1000);
        }}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}

export default UserProfile;
