import "./css/auth.css";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";

export default async function AuthPage() {
  return (
    <section className="auth-page">
      <header className="auth-header">
        <h1 className="auth-title">
          Iniciar sesión en tu cuenta
          <br />
          Crear una nueva cuenta
        </h1>
        <div className="auth-tabs">
          <button className="auth-tab active-tab">Inicia sesión</button>
          <button className="auth-tab">Regístrate</button>
        </div>
      </header>
      <SignInForm />
      <SignUpForm />
    </section>
  );
}
