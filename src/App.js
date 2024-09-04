import React from "react";
import SignUp from "./authentication/templates/SignUpPage";
import Login from "./authentication/templates/LoginPage";
import ResetPassword from "./authentication/templates/ResetPasswordPage";
import ForgotPassword from "./authentication/templates/ForgotPasswordPage";
import GetStarted from "./authentication/templates/GetStartedPage";
import StorySelection from "./speech/templates/StorySelection";
import ReadingPage from "./speech/templates/ReadingPage";

export function SignUpFunctionality() {
  return <SignUp />
}

export function LoginFunctionality() {
  return <Login />
}

export function ResetPasswordFunctionality() {
  return <ResetPassword />
}

export function ForgotPasswordFunctionality() {
  return <ForgotPassword />
}

export function GetStartedFunctionality() {
  return <GetStarted />
}

export function StorySelectionFunctionality() {
  return <StorySelection />
}

export function ReadingPageFunctionality() {
  return <ReadingPage />
}