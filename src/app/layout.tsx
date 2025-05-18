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
          <header></header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
