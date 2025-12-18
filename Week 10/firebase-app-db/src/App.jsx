import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthExample from "./components/AuthExample";
import CrudExample from "./components/CrudExample";
import SearchItems from "./components/SearchExample";

function App() {
  return (
    <>
      <div className="container text-center">
        <AuthExample />
        <CrudExample />
        <SearchItems />
      </div>
    </>
  );
}

export default App;
