import { useStateContext } from './context/StateContext';
import React, { useEffect, useState } from 'react';
import Header from './components/Header.js';
import Home from './pages/Home.js';
import Quizes from './pages/Quizes.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import './styles/GlobalStyles.scss';

function App() {
  const { users, createUser, editUser, deleteUser } = useStateContext();

  return (
    <div className='App'>
      <Router>
        <Header />
        <Toaster />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/quizes' element={<Quizes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
