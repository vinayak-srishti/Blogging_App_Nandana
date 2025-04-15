import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/common/Navbar";
import Home from "./components/common/Home";
import Signup from "./components/user/Signup"
import login from "./components/user/Login"
import ForgetPassword from "./components/user/ForgetPassword"
import ResetPassword from "./components/user/ResetPassword"
import ResetSuccess from "./components/user/ResetSuccess"

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Login from './components/user/Login';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/forget-password" element={<ForgetPassword/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/success" element={<ResetSuccess />} />



      </Routes>
    </Router>
  );
}

export default App;
