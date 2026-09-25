import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import LogIn from "./pages/LogIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Home from "./pages/Home.jsx";
import Customize from "./pages/Customize.jsx";
import Customize2 from "./pages/Customize2.jsx";

import { userDataContext } from "./context/UserContext.jsx";

const App = () => {
  const { userData, loading } = useContext(userDataContext);

  if (loading) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center bg-black text-white text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <Routes>

      <Route
        path="/"
        element={
          userData ? <Home /> : <Navigate to="/login" />
        }
      />

      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to="/" />}
      />

      <Route
        path="/login"
        element={!userData ? <LogIn /> : <Navigate to="/" />}
      />

      <Route
        path="/customize"
        element={userData ? <Customize /> : <Navigate to="/login" />}
      />

      <Route
        path="/customize2"
        element={userData ? <Customize2 /> : <Navigate to="/login" />}
      />

    </Routes>
  );
};

export default App;