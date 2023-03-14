// ............THIS IS THE THEORY BEHIND THE APP..........................

////State updated? Rerender the component it is defined in + all that components children
//Find all the components that need to use this state
//Define the state in the lowest common parent

//Remember, anytime we show an input element, we're always going to keep track of that
//input value using the state system.
//So we need to declare a new piece of state and use that state to control
//the value of the input.

//We need to use e.preventDefault() to prevent the default behaviour of the browser
//which is to try to handle the submission process itself

// const fetchBooks = async () => {
// const response = await axios.get(url);
// setBooks(response.data); };

//this is the function that we call to get the books every time
//we start our application

//But when should this function be called?
//DON'T DO THIS: fetchBooks(). In the beginning you can see this line of code works,
//BUT we are getting a pretty nasty bug down the line.

//Flow of the data:
//1. Whenever our app component is first rendered on the screen we are defining a state
//2. We are defining a function for fetching the books
//3. We are calling fetchBooks(). When we call fetch books, we get a response back that is
//   updating the state of our books. In React whenever the state is updated, the component gets re-rendered.
//   This makes the app start again from step 1.
//Result? An infinite loop.
//Solution? useEffect()

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//useEffect:
// - Used to run code when a component is initially rendered and (sometimes) when is re-rendered
// - First argument is a function that executes the code we want to run
// - Second argument is an array or nothing. This controls whether the function is executed or rerenders

//---------------------TRICKY THINGS AROUND useEffect()

//1. Understanding when our arrow function gets called

// Flow of data:
// Component called -> JSX returned -> Component updated (Initial Render)
// -----------------------state updated----------------------------------
// Component called -> JSX returned -> Component updated (Second Render)
// -----------------------state updated----------------------------------
// Component called -> JSX returned -> Component updated (Third Render)
// -----------------------state updated----------------------------------

//Whenever we call useEffect the function passed to it as its argument, is
//always going to be called immediately after the first render.
//Then on the next renders, second ,third etc. render, the function MIGHT be called
//depending upon the second argument that we pass in to useEffect.

//Types of second argument:
// 1. [] - empty array. The function gets called only after first render and never again
// 2. No argument at all. We call it immediately after the first render and then after each re-render.
// 3. [prop, piece of state] - some variable defined inside our component.
//     We call it immediately after the first render and after each rerender if that element is changing.

//Go to this link: https://codepen.io/sgrider/pen/BarEowz an rewatch lesson 126

//2.Understanding the arrow's function return value

//3.Understanding sta

//--------------------ADD BOOK
// const addBook = (title) => {

// console.log("Add Book with title: ", title);
// const getRandomId = Math.round(Math.random() * 9999);
// const updatedBooks = [...books, { id: getRandomId, title: title }];
// setBooks(updatedBooks);

//1.Create new array (updated books)
//2.Copy all the elements from old array (...books)
//3. Add new book into the array
//4. Update our books array with setBooks(udpdatedBooks), new state
//  }

//------------------EDIT BOOK
//   const editBookById = (id, newTitle) => {
//     const updatedBooks = books.map((book) => {
//       if (book.id === id) {
//         return { ...books, title: newTitle };
//       }

//if we are mapping over another book, that has a different id, not the id
//the id that we're looking for, then we are going to return the book and we don't
//want to mess with the  other book in any way
//       return book;
//     });

//     setBooks(updatedBooks);
//   };

//------------------CONTEXT

//Context is kind of like an alternative to Props system. Props is all about communication between
//a parent and a immediate child
//With context system we can share data accross many different components, even if they don't have a
//direct link to each other.

//Once we share this data, our different components can then reach out to this context and ask for very
//particular pieces of data.

//Context is NOT a replacement for Props and NOT a replacement for Redux. By itself is a communication channel
//It doesn't really care what data you're sharing or how that data is organized.

//....HOW TO USE CONTEXT?

// 1. Create the context in a file
//     import {createContext} from 'react'
//     const BookContext = createContext()
//     BookContext is the context object, we name it after the data that it's eventually going to store
//This object has 2 properties inside:
// A] Provider: Component used to specify what data we want to share to the rest of our application
// B] Consumer: Component used to get access to data. Not often used.

// 2. Specify the data that will be shared
//      <BookContext.Provider value={5}>
//        <MyComponent />
//      </BookContext.Provider>
//BookContext is the object context we created in Step 1.
//The Provider property is used as a React Component to specify the data that I want to share and it]s
//automatically created for us when we use context
//The value prop is sper special. Whatever you provide to that prop is the information that you're going to share
//with the rest of the application
//MyComponent can now access the value shared in context (5)

// 3. Consume the data in a component
//     import {useContext} from 'react
//     import BookContext from './book'
//
//     function MyComponent() {
//       const num = useContext(BookContext)
//       return <div>{num}</div>
//      }
//useContext is the function for accessing value in context
//BookContext is the context object
//num is the value stored in context --> 5
//However that value, 5, is hard coded, static and unchanged. We need to think of a better way to dynamically change
//add that value to change over time
//But when it changes that means the component re-renders. How to update it?

//We need to wrap BooksContext.Provider with a Custom Provider we create!! That is telling the Provider what data
//to share. Inside the Custom Provider we are going to set up the piece of state and the callback function to change that state
//that we are going to pass down. We don't need to cal it Provider however

//1. In the same context js file, we are going to create a new component called Provider that is going to create our piece
//   of state and it's then creating an object to share with rest of the application
//2. At the bottom of our custom provider we're going to display the context provider, BooksContext and assign the valueToShare

//....WHAT DATA SHOULD WE PASS THROUGH CONTEXT?

//We need to take a look at all of our different states and classify it either as APPLICATION STATE or COMPONENT STATE
//   - Application State: Data that is used by MANY different components
//   - Component State: Data that is used by very FEW components
//These terms are not some magical features of React, they are used by developers to better understand how to best design your
//state that is still the SAME we've been working with...

//When we identified our Application State is often (not always) a good idea to take that state and put it into context so we can
//very easily access that state from anywhere inside of our application
//But we are probably never going to locate our Component State inside of context because there's simply no need to share that pioece
//of data since it's not useful for any other component
