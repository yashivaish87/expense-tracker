import "./App.css";
import React, { useState, useEffect } from "react";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/utils/Header";
import HomePage from "./components/pages/HomePage";
import DashboardPage from "./components/pages/DashboardPage";
import UserProfile from "./components/pages/UserProfile";
import ForgotPassword from "./components/pages/ForgotPassword";
import ResetPassword from "./components/pages/ResetPassword";

function App() {
  const location = useLocation();
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/" />;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      setAuthenticated(true);
    } else {
      setIsLoggedIn(false);
      setAuthenticated(false);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to={isLoggedIn ? "/dashboard" : "/homepage"} replace />
          }
        />
        <Route
          path="/homepage"
          element={
            isLoggedIn ? <Navigate to="/dashboard" replace /> : <HomePage />
          }
        />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<DashboardPage />} />}
        />
        <Route
          path="/profile"
          element={<PrivateRoute element={<UserProfile />} />}
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route
          path="*"
          element={
            !isLoggedIn ? <Navigate to="/homepage" /> : <div>404 Not Found</div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
