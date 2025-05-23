"use client";

import { useState } from "react";
import { Tables } from "@/types/database.types";
import ModalEditProfile from "./ModalEditProfile";
import Edit from "@/components/icons/Edit";

type User = Tables<"users">;

export default function EditProfileClient({ user }: { user: User }) {
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <>
      {isFormVisible ? (
        <ModalEditProfile user={user} onClose={() => setIsFormVisible(false)} />
      ) : (
        <button
          onClick={() => setIsFormVisible(true)}
          className="edit-profile-container"
        >
          <div className="profile-user-info">
            <img
              className="profile-avatar"
              src="/avatars/default-avatar.png"
              alt="Foto de Andrés Vizcaíno"
              width={40}
              height={40}
            />
            <h1 className="profile-user-name">Andrés Vizcaíno</h1>
          </div>
          <span className="profile-edit-icon-container">
            <Edit />
          </span>
        </button>
      )}
    </>
  );
}
