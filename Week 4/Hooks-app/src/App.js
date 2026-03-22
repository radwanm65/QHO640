import react, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
} from "react";

import RepetitiveComponent from "./RepetitiveComponent";
import CustomHookComponent from "./CustomHook";

function App() {
  // React Hook "useState" is called conditionally. React Hooks must be called in the exact same order in every component render
  // The can't be nested in anything (loops, functions ..etc)
  /*
  if (true) {
    useState();
  }
    */
  /* useStates are caled in the same order they are placed within the app
  useState();
  useState();

*/
  // UseEffect: to perform side effects on our App

  const [count, setCount] = useState(0);

  // UseEffecr

  useEffect(() => {
    //code to be run as a side effect
    console.log("The count is: ", count);
    // Optional Return Function
    return () => {
      console.log("I am being cleaned up");
    };
  }, [count]); // The Dependency Array

  //[state, function to update the state]=useState("Initial Value");
  function decrementCount() {
    // setCount(count - 1);
    // setCount(count - 1);
    // Using function state (prevCount) instead of count to update the state
    setCount((prevCount) => prevCount - 1);
    // setCount((prevCount) => prevCount - 1);
  }
  function incrementCount() {
    setCount(count + 1);
  }
  return (
    <>
      <button onClick={decrementCount}>-</button>
      <span>{count}</span>
      <button onClick={incrementCount}>+</button>

      <RepetitiveComponent />
      <p></p>
      <CustomHookComponent />
    </>
  );
}

export default App;
