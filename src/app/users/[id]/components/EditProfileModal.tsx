'use client'

import { useState } from 'react'
import { Tables } from '@/types/database.types'
import { updateUserAction } from '../../actions/update-user.action'
import { AVATARS } from './avatars'

type User = Tables<'users'>

interface EditProfileModalProps {
  user: User
  onClose: () => void
}

export default function EditProfileModal({ user, onClose }: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    avatar: user.avatar
  })
  const [selectedAvatarId, setSelectedAvatarId] = useState<string | null>(
    // Try to get the avatar ID from the current avatar path
    AVATARS.find(avatar => avatar.src === user.avatar)?.id || null
  )
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAvatarSelect = (avatarId: string, avatarSrc: string) => {
    setSelectedAvatarId(avatarId)
    setFormData(prev => ({ ...prev, avatar: avatarSrc }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const result = await updateUserAction(user.id, {
        name: formData.name,
        email: formData.email,
        avatar: formData.avatar
      })

      if (!result.success) {
        throw new Error(result.error)
      }

      // Cerrar modal y recargar la página para ver los cambios
      onClose()
      window.location.reload()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar el perfil')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Editar Perfil</h2>
          <button 
            className="close-button" 
            onClick={onClose}
            aria-label="Cerrar"
          >
            &times;
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Seleccionar Avatar</label>
            <div className="avatar-grid">
              {AVATARS.map((avatar) => (
                <div 
                  key={avatar.id} 
                  className={`avatar-option ${selectedAvatarId === avatar.id ? 'selected' : ''}`}
                  onClick={() => handleAvatarSelect(avatar.id, avatar.src)}
                >
                  <img
                    src={avatar.src}
                    alt={avatar.alt}
                    width={60}
                    height={60}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={onClose}
              className="cancel-button"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="save-button"
              disabled={isLoading}
            >
              {isLoading ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 