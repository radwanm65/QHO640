import { useState } from "react";
import AuthExample from "./components/AuthExample";
import CrudExample from "./components/CrudExample";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <div className="container text-center">
        <CrudExample />
      </div>
    </>
  );
}

export default App;
