import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
/* import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs"; */
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/icons/Menu";

export const metadata: Metadata = {
  title: "BooK - No pierdas tus libros por leer",
  description:
    "BooK te ayuda a no perder de vista tus libros pendientes. Guarda, organiza y accede a tus recomendaciones favoritas en tu biblioteca digital personal.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${dmSans.className}`}>
          <header>
            <Link href="/" aria-label="Inicio">
              <Image
                src="/logo.svg"
                alt="Logo de BooK"
                width={120}
                height={40}
              />
            </Link>
            <nav>
              <button aria-label="Abrir menú de navegación">
                <Menu />
              </button>
              <ul>
                <li>
                  <Link href="/">Explorar</Link>
                </li>
                <li>
                  <Link href="/profile">Mis libros</Link>
                </li>
                <li>
                  <Link href="/saved">Guardado</Link>
                </li>
                <li>
                  <Link href="/library">Cerrar sesión</Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link href="/">Explorar</Link>
                </li>
                <li>
                  <Link href="/sign-in">Ingresar</Link>
                </li>
              </ul>
            </nav>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
