import SignInForm from "./components/SignForm";

export default async function AuthPage() {
  return (
    <div className="auth-page">
      <header>
        <h1>Iniciar sesión en tu cuenta</h1>
        <div>
          <button>Inicia sesión</button>
          <button>Regístrate</button>
        </div>
      </header>
      <SignInForm />
    </div>
  );
}
