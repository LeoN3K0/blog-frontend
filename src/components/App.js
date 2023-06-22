import React from 'react';
import { Routes, Route } from "react-router-dom";
import '../styles/App.css';
import NavBar from './NavBar';
import Login from './Login';
import Home from './Home';
import NoMatch from './NoMatch';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />

          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;