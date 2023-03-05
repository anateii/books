import React, { useState } from "react";

function BookCreate({ onClickButton }) {
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
    //console.log(e.target);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onClickButton(title);
    setTitle(""); //re-renders the component by forcing the input to show a value of empty string
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input value={title} onChange={handleChange} />
        <button>Create!</button>
      </form>
    </>
  );
}

export default BookCreate;
