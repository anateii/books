import React, { useState } from "react";

function BookEdit({ book, onEdit }) {
  const [title, setTitle] = useState(book.title);

  const onSubmit = (e) => {
    e.preventDefault();
    onEdit(book.id, title);

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

//Remember, anytime we show an input element, we're always going to keep track of that
//input value using the state system
//So we need to declare a new piece of state and use that state to control
//the value of the input

//we need to use e.preventDefault() to prevent the default behaviour of the browser
//which is to try to handle the submission process itself
