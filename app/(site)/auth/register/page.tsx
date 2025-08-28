import Register from "@/components/auth/Register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register",
};

const RegisterPage = () => {
  return <Register></Register>;
};

export default RegisterPage;
