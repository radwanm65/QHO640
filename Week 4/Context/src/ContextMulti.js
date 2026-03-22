import React from 'react';
//import Context2 from './Context2';
import Context3Multi from './Context3Multi';
import NameContext from './NameContext';
import CourseContext from './CourseContext';

function ContextMulti() {

    const [name, setName] = React.useState("No Name");
    const [course, setCourse] = React.useState("No Course");

    return (
        <div>
        Name:<br />
        <input id='name'/><br />
        Course: <br />
        <input id='course'/><br />
        <input type='button' onClick={updateState} value='Go!' />
        <NameContext.Provider value={name}>
        <CourseContext.Provider value={course}>
        <Context3Multi />
        </CourseContext.Provider>
        </NameContext.Provider>
        </div>
    );

    function updateState() {
        setName(document.getElementById('name').value);
        setCourse(document.getElementById('course').value);
    }
}

export default ContextMulti;