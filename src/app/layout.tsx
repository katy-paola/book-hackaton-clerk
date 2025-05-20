import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { DM_Sans } from "next/font/google";
import Link from "next/link";
import Menu from "@/components/icons/Menu";
import ArrowUp from "@/components/icons/ArrowUp";

const dmSansRegular = DM_Sans({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const dmSansMedium = DM_Sans({
  weight: "500",
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
        <body
          className={`${dmSansRegular.className} ${dmSansMedium.className} body`}
        >
          <header className="main-header">
            <Link href="/" className="logo-container" aria-label="Inicio">
              <img src="/logo.svg" alt="Logo de BooK" height={40} />
            </Link>
            <button
              className="menu-button"
              aria-label="Abrir menú de navegación"
            >
              <Menu />
            </button>
            <nav className="nav-menu">
              <ul className="nav-menu-ul">
                <li>
                  <Link className="nav-item" href="/">
                    Explorar
                  </Link>
                </li>
                <li>
                  <Link className="nav-item" href="/sign-in">
                    Ingresar
                  </Link>
                </li>
                <li>
                  <Link className="nav-item" href="/users">
                    Mi perfil
                  </Link>
                </li>
                <li>
                  <Link className="nav-item" href="/saved">
                    Guardado
                  </Link>
                </li>
                <li>
                  <Link className="nav-item" href="/">
                    Cerrar sesión
                  </Link>
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
