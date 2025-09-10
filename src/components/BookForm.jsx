import React, { useEffect, useState } from 'react'

export default function BookForm({ onCreate, onUpdate, currentBook, onCancelEdit }) {
  const isEditing = !!currentBook

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')
  const [genre, setGenre] = useState('')

  
  useEffect(() => {
    if (isEditing) {
      setTitle(currentBook.title)
      setAuthor(currentBook.author)
      setYear(currentBook.year)
      setGenre(currentBook.genre)
    } else {
      
      setTitle('')
      setAuthor('')
      setYear('')
      setGenre('')
    }
  }, [currentBook, isEditing])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !author.trim()) {
      alert('Please fill in title and author.')
      return
    }
    const book = {
      id: isEditing ? currentBook.id : `b_${Date.now()}`,
      title: title.trim(),
      author: author.trim(),
      year: year ? parseInt(year, 10) : undefined,
      genre: genre || '',
    }
    if (isEditing) {
      onUpdate(book)
      onCancelEdit()
    } else {
      onCreate(book)
      
      setTitle('')
      setAuthor('')
      setYear('')
      setGenre('')
    }
  }

  return (
    <div className="card border-0 h-100">
      <div className="card-header bg-transparent border-0 pb-2">
        <div className="d-flex align-items-center">
          <div className={`rounded-4 p-3 me-3 ${isEditing ? 'bg-warning bg-opacity-15' : 'bg-success bg-opacity-15'}`}>
            <i className={`bi ${isEditing ? 'bi-pencil-square text-warning' : 'bi-plus-circle text-success'} fs-4`}></i>
          </div>
          <div>
            <h4 className="card-title mb-1 fw-bold">
              {isEditing ? 'Edit Book Details' : 'Add New Book'}
            </h4>
            <p className="text-muted mb-0 fw-medium">
              {isEditing ? 'Update the book information below' : 'Enter the book details to add to your library'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="card-body pt-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label">
              <i className="bi bi-book me-2"></i>
              Book Title <span className="text-danger">*</span>
            </label>
            <input
              className="form-control form-control-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the book title"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="form-label">
              <i className="bi bi-person me-2"></i>
              Author Name <span className="text-danger">*</span>
            </label>
            <input
              className="form-control form-control-lg"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter the author's name"
              required
            />
          </div>
          
          <div className="row g-3 mb-5">
            <div className="col-sm-6">
              <label className="form-label">
                <i className="bi bi-calendar3 me-2"></i>
                Publication Year
              </label>
              <input
                type="number"
                className="form-control"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="e.g., 2023"
                min="2000"
                max={new Date().getFullYear()}
              />
            </div>
            <div className="col-sm-6">
              <label className="form-label">
                <i className="bi bi-tags me-2"></i>
                Genre Category
              </label>
              <input
                className="form-control"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="e.g., Fiction, Science, Biography"
              />
            </div>
          </div>
          
          <div className="d-grid gap-3 d-md-flex justify-content-md-end">
            {isEditing && (
              <button
                type="button"
                className="btn btn-outline-secondary btn-lg px-4"
                onClick={onCancelEdit}
              >
                <i className="bi bi-x-circle me-2"></i>
                Cancel Changes
              </button>
            )}
            <button
              type="submit"
              className={`btn btn-lg px-4 ${isEditing ? 'btn-warning' : 'btn-success'}`}
            >
              <i className={`bi ${isEditing ? 'bi-check-circle' : 'bi-plus-circle'} me-2`}></i>
              {isEditing ? 'Update Book' : 'Add to Library'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}