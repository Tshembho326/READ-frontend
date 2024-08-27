import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {LoginFunctionality, SignUpFunctionality} from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginFunctionality/>} />
      <Route path='/sign-up/' element={<SignUpFunctionality/>} />   
    </Routes>
  </BrowserRouter>
);

