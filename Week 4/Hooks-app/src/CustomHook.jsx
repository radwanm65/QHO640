import React from "react";
import useFormInput from "./UseFormInput";

export default function CustomHookComponent() {
  const nameHook = useFormInput("No name");
  const courseHook = useFormInput("No course");

  return (
    <div>
      Name:
      <input id="name" onChange={nameHook.handleChange} />
      Course:
      <input id="course" onChange={courseHook.handleChange} />
      <br></br>
      Name {nameHook.value} Course {courseHook.value}
    </div>
  );
}
