import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
