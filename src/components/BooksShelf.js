import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const BooksShelf = (props) => {
  const { title, books, changeBookShelf } = props
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        {books.length ? (<ol className="books-grid">
          {books.map((book) => (
            <Book changeBookShelf={changeBookShelf} key={book.id} book={book} />
          ))}
        </ol>) : (<p>You have no books in this shelf.</p>)}
      </div>
    </div>
  )
}

BooksShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  changeBookShelf: PropTypes.func.isRequired
}

export default BooksShelf


