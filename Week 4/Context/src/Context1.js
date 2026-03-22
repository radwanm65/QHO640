import React from 'react';  // Import React library
import Context2 from './Context2';  // Import the Context2 component
import NameContext from './NameContext';  // Import the NameContext

function Context1() {
    const [name, setName] = React.useState("No name");  // Declare a state variable 'name' with initial value as "No name"

    return (
        <div>
            {/* Input field to enter the name */}
            <input id='name' />
            {/* Button to update the state 'name' with the value from the input field */}
            <input type='button' onClick={updateState} value='Go!' />
            {/* Provide the 'name' state as a value to the NameContext.Provider */}
            <NameContext.Provider value={name}>
                <Context2 />
            </NameContext.Provider>
        </div>
    );

    // Function to update the state 'name' with the value from the input field
    function updateState() {
        setName(document.getElementById('name').value);
    }
}

export default Context1;  // Export the Context1 component as the default export
