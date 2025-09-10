import React from 'react'

export default function BookTable({
  books,
  selected,
  onToggleSelect,
  onDelete,
  onEdit,
  onBulkDelete,
}) {
  const hasAnySelected = selected.length > 0

  return (
    <div className="card h-100">
      <div className="card-header pb-2">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h4 className="card-title mb-1 fw-bold">
              <i className="bi bi-collection text-info fs-4 me-2"></i>
              Library Collection
            </h4>
            <p className="text-muted mb-0 fw-medium">
              {books.length === 0 ? 'Your library is empty' : `${books.length} book${books.length !== 1 ? 's' : ''} in your collection`}
            </p>
          </div>
          {hasAnySelected && (
            <div className="d-flex align-items-center gap-3">
              <span className="badge" style={{ background: '#e6e6e6', color: '#222', border: 'none', fontSize: '0.95em', padding: '0.4em 0.7em', borderRadius: '0.4em', display: 'flex', alignItems: 'center', gap: '0.3em' }}>
                <i className="bi bi-check-square me-1"></i>
                {selected.length} selected
              </span>
              <button
                className="btn btn-danger"
                onClick={onBulkDelete}
                title={`Delete ${selected.length} selected book${selected.length !== 1 ? 's' : ''}`}
              >
                <i className="bi bi-trash me-2"></i>
                Delete Selected
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="card-body pt-4">
        {books.length === 0 ? (
          <div className="text-center py-5">
            <h5 className="text-muted mb-3 fw-semibold">Your Library is Empty</h5>
            <p className="text-muted mb-0 fs-6">
              Start building your personal library by adding your first book using the form above.
            </p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th scope="col" style={{ width: '60px' }}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={selected.length === books.length && books.length > 0}
                        onChange={() => {
                          if (selected.length === books.length) {
                            
                            books.forEach(book => {
                              if (selected.includes(book.id)) {
                                onToggleSelect(book.id)
                              }
                            })
                          } else {
                           
                            books.forEach(book => {
                              if (!selected.includes(book.id)) {
                                onToggleSelect(book.id)
                              }
                            })
                          }
                        }}
                        title="Select all books"
                      />
                    </div>
                  </th>
                  <th scope="col">
                    <i className="bi bi-book me-2"></i>Book Title
                  </th>
                  <th scope="col">
                    <i className="bi bi-person me-2"></i>Author
                  </th>
                  <th scope="col" style={{ width: '130px' }}>
                    <i className="bi bi-calendar3 me-2"></i>Year
                  </th>
                  <th scope="col">
                    <i className="bi bi-tags me-2"></i>Genre
                  </th>
                  <th scope="col" style={{ width: '150px' }} className="text-center">
                    <i className="bi bi-gear me-2"></i>Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {books.map((b, index) => (
                  <tr key={b.id}>
                    <td>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={selected.includes(b.id)}
                          onChange={() => onToggleSelect(b.id)}
                          title={`Select "${b.title}"`}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="fw-bold text-dark fs-6">{b.title}</div>
                    </td>
                    <td>
                      <div className="text-muted fw-medium">{b.author}</div>
                    </td>
                    <td>
                      <span className="badge" style={{ background: '#e6e6e6', color: '#222', border: 'none', fontSize: '0.95em', padding: '0.4em 0.7em', borderRadius: '0.4em' }}>
                        {b.year ?? 'N/A'}
                      </span>
                    </td>
                    <td>
                      <span className="badge" style={{ background: '#e6e6e6', color: '#222', border: 'none', fontSize: '0.95em', padding: '0.4em 0.7em', borderRadius: '0.4em' }}>
                        {b.genre || 'Unspecified'}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group" role="group">
                        <button
                          className="btn btn-outline-warning btn-sm"
                          onClick={() => onEdit(b)}
                          title={`Edit "${b.title}"`}
                        >
                          <i className="bi bi-pencil-square me-1"></i>
                          Edit
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => onDelete(b.id)}
                          title={`Delete "${b.title}"`}
                        >
                          <i className="bi bi-trash me-1"></i>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}