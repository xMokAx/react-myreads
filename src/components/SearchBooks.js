import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import * as BooksAPI from "../utils/BooksAPI";
import Book from "./Book";

export default class SearchBooks extends Component {
  static propTypes = {
    myBooks: PropTypes.array.isRequired,
    changeBookShelf: PropTypes.func.isRequired
  };
  state = {
    query: "",
    showingBooks: [],
    error: undefined
  };
  onUpdateQuery = e => {
    const query = e.target.value;
    this.setState({
      query: query,
      error: undefined
    });
    this.searchBooks(query.trim());
  };
  searchBooks = debounce(query => {
    if (!query) {
      this.setState({ showingBooks: [] });
      return;
    }
    BooksAPI.search(query)
      .then(books => {
        if (!books || books.error) {
          this.setState({
            showingBooks: [],
            error: "No books were found, please change your search term"
          });
          return;
        }
        books = books.map(book => {
          const bookOnShelf = this.props.myBooks.find(b => b.id === book.id);
          book.shelf = bookOnShelf ? bookOnShelf.shelf : "none";
          return book;
        });
        this.setState({ showingBooks: books });
      })
      .catch(err => {
        this.setState({
          showingBooks: [],
          error:
            "There was an error searching for books, please check your connection"
        });
      });
  }, 300);
  render() {
    const { query, showingBooks, error } = this.state;
    const { changeBookShelf } = this.props;
    const { onUpdateQuery } = this;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              onChange={onUpdateQuery}
              value={query}
              type="text"
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {showingBooks.length
              ? showingBooks.map(book => (
                  <Book
                    changeBookShelf={changeBookShelf}
                    key={book.id}
                    book={book}
                  />
                ))
              : query && error && <p>{error}</p>}
          </ol>
        </div>
      </div>
    );
  }
}
