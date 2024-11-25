import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import ViewMail from "./components/viewMail";

import SentBox from "./components/sentBox";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/mail" element={<ViewMail />} />
        <Route path="/sentmail" element={<SentBox />} />
      </Routes>
    </Router>
  );
};

export default App;
