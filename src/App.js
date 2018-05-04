import React from "react";
import { Switch, Route } from "react-router-dom";
import * as BooksAPI from "./utils/BooksAPI";
import "./App.css";
import BooksList from "./components/BooksList";
import SearchBooks from "./components/SearchBooks";
import NotFoundPage from "./components/NotFoundPage";

class BooksApp extends React.Component {
  state = {
    myBooks: []
  };
  componentDidMount() {
    this.fetchMyBooks();
  }
  fetchMyBooks = () => {
    BooksAPI.getAll().then(books => {
      this.setState({ myBooks: books });
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
    const { myBooks } = this.state;
    const { changeBookShelf } = this;
    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <BooksList myBooks={myBooks} changeBookShelf={changeBookShelf} />
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
