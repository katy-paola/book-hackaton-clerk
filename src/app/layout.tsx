import "./globals.css";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { DM_Sans } from "next/font/google";
import Link from "next/link";
import Header from "@/components/Header";
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

const dmSansSemibold = DM_Sans({
  weight: "600",
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
          className={`${dmSansRegular.className} ${dmSansMedium.className} ${dmSansSemibold.className} body`}
        >
          <Header />
          {children}
          <footer className="main-footer">
            <p className="app-authors">
              Hecho por{" "}
              <a className="app-author" href="#">
                @katy-paola
              </a>{" "}
              y{" "}
              <a className="app-author" href="#">
                @pipegoods
              </a>
              .
            </p>
            <Link
              className="to-top-link"
              href="#"
              aria-label="Volver arriba"
              title="Volver arriba"
            >
              <ArrowUp />
            </Link>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
