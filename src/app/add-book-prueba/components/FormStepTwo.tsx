import "../css/add.css";
import ArrowLeft from "@/components/icons/ArrowLeft";
import Image from "next/image";

export default function FormStepTwo() {
  return (
    <fieldset className="form-fieldset">
      <button className="close-button">
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
      <fieldset className="form-field-container">
        <legend>Tipo de acceso</legend>
        <label className="form-field-base">
          <input type="radio" name="access-type" />
          Gratis
        </label>
        <label>
          <input type="radio" name="access-type" />
          De pago
        </label>
      </fieldset>
      <div className="form-field-container">
        <label className="form-field-base">
          Foto de Portada
          <input type="file" name="cover-photo" />
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
