import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/common/Navbar";
import Home from "./components/common/Home";
import Signup from "./components/user/Signup"
import Login from './components/user/Login';
import ForgetPassword from "./components/user/ForgetPassword"
import ResetPassword from "./components/user/ResetPassword"
import ResetSuccess from "./components/user/ResetSuccess"
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

import ViewAllBlogs from './components/admin/ViewAllBlogs';
import UserViewProfile from './components/user/UserViewProfile';
import EditProfile from './components/user/EditProfile';
import ViewAllUsers from './components/admin/ViewAllUsers';
import ViewOneUser from './components/admin/ViewOneUser';
import PendingUsers from './components/admin/PendingUsers';

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


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
        <Route path="/success" element={<ResetSuccess/>} />
        
       
        
        <Route path="/userviewprofile" element={<UserViewProfile/>} />

        <Route path="/admin-login" element={<AdminLogin/>} />
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        <Route path="/editprofile" element={<EditProfile/>} />
        <Route path="/viewallusers" element={<ViewAllUsers/>} />
        <Route path="/viewoneuser/:id" element={<ViewOneUser/>} />
        <Route path="/view-all-blogs" element={<ViewAllBlogs/>} />
        <Route path="/pendingusers" element={<PendingUsers/>} />
        

        



      </Routes>
    </Router>
  );
}

export default App;
