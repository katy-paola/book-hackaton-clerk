"use client";

import { ChangeEvent } from "react";
import ArrowLeft from "@/components/icons/ArrowLeft";
import RadioButton from "./RadioButton";

type FormStepTwoProps = {
  formData: {
    author: string;
    access: "free" | "paid";
    link: string;
  };
  onInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAccessTypeChange: (access: "free" | "paid") => void;
  onPrev: () => void;
  onSubmit: (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent) => void;
  imagePreview: string | null;
  isSubmitting?: boolean;
};

export default function FormStepTwo({
  formData,
  onInputChange,
  onImageChange,
  onAccessTypeChange,
  onPrev,
  onSubmit,
  imagePreview,
  isSubmitting = false,
}: FormStepTwoProps) {
  return (
    <fieldset className="form-fieldset">
      <button type="button" className="prev-button" onClick={onPrev}>
        <ArrowLeft />
        Anterior
      </button>

      <div className="form-field-container">
        <label className="form-field-base" htmlFor="author">
          Autor
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={onInputChange}
            placeholder="Ej.: James Clear"
            className="form-field-base-input"
            required
          />
        </label>
      </div>

      <fieldset className="form-field-container container-access-types">
        <legend className="access-type-legend">Tipo de acceso</legend>
        <div className="list-access-types">
          <RadioButton
            label="Gratis"
            checked={formData.access === "free"}
            onChange={() => onAccessTypeChange("free")}
          />
          <RadioButton
            label="De pago"
            checked={formData.access === "paid"}
            onChange={() => onAccessTypeChange("paid")}
          />
        </div>
      </fieldset>

      <div className="form-field-container">
        <label className="form-field-base" htmlFor="link">
          Enlace
          <input
            type="url"
            id="link"
            name="link"
            value={formData.link}
            onChange={onInputChange}
            placeholder="https://ejemplo.com/libro"
            className="form-field-base-input"
          />
        </label>
      </div>

      <div className="form-field-container">
        <label className="form-field-base">
          Foto de portada
          <input
            type="file"
            name="cover_image"
            accept="image/*"
            onChange={onImageChange}
            className="input-file hidden"
            id="cover-image-upload"
            required
          />
          <div style={{ marginTop: "1rem", width: "100%", maxHeight: "300px" }}>
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Vista previa de portada"
                style={{
                  width: "200px",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: "0.8rem",
                }}
              />
            ) : (
              <img
                src="/input-file-placeholder.png"
                alt=""
                style={{ width: "200px", height: "auto", objectFit: "contain" }}
              />
            )}
          </div>
        </label>
      </div>

      <div className="form-field-container">
        <button
          type="button"
          className="add-form-submit-button"
          onClick={onSubmit}
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span>Procesando...</span>
            </>
          ) : (
            "Publicar libro"
          )}
        </button>
      </div>
    </fieldset>
  );
}
