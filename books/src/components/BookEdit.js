import React, { useState, useContext } from "react";
import BooksContext from "../context/books";

function BookEdit({ book, handleEditSubmit }) {
  const [title, setTitle] = useState(book.title);

  const { editBookById } = useContext(BooksContext);

  const onSubmit = (e) => {
    e.preventDefault();
    handleEditSubmit();
    editBookById(book.id, title);

    console.log("New title:", title);
  };

  return (
    <form className="book-edit" onSubmit={onSubmit}>
      <label>Title</label>
      <input
        className="input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="button is-primary">Save</button>
    </form>
  );
}

export default BookEdit;
