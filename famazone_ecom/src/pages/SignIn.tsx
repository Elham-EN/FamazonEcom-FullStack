import React from "react";
import AuthLayout from "../features/auth/component/AuthLayout";
import SignInForm from "../features/auth/component/SignInForm";

export default function SignInPage() {
  return (
    <div>
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </div>
  );
}
