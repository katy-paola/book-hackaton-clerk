import { AddBookMultiStepForm } from "./AddBookMultiStepForm";
import "./add.css";

export default function AddBookPage() {
  return (
    <main className="add-book-page">
      <header className="add-book-header">
        <h1 className="add-book-title">Publicar nuevo libro</h1>
      </header>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <AddBookMultiStepForm />
      </div>
    </main>
  );
}