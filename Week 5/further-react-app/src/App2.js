import React from "react";
import Counter from "./Counter";
export default function App() {
  const [show, setShow] = React.useState(false);
  function handleClick() {
    setShow(!show);
  }
  return (
    <div>
      <Counter />
      {show ? <Counter /> : ""}
      <input
        type="button"
        value={show ? "Hide" : "Show"}
        onClick={handleClick}
      />
    </div>
  );
}
