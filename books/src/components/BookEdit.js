import React, { useState } from "react";
import useBooksContext from "../hooks/use-books-context";

function BookEdit({ book, handleEditSubmit }) {
  const [title, setTitle] = useState(book.title);

  const { editBookById } = useBooksContext();

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
