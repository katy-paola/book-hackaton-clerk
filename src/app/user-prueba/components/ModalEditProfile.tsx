"use client";

import { useState } from "react";
import Close from "@/components/icons/Close";
import { Tables } from "@/types/database.types";
import { updateUserAction } from "@/app/users/actions/update-user.action";
import { AVATARS } from "../consts/avatars";

type User = Tables<"users">;

interface ModalEditProfileProps {
  user: User;
  onClose: () => void;
}

export default function ModalEditProfile({
  user,
  onClose,
}: ModalEditProfileProps) {
  const [formData, setFormData] = useState({
    name: user.name,
    avatar: user.avatar,
  });
  const [selectedAvatarId, setSelectedAvatarId] = useState<string | null>(
    AVATARS.find((avatar) => avatar.src === user.avatar)?.id || null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarSelect = (avatarId: string, avatarSrc: string) => {
    setSelectedAvatarId(avatarId);
    setFormData((prev) => ({ ...prev, avatar: avatarSrc }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await updateUserAction(user.id, {
        name: formData.name,
        avatar: formData.avatar,
      });

      if (!result.success) {
        throw new Error(result.error);
      }

      onClose();
      window.location.reload();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al actualizar el perfil"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="modal-edit-profile">
      <button className="close-button" type="button" onClick={onClose}>
        <Close />
        Cerrar
      </button>

      <fieldset>
        <legend className="modal-edit-profile-title">Editar perfil</legend>

        {error && <div className="error-message">{error}</div>}

        <fieldset className="field-form">
          <legend className="modal-edit-profile-legend">Cambiar avatar</legend>
          <div className="avatar-picker">
            {AVATARS.map((avatar) => (
              <label className="avatar-label" key={avatar.id}>
                <input
                  className="avatar-input"
                  type="radio"
                  name="avatar"
                  checked={selectedAvatarId === avatar.id}
                  onChange={() => handleAvatarSelect(avatar.id, avatar.src)}
                />
                <img
                  className="avatar-option"
                  src={avatar.src}
                  alt={avatar.alt}
                  width={60}
                  height={60}
                />
              </label>
            ))}
          </div>
        </fieldset>

        <label className="field-form" htmlFor="name">
          Cambiar nombre
          <input
            className="field-form-input"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <button
          className="edit-profile-submit-button"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Guardando..." : "Guardar cambios"}
        </button>
      </fieldset>
    </form>
  );
}
