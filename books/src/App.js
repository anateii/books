import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";

function App() {
  const [books, setBooks] = useState([]);

  const url = "http://localhost:3001/books";

  const fetchBooks = async () => {
    const response = await axios.get(url);
    setBooks(response.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const addBook = async (title) => {
    //see theory.js for the other way

    const response = await axios.post(url, {
      title: title,
    });

    const updatedBooks = [...books, response.data];
    setBooks(updatedBooks);
  };

  const deleteBookById = (id) => {
    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });

    setBooks(updatedBooks);
  };

  const editBookById = (id, newTitle) => {
    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...books, title: newTitle };
      }

      //if we are mapping over another book, that has a different id, not the id
      //the id that we're looking for, then we are going to return the book and we don't
      //want to mess with the  other book in any way
      return book;
    });

    setBooks(updatedBooks);
  };

  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookList books={books} onDelete={deleteBookById} onEdit={editBookById} />
      <BookCreate onClickButton={addBook} />
    </div>
  );
}

export default App;
