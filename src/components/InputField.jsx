import React from "react";

const InputField = ({ placeholder, type, name, key }) => {
  return (
    <input
      key={key}
      placeholder={placeholder}
      type={type}
      id={name}
      name={name}
      className="w-full border rounded px-3 py-2 mt-1"
      required
    />
  );
};

export default InputField;
