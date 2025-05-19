"use client";

import * as React from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
        const clerkErr = err as { errors: { message: string }[] };
        setError(
          clerkErr.errors[0]?.message || "Ocurrió un error al iniciar sesión."
        );
      } else {
        setError("Error desconocido.");
      }
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <div>
          <label htmlFor="email">
            Correo
            <input
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
              type="email"
              value={email}
              placeholder="ejemplo@correo.com"
            />
          </label>
          <p role="alert">El campo de correo no puede estar vacío</p>
        </div>
        <div>
          <label htmlFor="password">
            Contraseña
            <input
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              name="password"
              type="password"
              value={password}
              placeholder="••••••••"
            />
          </label>
          <p role="alert">El campo de contraseña no puede estar vacío</p>
          <Link href="/auth/reset-password">Olvidé mi contraseña</Link>
        </div>
        <button type="submit">Iniciar sesión</button>
      </fieldset>
    </form>
  );
}
