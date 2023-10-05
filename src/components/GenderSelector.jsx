import React from 'react';

const GenderSelector = ({ selectedGender, handleGenderChange }) => {
  return (
    <select
      value={selectedGender}
      onChange={handleGenderChange}
      required
    >
    <option value="">Seleccionar género</option>
      <option value="male">Masculino</option>
      <option value="female">Femenino</option>
      <option value="other">Otro</option>
    </select>
  );
};

export default GenderSelector;
