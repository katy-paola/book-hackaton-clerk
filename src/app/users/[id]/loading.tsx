export default function UserProfileLoading() {
  return (
    <div className="loading-container">
      <div className="user-profile">
        <div className="user-header">
          <div className="loading-spinner" style={{ width: "80px", height: "80px" }}></div>
          <div>
            <div className="skeleton-text" style={{ width: "150px", height: "28px" }}></div>
          </div>
        </div>
      </div>
      
      <h3 className="section-title">Libros publicados</h3>
      
      <div className="loading-spinner-container">
        <div className="loading-spinner"></div>
      </div>
      <p className="loading-text">Cargando libros del usuario...</p>
    </div>
  )
} 