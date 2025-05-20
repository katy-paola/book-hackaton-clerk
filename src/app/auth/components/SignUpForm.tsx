"use client";

import * as React from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FormFieldBase from "./FormFieldBase";

interface ClerkError {
  errors?: { message: string }[];
}

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

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const result = await signUp.create({
        emailAddress,
        password,
        firstName: name,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/"); // Redirige a home o dashboard
      } else {
        console.error("Registro incompleto", JSON.stringify(result, null, 2));
      }
    } catch (err: unknown) {
      if (err && typeof err === "object" && "errors" in err) {
        const clerkErr = err as ClerkError;
        console.error(clerkErr.errors?.[0]?.message || "Error desconocido");
      } else {
        console.error("Error desconocido", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <div>
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
        <div>
          <FormFieldBase
            label="Correo"
            id="sign-up-email"
            name="email"
            type="email"
            value={emailAddress}
            placeholder="ejemplo@correo.com"
            onChange={(e) => setEmailAddress(e.target.value)}
          />
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
        </div>
        <div>
          <FormFieldBase
            label="Confirmar contraseña"
            id="sign-up-password"
            name="confirm-password"
            type="password"
            value={confirmPassword}
            placeholder="••••••••"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <p role="alert">{error}</p>
        </div>
        <button type="submit">Registrarme</button>
      </fieldset>
      <button>
        <Link href="/auth/sign-up">
          ¿Ya tienes una cuenta? <span>Iniciar sesión</span>{" "}
        </Link>
      </button>
    </form>
  );
}
