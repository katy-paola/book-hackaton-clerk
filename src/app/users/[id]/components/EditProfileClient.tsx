"use client";

import { useState } from "react";
import { Tables } from "@/types/database.types";
import EditProfileForm from "./EditProfileForm";
import Edit from "@/components/icons/Edit";

type User = Tables<"users">;

export default function EditProfileClient({ user }: { user: User }) {
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <div className="profile-edit-section">
      {isFormVisible ? (
        <EditProfileForm user={user} onClose={() => setIsFormVisible(false)} />
      ) : (
        <button
          onClick={() => setIsFormVisible(true)}
          className="edit-profile-container"
        >
          <div className="profile-user-info">
            <img
              className="profile-avatar"
              src={user.avatar}
              alt={`Avatar de ${user.name}`}
              width={40}
              height={40}
            />
            <h1 className="profile-user-name">{user.name}</h1>
          </div>
          <span className="profile-edit-icon-container">
            <Edit />
          </span>
        </button>
      )}
    </div>
  );
}
