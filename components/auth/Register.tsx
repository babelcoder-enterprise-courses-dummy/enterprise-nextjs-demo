"use client";

import AuthForm from "./AuthForm";

const Register = () => {
  return <AuthForm title="Register" onSubmit={(data) => console.log(data)} />;
};

export default Register;
