"use client";

import { useState } from "react";
import { Tables } from "@/types/database.types";
import ModalEditProfile from "./ModalEditProfile";
import Edit from "@/components/icons/Edit";

type User = Tables<"users">;

export default function EditProfileClient({ user }: { user: User }) {
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <div className="profile-edit-section">
      {isFormVisible ? (
        <ModalEditProfile user={user} onClose={() => setIsFormVisible(false)} />
      ) : (
        <button
          onClick={() => setIsFormVisible(true)}
          className="edit-profile-button"
        >
          <img
            src="/avatars/hombre-gafas-cabello-ondulado.png"
            alt="Foto de Andrés Vizcaíno"
            width={40}
            height={40}
          />
          <h1>Andrés Vizcaíno</h1>
          <span>
            <Edit />
          </span>
        </button>
      )}
    </div>
  );
}
