import React from 'react'
import PropTypes from 'prop-types'

const Book = (props) => {
  const { changeBookShelf, book } = props
  let image = book.imageLinks ? book.imageLinks.thumbnail : 'https://books.google.com/googlebooks/images/no_cover_thumb.gif'
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${image})` }}></div>
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={(e) => changeBookShelf(book, e.target.value)}>
              <option disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors ? book.authors.join(', ') : 'Author unknown!!'}</div>
      </div>
    </li>
  )
}

Book.propTypes = {
  changeBookShelf: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired
}

export default Book
