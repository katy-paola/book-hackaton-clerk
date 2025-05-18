export default function SavedBooksLoading() {
  return (
    <div className="loading-container">
      <div className="books-skeleton">
        {Array(6).fill(0).map((_, index) => (
          <div key={index} className="book-skeleton"></div>
        ))}
      </div>
    </div>
  )
} 