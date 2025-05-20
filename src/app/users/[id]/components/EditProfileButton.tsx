'use client'

import { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Tables } from '@/types/database.types'
import EditProfileModal from './EditProfileModal'

type User = Tables<'users'>

export default function EditProfileButton({ user }: { user: User }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    // Create modal container
    const modalContainer = document.createElement('div')
    modalContainer.id = 'profile-edit-modal'
    document.body.appendChild(modalContainer)

    // Use createRoot to render the modal
    const root = createRoot(modalContainer)
    root.render(
      <EditProfileModal 
        user={user} 
        onClose={() => {
          root.unmount()
          document.body.removeChild(modalContainer)
          setIsModalOpen(false)
        }} 
      />
    )
    
    setIsModalOpen(true)
  }

  return (
    <button 
      onClick={openModal}
      className="edit-profile-button"
      disabled={isModalOpen}
    >
      Editar perfil
    </button>
  )
} 