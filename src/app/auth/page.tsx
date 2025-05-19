import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";

export default async function AuthPage() {
  return (
    <div className="auth-page">
      <header>
        <h1>
          Iniciar sesión en tu cuenta
          <br />
          Crear una nueva cuenta
        </h1>
        <div>
          <button>Inicia sesión</button>
          <button>Regístrate</button>
        </div>
      </header>
      <SignInForm />
      <SignUpForm />
    </div>
  );
}
