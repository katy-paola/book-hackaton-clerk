"use client";

import "./css/edit.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { editBook } from "@/app/books/actions/edit-book.action";
import CategorySelectorWrapper from "@/app/books/components/CategorySelectorWrapper";
import { useFormStatus } from "react-dom";
import { Tables } from "@/types/database.types";
import CategoriesSelect from "@/app/edit-book-prueba/components/CategoriesSelect";
import { options } from "@/app/edit-book-prueba/components/FormStepOne";
import ArrowLeft from "@/components/icons/ArrowLeft";

type BookRow = Tables<"books">;

type EditBookFormProps = {
  book: BookRow & {
    book_categories?: {
      categories: {
        id: string;
        name: string;
      };
    }[];
  };
};

// Componente para el botón de envío con estado de carga
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="edit-form-submit-button"
      disabled={pending}
      aria-disabled={pending}
    >
      {pending ? "Guardando..." : "Guardar cambios"}
    </button>
  );
}

// Estado inicial con tipo apropiado para el formulario
type FormState = {
  error: string | null;
  success: boolean;
  data: unknown | null;
};

export default function EditBookForm({ book }: EditBookFormProps) {
  const router = useRouter();

  // Extraer los IDs de categorías del libro
  const initialCategories = book.book_categories
    ? book.book_categories.map((bc) => bc.categories.id)
    : [];

  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(initialCategories);

  // Estado para previsualización de imagen
  const [imagePreview, setImagePreview] = useState<string>(
    book.cover_url || ""
  );
  const [newImageSelected, setNewImageSelected] = useState<boolean>(false);

  // Estado del formulario
  const [formState, setFormState] = useState<FormState>({
    error: null,
    success: false,
    data: null,
  });

  // Efecto para redireccionar después de un envío exitoso
  useEffect(() => {
    if (formState.success) {
      router.push("/users");
      router.refresh();
    }
  }, [formState.success, router]);

  // Función para manejar cambio de imagen
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImageSelected(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Función para manejar la acción del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Obtener el formulario y crear FormData
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Agregar las categorías seleccionadas al FormData
    selectedCategories.forEach((categoryId) => {
      formData.append("categories", categoryId);
    });

    // Si no se seleccionó una nueva imagen, conservar la URL existente
    if (!newImageSelected && book.cover_url) {
      formData.append("cover_url", book.cover_url);
    }

    // Logs para depuración
    console.log("Book ID:", book.id);
    console.log("Form data entries:");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    console.log("Selected categories:", selectedCategories);

    // Llamar a la acción del servidor
    try {
      const result = await editBook(book.id, formData);

      console.log("Edit result:", result);

      if ("error" in result) {
        setFormState({ error: result.error, success: false, data: null });
        console.error("Error from server:", result.error);
      } else {
        setFormState({ error: null, success: true, data: result.data });
      }
    } catch (error) {
      console.error("Exception caught:", error);
      setFormState({
        error: "Error al procesar el formulario",
        success: false,
        data: null,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      {formState.error && (
        <div className="message error">{formState.error}</div>
      )}
      <StepOne book={book} />
      <fieldset className="form-fieldset">
        {/* <button type="button" className="prev-button">
          <ArrowLeft />
          Anterior
        </button> */}
        <div className="form-field-container">
          <label className="form-field-base" htmlFor="author">
            Autor
            <input
              type="text"
              id="author"
              name="author"
              placeholder="Ej.: James Clear"
              className="form-field-base-input"
              required
              defaultValue={book.author}
            />
          </label>
        </div>
        <fieldset className="form-field-container container-access-types">
          <legend className="access-type-legend">Tipo de acceso</legend>
          <div className="input-select-access-container">
            <label className="label-select" htmlFor="access">
              <select
                id="access"
                name="access"
                className="select"
                defaultValue={book.access}
              >
                <option value="free">Gratis</option>
                <option value="paid">De pago</option>
              </select>
            </label>
          </div>
        </fieldset>
        <div className="form-field-container">
          <label className="form-field-base">
            Portada del libro
            <input
              type="file"
              id="cover"
              name="cover"
              accept="image/*"
              className="input-file"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="image-preview mb-2">
                <img
                  src={imagePreview}
                  alt="Vista previa de portada"
                  style={{
                    maxWidth: "200px",
                    maxHeight: "200px",
                    objectFit: "contain",
                  }}
                />
              </div>
            )}
          </label>
          <small className="text-input-image">
            {book.cover_url
              ? "Sube una nueva imagen para reemplazar la actual"
              : "Selecciona una imagen para la portada"}
          </small>
        </div>

        <div className="form-field-container">
          <label className="form-field-base" htmlFor="link">
            Enlace del libro
            <input
              type="url"
              id="link"
              name="link"
              className="form-field-base-input"
              required
              placeholder="https://ejemplo.com/libro"
              defaultValue={book.link}
            />
          </label>
        </div>

        <div className="edit-book-buttons">
          <SubmitButton />
          <button
            type="button"
            className="edit-book-cancel"
            onClick={() => router.back()}
          >
            Cancelar
          </button>
        </div>
      </fieldset>
    </form>
  );
}

//COMPONENTES FORMULARIO POR PASOS

function StepOne({ book }: EditBookFormProps) {
  return (
    <fieldset className="form-fieldset">
      <div className="form-field-container">
        <label className="form-field-base" htmlFor="title">
          Título
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Ej.: Hábitos atómicos"
            className="form-field-base-input"
            required
            defaultValue={book.title}
          />
        </label>
      </div>
      <div className="form-field-container form-field-container-categories">
        <CategoriesSelect options={options} />
      </div>
      {/* 
          <div className="form-field-container  form-field-container-categories">
            <label className="form-label">Categorías</label>
            <CategorySelectorWrapper
              onChange={setSelectedCategories}
              selectedIds={selectedCategories}
            />
          </div>
        */}
      <div className="form-field-container">
        <label className="form-field-base" htmlFor="description">
          Descripción
          <textarea
            id="description"
            name="description"
            placeholder="Ej.: Este libro innovador nos revela exactamente cómo esos cambios minúsculos pueden crecer hasta llegar a cambiar nuestra carrera profesional, nuestras relaciones y todos los aspectos de nuestra vida."
            className="form-field-base-input"
            rows={3}
            defaultValue={book.description || ""}
          />
        </label>
      </div>
      {/* <button type="button" className="edit-form-next-button">Siguiente</button> */}
    </fieldset>
  );
}
