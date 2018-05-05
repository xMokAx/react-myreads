import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import BooksShelf from "./BooksShelf";

const BooksList = ({ myBooks, changeBookShelf, error }) => {
  let currentlyReading = myBooks.filter(
    book => book.shelf === "currentlyReading"
  );
  let wantToRead = myBooks.filter(book => book.shelf === "wantToRead");
  let read = myBooks.filter(book => book.shelf === "read");
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BooksShelf
            changeBookShelf={changeBookShelf}
            books={currentlyReading}
            title="Currently Reading"
            error={error}
          />
          <BooksShelf
            changeBookShelf={changeBookShelf}
            books={wantToRead}
            title="Want To Read"
            error={error}
          />
          <BooksShelf
            changeBookShelf={changeBookShelf}
            books={read}
            title="Read"
            error={error}
          />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

BooksList.propTypes = {
  myBooks: PropTypes.array.isRequired,
  changeBookShelf: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default BooksList;
