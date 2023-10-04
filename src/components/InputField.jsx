 import React from 'react';

const InputField = ({placeholder, type, name, value, onChange})=>{
    return (
        <>
    <div className="mb-4">
    <input
    placeholder={placeholder}
      type={type}
      id={name}
      name={name}
      value = {value}
      onChange={onChange}
      className="w-full border rounded px-3 py-2 mt-1"
      required
    />
  </div>
  </>);
};

export default InputField;