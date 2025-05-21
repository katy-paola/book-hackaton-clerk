'use client';

import { useState } from 'react';
import { useClerk, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Menu from "@/components/icons/Menu";
import Close from "@/components/icons/Close";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { signOut } = useClerk();
  const { isSignedIn } = useUser();
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <header className="main-header">
      <Link href="/" className="logo-container" aria-label="Inicio">
        <img src="/logo.svg" alt="Logo de BooK" height={40} />
      </Link>
      <button
        className="menu-button"
        aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={isMenuOpen}
        onClick={toggleMenu}
      >
        {isMenuOpen ? <Close /> : <Menu />}
      </button>
      <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
        <ul className="nav-menu-ul">
          {/* Siempre visible */}
          <li>
            <Link 
              className="nav-item" 
              href="/"
              onClick={() => setIsMenuOpen(false)}
            >
              Explorar
            </Link>
          </li>

          {/* Mostrar solo si NO está autenticado */}
          {!isSignedIn && (
            <li>
              <Link 
                className="nav-item" 
                href="/auth"
                onClick={() => setIsMenuOpen(false)}
              >
                Ingresar
              </Link>
            </li>
          )}

          {/* Mostrar solo si está autenticado */}
          {isSignedIn && (
            <>
              <li>
                <Link 
                  className="nav-item" 
                  href="/users"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mi perfil
                </Link>
              </li>
              <li>
                <Link 
                  className="nav-item" 
                  href="/saved"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Guardado
                </Link>
              </li>
              <li>
                <a 
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="nav-item"
                  type='button'
       
                >
                  Cerrar sesión
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
