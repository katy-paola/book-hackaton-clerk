"use client";

import * as React from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import FormFieldBase from "./FormFieldBase";

export default function Page() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [name, setName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    // Limpiar error previo
    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      // Crear usuario solo con email y password
      const result = await signUp.create({
        emailAddress,
        password,
        firstName: name,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/"); // Redirige a home o dashboard
      } else {
        // Mostrar el estado resultante para depuración
        console.log("Estado de registro:", result.status);
        setError("No se pudo completar el registro. Intente nuevamente.");
      }
    } catch (err: any) {
      // Mejorando el manejo de errores de Clerk
      console.error("Error de registro:", err);

      // Intentar extraer mensaje de error legible
      if (err && typeof err === "object") {
        if (
          "errors" in err &&
          Array.isArray(err.errors) &&
          err.errors.length > 0
        ) {
          // Formato típico de errores de Clerk
          const clerkError = err.errors[0];
          setError(clerkError.message || "Error en el registro");
        } else if ("message" in err) {
          // Error general con mensaje
          setError(err.message);
        } else {
          // Fallback para otros casos
          setError("Error al procesar el registro");
        }
      } else {
        setError("Ocurrió un error inesperado");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <fieldset className="auth-form-fieldset">
        <div className="form-field-container">
          <FormFieldBase
            label="Nombre"
            id="sign-up-name"
            name="name"
            type="text"
            value={name}
            placeholder="Juan Pérez"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-field-container">
          <FormFieldBase
            label="Correo"
            id="sign-up-email"
            name="email"
            type="email"
            value={emailAddress}
            placeholder="ejemplo@correo.com"
            onChange={(e) => setEmailAddress(e.target.value)}
          />
          {/* <p className="form-field-error-message" role="alert">
            El campo de correo no puede estar vacío
          </p> */}
        </div>
        <div>
          <FormFieldBase
            label="Contraseña"
            id="sign-up-password"
            name="password"
            type="password"
            value={password}
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <p className="form-field-error-message" role="alert">
            El campo de contraseña no puede estar vacío
          </p> */}
        </div>
        <div>
          <FormFieldBase
            label="Confirmar contraseña"
            id="sign-up-confirm-password"
            name="confirm-password"
            type="password"
            value={confirmPassword}
            placeholder="••••••••"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {/* <p className="form-field-error-message" role="alert">
            Las contraseñas no coinciden
          </p> */}
        </div>

        {/* Mostrar mensaje de error */}
        {error && (
          <p className="form-field-error-message" role="alert">
            {error}
          </p>
        )}

        {/* CAPTCHA Widget */}
        <div
          id="clerk-captcha"
          data-cl-theme="auto"
          data-cl-size="normal"
        ></div>

        <button className="auth-form-submit-button" type="submit">
          Registrarme
        </button>
      </fieldset>
      <button className="account-button">
        ¿Ya tienes una cuenta?{" "}
        <span className="account-button-link">Iniciar sesión</span>.
      </button>
    </form>
  );
}
