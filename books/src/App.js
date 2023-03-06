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
    //2.Coppy all the elements from old array (...books)
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

  return (
    <div className="app">
      <BookList books={books} onDelete={deleteBookById} />
      <BookCreate onClickButton={addBook} />
    </div>
  );
}

export default App;

//State updated? Rerender the component it is defined in + all that components children
//Find all the components that need to use this state
//Define the state in the lowest common parent
