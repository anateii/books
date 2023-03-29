import React from "react";
import BookShow from "./BookShow.js";
import useBooksContext from "../hooks/use-books-context.js";

function BookList() {
  const { books } = useBooksContext();

  const renderedBooks = books.map((book) => {
    return <BookShow key={books.id} book={book} />;
  });

  return <div className="book-list">{renderedBooks}</div>;
}

export default BookList;
