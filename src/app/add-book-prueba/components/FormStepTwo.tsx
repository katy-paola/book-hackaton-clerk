import "../css/add.css";
import ArrowLeft from "@/components/icons/ArrowLeft";
import Image from "next/image";
import RadioButton from "@/app/books/components/RadioButton";

export default function FormStepTwo() {
  return (
    <fieldset className="form-fieldset">
      <button type="button" className="prev-button">
        <ArrowLeft />
        Anterior
      </button>
      <div className="form-field-container">
        <label className="form-field-base" htmlFor="title">
          Autor
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Ej.: James Clear"
            className="form-field-base-input"
            required
          />
        </label>
      </div>
      <fieldset className="form-field-container container-access-types">
        <legend className="access-type-legend">Tipo de acceso</legend>
        <div className="list-access-types">
          <RadioButton label="Gratis" />
          <RadioButton label="De pago" />
        </div>
      </fieldset>
      <div className="form-field-container">
        <label className="form-field-base">
          Foto de portada
          <input className="input-file" type="file" name="cover-photo" />
          <Image
            src="/input-file-placeholder.png"
            alt=""
            width={80}
            height={100}
          />
        </label>
      </div>
      <button className="add-form-submit-button">Publicar</button>
    </fieldset>
  );
}
