import { createContext, useState } from "react";
import axios from "axios";

const BooksContext = createContext();

function Provider({ children }) {
  const [books, setBooks] = useState([]);

  const url = "http://localhost:3001/books";

  const fetchBooks = async () => {
    const response = await axios.get(url);
    setBooks(response.data);
  };

  const addBook = async (title) => {
    //see theory.js for the other way

    const response = await axios.post(url, {
      title: title,
    });

    const updatedBooks = [...books, response.data];
    setBooks(updatedBooks);
  };

  const deleteBookById = async (id) => {
    await axios.delete(`http://localhost:3001/books/${id}`);

    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });

    setBooks(updatedBooks);
  };

  const editBookById = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title: newTitle,
    });

    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...books, ...response.data };
        //...response.data means take all the different properties out of that project
        //take all the different key value pairs and add them into the ...books object
        //because imagine two users are trying to update the same record at the same time,
        //we want to give back the updated books to both of them
      }

      return book;
    });

    setBooks(updatedBooks);
  };

  const valueToShare = {
    books: books,
    deleteBookById: deleteBookById,
    editBookById: editBookById,
    addBook: addBook,
    fetchBooks: fetchBooks,
  };

  return (
    <BooksContext.Provider value={valueToShare}>
      {children}
    </BooksContext.Provider>
  );
}

export { Provider };
export default BooksContext;
