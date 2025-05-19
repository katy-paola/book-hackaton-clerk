"use client";

import FormStepOne from "./components/FormStepOne";
import FormStepTwo from "./components/FormStepTwo";

export default function EditBookForm() {
  return (
    <main>
      <header>
        <h1>Editar libro</h1>
      </header>
      <FormStepOne />
      <FormStepTwo />
    </main>
  );
}
