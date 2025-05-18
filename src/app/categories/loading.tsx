export default function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-spinner-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Cargando categorías...</p>
      </div>
      
      <div className="categories-list-section" style={{ opacity: 0.5 }}>
        <div className="categories-list">
          {Array(8).fill(0).map((_, index) => (
            <div key={index} className="category-item-row skeleton-text" style={{ height: '40px' }}></div>
          ))}
        </div>
      </div>
    </div>
  )
} 