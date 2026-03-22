import React, { useState } from "react";

export default function useFormInput(defaultValue) {
  const [value, setValue] = useState(defaultValue);
  function handleChange(ev) {
    setValue(ev.target.value);
  }
  return {
    value,
    handleChange,
  };
}
