import LoginPage from "@/components/auth/LoginPage";
import { Suspense } from "react";

const Login = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage />
    </Suspense>
  );
};

export default Login;
