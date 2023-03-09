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

  const deleteBookById = async (id) => {
    await axios.delete(`http://localhost:3001/books/${id}`);

    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });

    setBooks(updatedBooks);
  };

  const editBookById = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title: newTitle,
    });

    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...books, ...response.data };
        //...response.data means take all the different properties out of that project
        //take all the different key value pairs and add them into the ...books object
        //because imagine two users are trying to update the same record at the same time,
        //we want to give back the updated books to both of them
      }

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
