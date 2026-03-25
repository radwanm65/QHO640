import React from "react";
import Counter from "./Counter";
export default function App() {
  const [swapped, setSwapped] = React.useState(false);
  function handleClick() {
    setSwapped(!swapped);
  }
  return (
    <div>
      {swapped ? <div>A placeholder div</div> : <Counter />}
      {swapped ? <Counter /> : <div>A placeholder div</div>}
      <input type="button" value="Move Counter" onClick={handleClick} />
    </div>
  );
}
