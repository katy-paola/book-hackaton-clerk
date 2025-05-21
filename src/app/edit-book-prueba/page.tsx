"use client";

import "./css/edit.css";
import FormStepOne from "./components/FormStepOne";
import FormStepTwo from "./components/FormStepTwo";

export default function EditBookForm() {
  return (
    <main className="edit-book-page">
      <header className="edit-book-header">
        <h1 className="edit-book-title">Editar libro</h1>
      </header>
      <form className="edit-form">
        <FormStepOne />
        <FormStepTwo />
      </form>
    </main>
  );
}
