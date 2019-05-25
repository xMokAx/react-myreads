import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import BooksShelf from "./BooksShelf";

const BooksList = ({
  myBooks,
  changeBookShelf,
  error,
  fetchingError,
  fetchMyBooks
}) => {
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
        {fetchingError ? (
          <React.Fragment>
            <p className="error fetching-error">{fetchingError}</p>
            <button
              className="try-again-button"
              type="button"
              onClick={fetchMyBooks}
            >
              Try Again
            </button>
          </React.Fragment>
        ) : (
          <React.Fragment>
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
          </React.Fragment>
        )}
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
  error: PropTypes.string,
  fetchingError: PropTypes.string
};

export default BooksList;
