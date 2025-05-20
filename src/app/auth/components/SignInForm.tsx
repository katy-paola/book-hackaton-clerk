"use client";

import * as React from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ResetPassword from "./ResetPassword";
import FormFieldBase from "./FormFieldBase";

interface ClerkError {
  errors?: { message: string }[];
}

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const router = useRouter();

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
      <form onSubmit={handleSubmit}>
        <fieldset>
          <div>
            <FormFieldBase
              label="Correo"
              id="sign-in-email"
              name="email"
              type="email"
              value={email}
              placeholder="ejemplo@correo.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            <p role="alert">El campo de correo no puede estar vacío</p>
          </div>
          <div>
            <FormFieldBase
              label="Contraseña"
              id="sign-in-password"
              name="password"
              type="password"
              value={password}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
            <p role="alert">El campo de contraseña no puede estar vacío</p>
            <Link href="/auth/reset-password">Olvidé mi contraseña</Link>
          </div>
          <button type="submit">Iniciar sesión</button>
        </fieldset>
        <button>
          <Link href="/auth/sign-up">
            ¿No tienes cuenta? <span>Regístrate</span>{" "}
          </Link>
        </button>
      </form>
      <ResetPassword />
    </>
  );
}
