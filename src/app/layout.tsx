import type { Metadata } from 'next'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'BooK - No pierdas tus libros por leer',
  description: 'BooK te ayuda a no perder de vista tus libros pendientes. Guarda, organiza y accede a tus recomendaciones favoritas en tu biblioteca digital personal.',
  icons: {
    icon: "/favicon.svg",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <nav className="main-nav">
                <Link href="/books" className="nav-link">
                  Catálogo
                </Link>
                <Link href="/saved" className="nav-link">
                  Guardados
                </Link>
                <Link href="/categories" className="nav-link">
                  Categorías
                </Link>
                <Link href="/users" className="profile-link">
                  Mi perfil
                </Link>
              </nav>
              <UserButton />
            </SignedIn>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}