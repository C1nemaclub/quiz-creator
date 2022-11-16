import { useStateContext } from './context/StateContext';
import React, { useEffect, useState } from 'react';
import Header from './components/Header.js';
import Home from './pages/Home.js';
import Signin from './pages/Signin.js';
import Quizes from './pages/Quizes.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

function App() {
  const { users, createUser, editUser, deleteUser } = useStateContext();

  return (
    <div className='App'>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sign-in' element={<Signin />} />
          <Route path='/quizes' element={<Quizes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
