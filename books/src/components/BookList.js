import React from "react";
import BookShow from "./BookShow.js";

function BookList({ books, onDelete, onEdit }) {
  const renderedBooks = books.map((book) => {
    return (
      <BookShow
        onDelete={onDelete}
        key={books.id}
        book={book}
        onEdit={onEdit}
      />
    );
  });

  return <div className="book-list">{renderedBooks}</div>;
}

export default BookList;
