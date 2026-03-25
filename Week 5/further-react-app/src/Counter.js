import React from "react";
export default function Counter() {
  const [count, setCount] = React.useState(0);
  function incCount() {
    setCount(count + 1);
  }
  return (
    <div>
      Count: {count} <br />
      <input type="button" value="+" onClick={incCount} />
    </div>
  );
}
