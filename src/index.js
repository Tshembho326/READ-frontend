import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {LoginFunctionality, SignUpFunctionality, ResetPasswordFunctionality, ForgotPasswordFunctionality} from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginFunctionality/>} />
      <Route path='/sign-up/' element={<SignUpFunctionality/>} />
      <Route path='/reset-password/' element={<ResetPasswordFunctionality/>} />
      <Route path='/forgot-password/' element={<ForgotPasswordFunctionality />} />
    </Routes>
  </BrowserRouter>
);

