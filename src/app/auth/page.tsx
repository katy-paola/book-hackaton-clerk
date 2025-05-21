"use client";

import "./css/auth.css";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import { useState } from "react";

export default function AuthPage() {
  const [authType, setAuthType] = useState("sign-in");

  return (
    <section className="auth-page">
      <header className="auth-header">
        <h1 className="auth-title">
          {authType === "sign-in"
            ? "Iniciar sesión en tu cuenta"
            : "Crear una nueva cuenta"}
        </h1>
        <div className="auth-tabs">
          <button
            type="button"
            onClick={() => setAuthType("sign-in")}
            className="auth-tab active-tab"
          >
            Inicia sesión
          </button>
          <button
            type="button"
            onClick={() => setAuthType("sign-up")}
            className="auth-tab"
          >
            Regístrate
          </button>
        </div>
      </header>
      {authType === "sign-in" ? <SignInForm /> : <SignUpForm />}
    </section>
  );
}
