import React from "react";
import SignUp from "./authentication/templates/SignUpPage";
import Login from "./authentication/templates/LoginPage";
import ResetPassword from "./authentication/templates/ResetPasswordPage";
import ForgotPassword from "./authentication/templates/ForgotPasswordPage";
import GetStarted from "./authentication/templates/GetStartedPage";
import Library from "./llibrary/tamplates/library";
import Profile from "./ManageAccount/templates/Profile";
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

export function ReadingPageFunctionality() {
  return <ReadingPage />
}

export function LibraryFunctionality() {
  return <Library />
}

export function ProfileFunctionality() {
  return <Profile />
}
