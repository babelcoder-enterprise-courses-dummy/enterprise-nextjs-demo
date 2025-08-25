"use client";

import { useLogin } from "@/hooks/queries/auth";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import AuthForm from "./AuthForm";

const Login = () => {
  const { mutateAsync: login } = useLogin();
  return (
    <AuthForm
      title="Login"
      onSubmit={async (credentials) => {
        try {
          await login(credentials);
        } catch {
          toast.error("Invalid Credentials", { position: "top-center" });
          return;
        }

        toast.success("Welcome back!");
        redirect("/");
      }}
    />
  );
};

export default Login;
