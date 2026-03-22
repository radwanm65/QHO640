import React from "react"; // Import React library
import NameContext from "./NameContext"; // Import the NameContext
import Context3 from "./Context3"; // Import the Context3 component

function Context2() {
  const name = React.useContext(NameContext); // Access the context value using React.useContext

  return (
    <>
      {/* Display a greeting message using the 'name' from the context */}
      <h1>Hello {name}! from Context 2</h1>
      {/* Render the Context3 component */}
      <Context3 />
    </>
  );
}

export default Context2; // Export the Context2 component as the default export
