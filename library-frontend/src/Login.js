import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function Login() {
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/add");
    }
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <h1>Login</h1>
    </div>
  );
}

export default Login;
