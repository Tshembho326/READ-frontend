import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {LoginFunctionality, SignUpFunctionality, ResetPasswordFunctionality,
   ForgotPasswordFunctionality, GetStartedFunctionality, StorySelectionFunctionality,
   ReadingPageFunctionality} from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginFunctionality/>} />
      <Route path='/get-started/' element={<GetStartedFunctionality />} />
      <Route path='/sign-up/' element={<SignUpFunctionality/>} />
      <Route path='/reset-password/' element={<ResetPasswordFunctionality/>} />
      <Route path='/forgot-password/' element={<ForgotPasswordFunctionality />} />

      <Route path= '/story-selection/' element={<StorySelectionFunctionality />} />
      <Route path='/reading-page/' element={<ReadingPageFunctionality />} />
    </Routes>
  </BrowserRouter>
);

