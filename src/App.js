import React from 'react'
import * as BooksAPI from './utils/BooksAPI'
import { Link, Route } from 'react-router-dom'
import './App.css'
import BooksShelf from './components/BooksShelf'
import SearchBooks from './components/SearchBooks'

class BooksApp extends React.Component {
  state = {
    myBooks: []
  }
  componentDidMount() {
    this.fetchMyBooks()
  }
  fetchMyBooks = () => {
    BooksAPI.getAll().then((books) => {
      console.log(books)
      this.setState({ myBooks: books })
    })
  }
  changeBookShelf = (book, shelf) => {
    // BooksAPI.update(book, shelf).then(() => {
    //   this.fetchMyBooks()
    // })
    book.shelf = shelf
    this.setState(prevState => ({
      myBooks: prevState.myBooks.filter(b => b.id !== book.id).concat([book])
    }))
    BooksAPI.update(book, shelf)
  }
  render() {
    const { myBooks } = this.state
    let currentlyReading = myBooks.filter((book) => book.shelf === 'currentlyReading')
    let wantToRead = myBooks.filter((book) => book.shelf === 'wantToRead')
    let read = myBooks.filter((book) => book.shelf === 'read')
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BooksShelf changeBookShelf={this.changeBookShelf} books={currentlyReading} title='Currently Reading' />
                <BooksShelf changeBookShelf={this.changeBookShelf} books={wantToRead} title='Want To Read' />
                <BooksShelf changeBookShelf={this.changeBookShelf} books={read} title='Read' />
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}
        />
        <Route path='/search' render={() => (
          <SearchBooks books={myBooks} changeBookShelf={this.changeBookShelf} />
        )} />
      </div>
    )
  }
}

export default BooksApp
