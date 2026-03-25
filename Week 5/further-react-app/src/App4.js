import React from "react";
import Counter from "./Counter";
export default function App() {
  const [swapped, setSwapped] = React.useState(false);

  function handleClick() {
    setSwapped(!swapped);
  }
  return (
    <div>
      <Counter key={swapped ? "c2" : "c1"} />
      <Counter key={swapped ? "c1" : "c2"} />
      <input type="button" value="Swap" onClick={handleClick} />
    </div>
  );
}
