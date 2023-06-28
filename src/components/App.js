import React from "react";
import { Routes, Route } from "react-router-dom";
import '../styles/App.css';

import NavBar from './NavBar';
import Home from './Home';
import Login from './Login';
import Blogs from './Blogs';
import NoMatch from './NoMatch';
import Profile from "./Profile";

const App = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/blogs" element={<Blogs/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;