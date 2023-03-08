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

    //this is the function that we call to get the books every time
    //we start our application
  };

  //But when should this function be called?
  //DON'T DO THIS: fetchBooks(). In the beginning you can see this line of code works,
  //BUT we are getting a pretty nasty bug down the line.

  // Flow of the data:
  //1. Whenever our app component is first rendered on the screen we are defining a state
  //2. We are defining a function for fetching the books
  //3. We are calling fetchBooks(). When we call fetch books, we get a response back that is
  //   updating the state of our books. In React whenever the state is updated, the component gets re-rendered.
  //   This makes the app start again from step 1.
  //Result? An infinite loop.
  //Solution? useEffect()

  useEffect(() => {
    fetchBooks();
  }, []);

  //useEffect:
  // - Used to run code when a component is initially rendered and (sometimes) when is re-rendered
  // - First argument is a function that executes the code we want to run
  // - Second argument is an array or nothing. This controls whether the function is executed or rerenders

  const addBook = async (title) => {
    // console.log("Add Book with title: ", title);
    // const getRandomId = Math.round(Math.random() * 9999);
    // const updatedBooks = [...books, { id: getRandomId, title: title }];
    // setBooks(updatedBooks);
    //1.Create new array (updated books)
    //2.Copy all the elements from old array (...books)
    //3. Add new book into the array
    //4. Update our books array with setBooks(udpdatedBooks), new state

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

      //if we are mapping over another book, that hasa a different id, not the id
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

//State updated? Rerender the component it is defined in + all that components children
//Find all the components that need to use this state
//Define the state in the lowest common parent
