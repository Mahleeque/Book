
import React, { useState, useEffect } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'

export default function BookForm({ onCreate, onUpdate, currentBook, onCancelEdit }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')
  const [genre, setGenre] = useState('')
  const [price, setPrice] = useState('')
  const [error, setError] = useState('') 

  useEffect(() => {
    if (currentBook) {
      setTitle(currentBook.title)
      setAuthor(currentBook.author)
      setYear(currentBook.year)
      setGenre(currentBook.genre || '')
      setPrice(currentBook.price || '')
    } else {
      setTitle('')
      setAuthor('')
      setYear('')
      setGenre('')
      setPrice('')
    }
    setError('')
  }, [currentBook])

  const handleSubmit = (e) => {
    e.preventDefault()

    
    if (!title.trim()) {
      setError('Title is required.')
      return
    }
    if (!author.trim()) {
      setError('Author is required.')
      return
    }
    if (year && (isNaN(year) || year < 1000 || year > new Date().getFullYear())) {
      setError('Year must be between 1000 and the current year.')
      return
    }
    if (price && price < 0) {
      setError('Price cannot be negative.')
      return
    }

    const bookData = {
      id: currentBook ? currentBook.id : Date.now().toString(),
      title,
      author,
      year: year ? parseInt(year) : 'N/A',
      genre: genre || 'Unspecified',
      price: price ? parseFloat(price) : 0
    }

    if (currentBook) {
      onUpdate(bookData)
    } else {
      onCreate(bookData)
    }

    setTitle('')
    setAuthor('')
    setYear('')
    setGenre('')
    setPrice('')
    setError('')
  }

  return (
    <Card className="shadow-sm">
      <Card.Header>
        <h5 className="mb-0">{currentBook ? 'Edit Book' : 'Add New Book'}</h5>
      </Card.Header>
      <Card.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter book title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter published year"
              value={year}
              min={1000}
              max={new Date().getFullYear()}
              onChange={(e) => setYear(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Genre</Form.Label>
            <Form.Select value={genre} onChange={(e) => setGenre(e.target.value)}>
              <option value="">-- Select Genre --</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Dystopian">Dystopian</option>
              <option value="Biography">Biography</option>
              <option value="Science">Science</option>
              <option value="Fantasy">Fantasy</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price ($)</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              placeholder="Enter book price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button variant="primary" type="submit">
              {currentBook ? 'Update Book' : 'Add Book'}
            </Button>
            {currentBook && (
              <Button variant="secondary" onClick={onCancelEdit}>
                Cancel
              </Button>
            )}
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}
