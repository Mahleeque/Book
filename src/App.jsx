import React, { useState, useEffect } from 'react'
import BookForm from './components/BookForm.jsx'
import BookTable from './components/BookTable.jsx'
import ConfirmModal from './components/ConfirmModal.jsx'



const loadBooksFromStorage = () => {
  try {
    const savedBooks = localStorage.getItem('bookLibrary')
    if (savedBooks) {
      return JSON.parse(savedBooks)
    }
  } catch (error) {
    console.error('Error loading books from localStorage:', error)
  }
  return sampleBooks
}


const saveBooksToStorage = (books) => {
  try {
    localStorage.setItem('bookLibrary', JSON.stringify(books))
  } catch (error) {
    console.error('Error saving books to localStorage:', error)
  }
}

export default function App() {
  const [books, setBooks] = useState(loadBooksFromStorage)
  const [selected, setSelected] = useState([]) 

  
  const [currentBook, setCurrentBook] = useState(null)

 
  const [modal, setModal] = useState({ show: false, type: '', target: null })


  useEffect(() => {
    saveBooksToStorage(books)
  }, [books])

  
  const addBook = (book) => {
    setBooks((prev) => [...prev, book])
  }


  const updateBook = (updated) => {
    setBooks((prev) => prev.map((b) => (b.id === updated.id ? updated : b)))
  }

  const deleteBook = (id) => {
    setBooks((prev) => prev.filter((b) => b.id !== id))
   
    setSelected((prev) => prev.filter((sid) => sid !== id))
  }


  const bulkDelete = () => {
    if (selected.length === 0) return
    setBooks((prev) => prev.filter((b) => !selected.includes(b.id)))
    setSelected([])
  }


  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

 
  const startEdit = (book) => {
    setCurrentBook(book)
  }

 
  const cancelEdit = () => setCurrentBook(null)

  const handleDelete = (id) => {
    setModal({ show: true, type: 'single', target: id })
  }

  
  const handleBulkDelete = () => {
    setModal({ show: true, type: 'bulk', target: null })
  }

 
  const handleConfirm = () => {
    if (modal.type === 'single' && modal.target) {
      deleteBook(modal.target)
    } else if (modal.type === 'bulk') {
      bulkDelete()
    }
    setModal({ show: false, type: '', target: null })
  }

  
  const handleCancel = () => {
    setModal({ show: false, type: '', target: null })
  }

  
  return (
    <div className="min-vh-100">
      
      <div className="bg-primary text-white py-5 mb-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col">
              <div className="d-flex align-items-center mb-3">
                <div className="me-4">
                  
                </div>
                <div>
                  <h1 className="mb-1 fw-bold display-5">
                    BookVault Pro
                  </h1>
                  <p className="mb-0 fs-5 opacity-90">Professional Library Management System</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container pb-5">
        <div className="row g-4">
          <div className="col-lg-5">
            <BookForm
              onCreate={addBook}
              onUpdate={updateBook}
              currentBook={currentBook}
              onCancelEdit={cancelEdit}
            />
          </div>

          <div className="col-lg-7">
            <BookTable
              books={books}
              selected={selected}
              onToggleSelect={toggleSelect}
              onDelete={handleDelete}
              onEdit={startEdit}
              onBulkDelete={handleBulkDelete}
            />
          </div>
        </div>
      </div>

      <ConfirmModal
        show={modal.show}
        title={modal.type === 'bulk' ? 'Delete Selected Books' : 'Delete Book'}
        body={modal.type === 'bulk' ? `Are you sure you want to delete ${selected.length} selected books?` : 'Are you sure you want to delete this book?'}
        confirmText="Delete"
        confirmVariant="danger"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  )
}