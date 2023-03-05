import React from "react";
import { useState } from "react";
import BookCreate from "./components/BookCreate";

function App() {
  const [book, setBook] = useState([]);

  const addBook = (title) => {
    console.log("Add Book with title: ", title);
  };

  return (
    <>
      <BookCreate onClickButton={addBook} />
    </>
  );
}

export default App;

//State updated? Rerender the component it is defined in + all that components children
//Find all the components that need to use this state
//Define the state in the lowest common parent
