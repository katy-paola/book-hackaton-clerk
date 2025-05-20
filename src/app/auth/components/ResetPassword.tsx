"use client";

import React, { useEffect, useState } from "react";
import { useAuth, useSignIn } from "@clerk/nextjs";
import type { NextPage } from "next";
import { redirect, useRouter } from "next/navigation";
import Close from "@/components/icons/Close";
import FormFieldBase from "./FormFieldBase";

const ForgotPasswordPage: NextPage = () => {
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

  // Send the password reset code to the user's email
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

  // Reset the user's password.
  // Upon successful reset, the user will be
  // signed in and redirected to the home page
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
          // Set the active session to
          // the newly created session (user is now signed in)
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
    <form onSubmit={!successfulCreation ? create : reset}>
      <button type="button">
        <Close />
        Cerrar
      </button>
      <fieldset>
        {!successfulCreation && (
          <>
            <legend>¿Olvidaste tu contraseña</legend>
            <p>Puedes restablecerla aquí</p>
            <FormFieldBase
              label="Correo"
              id="reset-password-email"
              name="email"
              type="email"
              value={email}
              placeholder="ejemplo@correo.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div>
              <button>Enviar código</button>
              <button type="button">Cancelar</button>
            </div>
            {error && <p>{error}</p>}
          </>
        )}

        {successfulCreation && (
          <>
            <legend>Restablecer contraseña</legend>
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
            <button>Restablecer contraseña</button>
            {error && <p>{error}</p>}
          </>
        )}
      </fieldset>
    </form>
  );
};

export default ForgotPasswordPage;
