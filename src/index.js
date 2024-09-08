import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {LoginFunctionality, SignUpFunctionality, ResetPasswordFunctionality,
   ForgotPasswordFunctionality, GetStartedFunctionality,
   ReadingPageFunctionality, LibraryFunctionality, ProfileFunctionality, HomeFunctionality} from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginFunctionality/>} />
      <Route path='/get-started/' element={<GetStartedFunctionality />} />
      <Route path='/sign-up/' element={<SignUpFunctionality/>} />
      <Route path='/reset-password/' element={<ResetPasswordFunctionality/>} />
      <Route path='/forgot-password/' element={<ForgotPasswordFunctionality />} />
      <Route path='/library/' element={<LibraryFunctionality />} />
      <Route path='/reading-page/' element={<ReadingPageFunctionality />} />
      <Route path='/profile/' element={<ProfileFunctionality/>} />
      <Route path='/home/' element={<HomeFunctionality/>} />
      
    </Routes>
  </BrowserRouter>
);


