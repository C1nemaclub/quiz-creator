import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { StateContext } from './context/StateContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StateContext>
    <App />
  </StateContext>
);
