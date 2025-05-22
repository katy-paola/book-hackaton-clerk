import CategoriesSelect from "./CategoriesSelect";

export const options = [
  "Finanzas",
  "Matemáticas",
  "Autoayuda",
  "Programación",
  "Educación",
  "Salud y bienestar",
  "Literatura",
];

export default function FormStepOne() {
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
          />
        </label>
      </div>
      <div className="form-field-container form-field-container-categories">
        <CategoriesSelect options={options} />
      </div>
      <div className="form-field-container">
        <label className="form-field-base" htmlFor="description">
          Descripción
          <textarea
            id="description"
            name="description"
            placeholder="Ej.: Este libro innovador nos revela exactamente cómo esos cambios minúsculos pueden crecer hasta llegar a cambiar nuestra carrera profesional, nuestras relaciones y todos los aspectos de nuestra vida."
            className="form-field-base-input"
            rows={3}
          />
        </label>
      </div>
      <button className="edit-form-next-button">Siguiente</button>
    </fieldset>
  );
}
