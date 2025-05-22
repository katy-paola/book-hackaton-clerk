"use client";

import * as React from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import ResetPassword from "./ResetPassword";
import FormFieldBase from "./FormFieldBase";
import { useEffect } from "react";

interface ClerkError {
  errors?: { message: string }[];
}

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const router = useRouter();

  const [showModal, setShowModal] = React.useState(false);

  useEffect(() => {
    const handleClose = () => setShowModal(false);
    window.addEventListener("closeResetPasswordModal", handleClose);
    return () =>
      window.removeEventListener("closeResetPasswordModal", handleClose);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push("/");
      } else {
        console.error(
          "Sign-in not complete:",
          JSON.stringify(signInAttempt, null, 2)
        );
      }
    } catch (err: unknown) {
      if (err && typeof err === "object" && "errors" in err) {
        const clerkErr = err as ClerkError;
        setError(
          clerkErr.errors?.[0]?.message || "Ocurrió un error al iniciar sesión."
        );
      } else {
        setError("Error desconocido.");
      }
      console.error("Error:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="auth-form">
        <fieldset className="auth-form-fieldset">
          <div className="form-field-container">
            <FormFieldBase
              label="Correo"
              id="sign-in-email"
              name="email"
              type="email"
              value={email}
              placeholder="ejemplo@correo.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            {/*  <p className="form-field-error-message" role="alert">
              El campo de correo no puede estar vacío
            </p> */}
          </div>
          <div className="form-field-container">
            <FormFieldBase
              label="Contraseña"
              id="sign-in-password"
              name="password"
              type="password"
              value={password}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <p className="form-field-error-message" role="alert">
              El campo de contraseña no puede estar vacío
            </p> */}
            <button
              type="button"
              className="forgot-password-button"
              onClick={() => setShowModal(true)}
            >
              Olvidé mi contraseña
            </button>
          </div>
          <button className="auth-form-submit-button" type="submit">
            Iniciar sesión
          </button>
        </fieldset>
        <button className="account-button">
          ¿No tienes cuenta?{" "}
          <span className="account-button-link">Regístrate</span>.
        </button>
      </form>
      {showModal && <ResetPassword />}
    </>
  );
}
