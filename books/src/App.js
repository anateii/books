import React from "react";
import { useState } from "react";
import BookCreate from "./components/BookCreate";
import BookList from "./components/BookList";

function App() {
  const [books, setBooks] = useState([]);

  const addBook = (title) => {
    console.log("Add Book with title: ", title);

    const getRandomId = Math.round(Math.random() * 9999);
    const updatedBooks = [...books, { id: getRandomId, title: title }];
    //1.Create new array (updated books)
    //2.Copy all the elements from old array (...books)
    //3. Add new book into the array
    //4. Update our books array with setBooks(udpdatedBooks), new state

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

      //if we are mapping over another book, that hasa a different id, not the id
      //the id that we're looking for, then we are going to return the book and we don't
      //want to mess with the  other book in any way
      return book;
    });

    setBooks(updatedBooks);
  };

  return (
    <div className="app">
      <BookList books={books} onDelete={deleteBookById} onEdit={editBookById} />
      <BookCreate onClickButton={addBook} />
    </div>
  );
}

export default App;

//State updated? Rerender the component it is defined in + all that components children
//Find all the components that need to use this state
//Define the state in the lowest common parent
