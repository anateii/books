import React, { useState, useContext } from "react";
import BooksContext from "../context/books";
import BookEdit from "./BookEdit";

function BookShow({ book }) {
  const [showEdit, setShowEdit] = useState(false);

  const { deleteBookById } = useContext(BooksContext);

  const handleEditClick = () => {
    setShowEdit(!showEdit);
  };

  const handleEditSubmit = () => {
    setShowEdit(false); //handles that on submit button the edit disappears
  };

  let content = <h3>{book.title}</h3>;
  //let allows us to change this variable over time
  if (showEdit) {
    content = <BookEdit book={book} handleEditSubmit={handleEditSubmit} />;
  }

  return (
    <div className="book-show">
      <img alt="books" src={`https://picsum.photos/seed/${book.id}/300/200`} />
      <div>{content}</div>
      <div className="actions">
        <button className="edit" onClick={handleEditClick}>
          Edit
        </button>
        <button className="delete" onClick={() => deleteBookById(book.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default BookShow;
