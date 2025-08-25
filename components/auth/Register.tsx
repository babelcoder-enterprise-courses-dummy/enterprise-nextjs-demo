"use client";

import { useRegister } from "@/hooks/queries/auth";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import AuthForm from "./AuthForm";

const Register = () => {
  const { mutateAsync: register } = useRegister();
  return (
    <AuthForm
      title="Register"
      onSubmit={async (credentials) => {
        await register(credentials);
        toast.success("Register successfully!");
        redirect("/auth/login");
      }}
    />
  );
};

export default Register;
