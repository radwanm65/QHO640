import React from "react"; // Import React library
import NameContext from "./NameContext"; // Import the NameContext

function Context3() {
  const name = React.useContext(NameContext); // Access the context value using React.useContext

  return (
    // Display a welcome message using the 'name' from the context
    <p>Welcome {name} to the site! from Context3</p>
  );
}

export default Context3; // Export the Context3 component as the default export
