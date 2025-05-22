"use client";

import Close from "@/components/icons/Close";

export default function DeleteModal({
  setShowDeleteModal,
}: {
  showDeleteModal: boolean;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="delete-modal-container">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowDeleteModal(false);
        }}
        className="close-button"
        type="button"
      >
        <Close />
        Cerrar
      </button>
      <div className="reset-password-legend-container">
        <p className="reset-password-title">
          ¿Estás seguro que quieres eliminar este libro?
        </p>
        <p className="reset-password-description">
          Puedes volver a publicarlo más adelante.
        </p>
      </div>
      <div className="reset-password-buttons">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowDeleteModal(false);
          }}
          className="reset-password-button reset-password-code-button"
        >
          No, cancelar
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            return;
          }}
          className="reset-password-button reset-password-cancel-button"
          type="button"
        >
          Sí, eliminar
        </button>
      </div>
    </div>
  );
}
