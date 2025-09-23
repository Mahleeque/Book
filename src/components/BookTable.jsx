import React from 'react'
import { Button } from 'react-bootstrap'

export default function BookTable({
  books,
  selected,
  onToggleSelect,
  onDelete,
  onEdit,
  onBulkDelete,
  onAddToCart
}) {
  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">📚 Library</h5>
        {selected.length > 0 && (
          <Button variant="danger" size="sm" onClick={onBulkDelete}>
            Delete Selected ({selected.length})
          </Button>
        )}
      </div>
      <div className="table-responsive">
        <table className="table table-hover table-striped align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th></th>
              <th>Title</th>
              <th>Author</th>
              <th>Year</th>
              <th>Genre</th>
              <th>Price</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-muted">
                  No books in the library yet.
                </td>
              </tr>
            ) : (
              books.map((book) => (
                <tr key={book.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selected.includes(book.id)}
                      onChange={() => onToggleSelect(book.id)}
                    />
                  </td>
                  <td className="fw-semibold">{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.year ?? 'N/A'}</td>
                  <td>{book.genre || 'Unspecified'}</td>
                  <td>${book.price?.toFixed(2) ?? '0.00'}</td>
                  <td className="text-end">
                    <div className="btn-group">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onEdit(book)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onDelete(book.id)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => onAddToCart(book)}
                      >
                        Add
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
