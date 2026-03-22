import React, { useState } from "react";

export default function RepetitiveComponent() {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  return (
    <div>
      Name:
      <input id="name" onChange={updateName} />
      Course:
      <input id="course" onChange={updateCourse} />
      <br></br>
      Name {name} Course {course}
    </div>
  );
  function updateName() {
    setName(document.getElementById("name").value);
  }
  function updateCourse() {
    setCourse(document.getElementById("course").value);
  }
}
