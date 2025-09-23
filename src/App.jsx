import React, { useState, useEffect } from 'react'
import BookForm from './components/BookForm.jsx'
import BookTable from './components/BookTable.jsx'
import ConfirmModal from './components/ConfirmModal.jsx'
import { Modal, Button, Table } from 'react-bootstrap'

const sampleBooks = [
  { id: 'b1', title: '1984', author: 'George Orwell', year: 1949, genre: 'Dystopian', price: 12.99 },
  { id: 'b2', title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960, genre: 'Fiction', price: 9.5 },
]


const loadBooksFromStorage = () => {
  try {
    const savedBooks = localStorage.getItem('bookLibrary')
    return savedBooks ? JSON.parse(savedBooks) : sampleBooks
  } catch {
    return sampleBooks
  }
}
const saveBooksToStorage = (books) => {
  localStorage.setItem('bookLibrary', JSON.stringify(books))
}

export default function App() {
  const [books, setBooks] = useState(loadBooksFromStorage)
  const [selected, setSelected] = useState([])
  const [currentBook, setCurrentBook] = useState(null)

 
  const [modal, setModal] = useState({ show: false, type: '', target: null })

  
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)

  useEffect(() => {
    saveBooksToStorage(books)
  }, [books])

  const addBook = (book) => setBooks((prev) => [...prev, book])
  const updateBook = (updated) =>
    setBooks((prev) => prev.map((b) => (b.id === updated.id ? updated : b)))
  const deleteBook = (id) => {
    setBooks((prev) => prev.filter((b) => b.id !== id))
    setSelected((prev) => prev.filter((sid) => sid !== id))
  }
  const bulkDelete = () => {
    setBooks((prev) => prev.filter((b) => !selected.includes(b.id)))
    setSelected([])
  }

  const toggleSelect = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )

  
  const startEdit = (book) => setCurrentBook(book)
  const cancelEdit = () => setCurrentBook(null)

  const handleDelete = (id) => setModal({ show: true, type: 'single', target: id })
  const handleBulkDelete = () => setModal({ show: true, type: 'bulk', target: null })
  const handleConfirm = () => {
    if (modal.type === 'single' && modal.target) deleteBook(modal.target)
    if (modal.type === 'bulk') bulkDelete()
    setModal({ show: false, type: '', target: null })
  }
  const handleCancel = () => setModal({ show: false, type: '', target: null })

 
  const addToCart = (book) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === book.id)
      return exists ? prev : [...prev, book]
    })
  }
  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((item) => item.id !== id))
  const clearCart = () => setCart([])

  const totalPrice = cart.reduce((sum, item) => sum + (item.price || 0), 0)

  return (
    <div className="min-vh-100">
     
      <div className="bg-primary text-white py-4 mb-4">
        <div className="container d-flex justify-content-between align-items-center">
          <div>
            <h1 className="fw-bold mb-1">BookVault Pro</h1>
            <p className="mb-0">Professional Library Management System</p>
          </div>
          <Button variant="light" onClick={() => setShowCart(true)}>
            <i className="bi bi-cart me-2"></i>
            Cart ({cart.length})
          </Button>
        </div>
      </div>

      
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
              onAddToCart={addToCart}
            />
          </div>
        </div>
      </div>

     
      <ConfirmModal
        show={modal.show}
        title={modal.type === 'bulk' ? 'Delete Selected Books' : 'Delete Book'}
        body={
          modal.type === 'bulk'
            ? `Are you sure you want to delete ${selected.length} selected books?`
            : 'Are you sure you want to delete this book?'
        }
        confirmText="Delete"
        confirmVariant="danger"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />

    
      <Modal show={showCart} onHide={() => setShowCart(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>🛒 Your Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Price ($)</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.author}</td>
                    <td>${item.price?.toFixed(2) || '0.00'}</td>
                    <td>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="2" className="fw-bold text-end">
                    Total
                  </td>
                  <td colSpan="2" className="fw-bold">
                    ${totalPrice.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </Table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCart(false)}>
            Close
          </Button>
          {cart.length > 0 && (
            <Button variant="danger" onClick={clearCart}>
              Clear Cart
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  )
}
