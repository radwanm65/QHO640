import React from "react";
import NameContext from "./NameContext";
import CourseContext from "./CourseContext";

function Context3Multi() {
  const name = React.useContext(NameContext);
  const course = React.useContext(CourseContext);

  return (
    <p>
      Welcome {name}, studying {course}, to the site! from ContextMulti3
    </p>
  );
}
export default Context3Multi;
