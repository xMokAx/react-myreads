import React from "react";
import { Switch, Route } from "react-router-dom";
import * as BooksAPI from "./utils/BooksAPI";
import "./App.css";
import BooksList from "./components/BooksList";
import SearchBooks from "./components/SearchBooks";
import NotFoundPage from "./components/NotFoundPage";

class BooksApp extends React.Component {
  state = {
    myBooks: [],
    error: "You have no books in this shelf",
    fetchingError: undefined
  };
  componentDidMount() {
    this.fetchMyBooks();
  }
  fetchMyBooks = () => {
    BooksAPI.getAll()
      .then(books => {
        if (!books.length) {
          this.setState({
            fetchingError: undefined
          });
          return;
        }
        this.setState({ myBooks: books, fetchingError: undefined });
      })
      .catch(err => {
        this.setState({
          fetchingError:
            "There was an error loading your books, please check your connection"
        });
      });
  };
  changeBookShelf = (book, shelf) => {
    book.shelf = shelf;
    this.setState(prevState => ({
      myBooks: prevState.myBooks.filter(b => b.id !== book.id).concat([book])
    }));
    BooksAPI.update(book, shelf);
  };
  render() {
    const { myBooks, error, fetchingError } = this.state;
    const { changeBookShelf, fetchMyBooks } = this;
    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <BooksList
                fetchingError={fetchingError}
                myBooks={myBooks}
                changeBookShelf={changeBookShelf}
                error={error}
                fetchMyBooks={fetchMyBooks}
              />
            )}
          />
          <Route
            path="/search"
            render={() => (
              <SearchBooks
                myBooks={myBooks}
                changeBookShelf={changeBookShelf}
              />
            )}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
