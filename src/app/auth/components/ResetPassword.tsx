"use client";

import React, { useEffect, useState } from "react";
import { useAuth, useSignIn } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import Close from "@/components/icons/Close";
import FormFieldBase from "./FormFieldBase";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/");
    }
  }, [isSignedIn, router]);

  if (!isLoaded) {
    return null;
  }

  // Custom event to notify parent to close modal
  const handleClose = () => {
    const event = new CustomEvent("closeResetPasswordModal");
    window.dispatchEvent(event);
  };

  async function create(e: React.FormEvent) {
    e.preventDefault();
    await signIn
      ?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      .then(() => {
        setSuccessfulCreation(true);
        setError("");
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  async function reset(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    await signIn
      ?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      })
      .then((result) => {
        if (result.status === "complete") {
          setActive({ session: result.createdSessionId });
          setError("");
          redirect("/auth");
        } else {
          console.log(result);
        }
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  return (
    <form
      className="reset-password-form"
      onSubmit={!successfulCreation ? create : reset}
    >
      <button
        className="close-button"
        type="button"
        onClick={handleClose}
      >
        <Close />
        Cerrar
      </button>
      <fieldset>
        {!successfulCreation && (
          <>
            <div className="reset-password-legend-container">
              <legend className="reset-password-title">
                ¿Olvidaste tu contraseña?
              </legend>
              <p className="reset-password-description">
                Puedes restablecerla aquí
              </p>
            </div>
            <FormFieldBase
              label="Correo"
              id="reset-password-email"
              name="email"
              type="email"
              value={email}
              placeholder="ejemplo@correo.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="reset-password-buttons">
              <button className="reset-password-button reset-password-code-button">
                Enviar código
              </button>
              <button
                className="reset-password-button reset-password-cancel-button"
                type="button"
                onClick={handleClose}
              >
                Cancelar
              </button>
            </div>
            {error && <p>{error}</p>}
          </>
        )}

        {successfulCreation && (
          <>
            <legend className="reset-password-title">
              Restablecer contraseña
            </legend>
            <FormFieldBase
              label="Nueva contraseña"
              id="new-password"
              name="password"
              type="password"
              value={password}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormFieldBase
              label="Confirmar nueva contraseña"
              id="confirm-new-password"
              name="confirm-password"
              type="password"
              value={confirmPassword}
              placeholder="••••••••"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <FormFieldBase
              label="Código de verificación"
              id="verification-code"
              name="code"
              type="number"
              value={code}
              placeholder="123456"
              onChange={(e) => setCode(e.target.value)}
            />
            <div className="reset-password-buttons">
              <button className="reset-password-button reset-password-code-button">
                Restablecer contraseña
              </button>
              <button
                className="reset-password-button reset-password-cancel-button"
                type="button"
                onClick={handleClose}
              >
                Cancelar
              </button>
            </div>
            {error && <p>{error}</p>}
          </>
        )}
      </fieldset>
    </form>
  );
};

export default ForgotPasswordPage;
