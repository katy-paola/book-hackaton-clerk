import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { DM_Sans } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/icons/Menu";
import ArrowUp from "@/components/icons/ArrowUp";

const dmSans = DM_Sans({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

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
                  <Link href="/users" className="profile-link">
                    Mi perfil
                  </Link>
                </li>
                <li>
                  <Link href="/saved" className="nav-link">
                    Guardado
                  </Link>
                </li>
                <li>
                  <Link href="/">Cerrar sesión</Link>
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
          <footer>
            <p>
              Hecho por <a href="#">@katy-paola</a> y <a href="#">@pipegoods</a>
              .
            </p>
            <Link href="#" aria-label="Volver arriba" title="Volver arriba">
              <ArrowUp />
            </Link>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
