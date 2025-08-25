"use client";

import AuthForm from "./AuthForm";

const Login = () => {
  return <AuthForm title="Login" onSubmit={(data) => console.log(data)} />;
};

export default Login;
