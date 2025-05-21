"use client";

import "./css/add.css";

import FormStepOne from "./components/FormStepOne";
import FormStepTwo from "./components/FormStepTwo";

export default function AddBookForm() {
  return (
    <main className="add-book-page">
      <header className="add-book-header">
        <h1 className="add-book-title">Publicar nuevo libro</h1>
      </header>
      <form className="add-form">
        <FormStepOne />
        <FormStepTwo />
      </form>
    </main>
  );
}
