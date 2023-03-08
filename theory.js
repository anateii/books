// THIS IS THE THEORY BEHIND THE APP

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

// Flow of the data:
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

//TRICKY THINGS AROUND useEffect()

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
