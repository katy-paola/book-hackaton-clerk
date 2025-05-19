"use client";

import FormStepOne from "./components/FormStepOne";
import FormStepTwo from "./components/FormStepTwo";

export default function AddBookForm() {
  return (
    <main>
      <header>
        <h1>Publicar nuevo libro</h1>
      </header>
      <FormStepOne />
      <FormStepTwo />
    </main>
  );
}
