import React from "react";
import { useState } from "react";

function App() {
  const [books, setBooks] = useState([]);

  return <div>App</div>;
}

export default App;

//State updated? Rerender the component it is defined in + all that components children
//Find all the components that need to use this state
//Define the state in the lowest common parent
