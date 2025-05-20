'use client'

import { useState } from 'react'
import { Tables } from '@/types/database.types'
import EditProfileForm from './EditProfileForm'

type User = Tables<'users'>

export default function EditProfileClient({ user }: { user: User }) {
  const [isFormVisible, setIsFormVisible] = useState(false)

  return (
    <div className="profile-edit-section">
      {isFormVisible ? (
        <EditProfileForm 
          user={user} 
          onClose={() => setIsFormVisible(false)} 
        />
      ) : (
        <button 
          onClick={() => setIsFormVisible(true)}
          className="edit-profile-button"
        >
          Editar perfil
        </button>
      )}
    </div>
  )
} 