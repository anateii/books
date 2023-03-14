import React, { useState, useContext } from "react";
import BooksContext from "../context/books";

function BookCreate() {
  const [title, setTitle] = useState("");
  const { addBook } = useContext(BooksContext);

  const handleChange = (e) => {
    setTitle(e.target.value);
    //console.log(e.target);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addBook(title);
    setTitle(""); //re-renders the component by forcing the input to show a value of empty string
  };

  return (
    <div className="book-create">
      <h3>Add a book</h3>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input className="input" value={title} onChange={handleChange} />
        <button className="button">Create!</button>
      </form>
    </div>
  );
}

export default BookCreate;
