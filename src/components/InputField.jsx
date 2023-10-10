import React from "react";

const InputField = (props) => {
  return (
    <input
      placeholder={props.placeholder}
      type={props.type}
      name={props.name}
      className="w-full border rounded px-3 py-2 mt-1"
      autoComplete="off"
      required
    />
  );
};

export default InputField;
