import React from "react";
import AuthLayout from "../features/auth/component/AuthLayout";
import RegistrationForm from "../features/auth/component/RegistrationForm";

export default function RegisterPage() {
  return (
    <AuthLayout>
      <RegistrationForm />
    </AuthLayout>
  );
}
