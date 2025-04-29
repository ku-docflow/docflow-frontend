// src/pages/RegisterPage.tsx
import React from "react";
import SignUpForm from "../components/MainInterface/SignUpForm/SignUpForm";

const SignupPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <SignUpForm />
    </div>
  );
};

export default SignupPage;