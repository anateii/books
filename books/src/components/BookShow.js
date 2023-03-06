import React, { useState } from "react";
import BookEdit from "./BookEdit";

function BookShow({ book, onDelete, onEdit }) {
  const [showEdit, setShowEdit] = useState(false);

  const handleEditClick = () => {
    setShowEdit(!showEdit);
  };

  const handleEditSubmit = (id, newTitle) => {
    onEdit(id, newTitle); //handles the new title of the book
    setShowEdit(false); //handles that on submit button the edit disappears
  };

  let content = <h3>{book.title}</h3>;
  //let allows us to change this variable over time
  if (showEdit) {
    content = <BookEdit book={book} handleEditSubmit={handleEditSubmit} />;
  }

  return (
    <div className="book-show">
      <div>{content}</div>
      <div className="actions">
        <button className="edit" onClick={handleEditClick}>
          Edit
        </button>
        <button className="delete" onClick={() => onDelete(book.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default BookShow;
