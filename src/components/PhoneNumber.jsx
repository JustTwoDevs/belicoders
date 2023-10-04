import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhoneNumberInput = ({ value, onChange }) => { // Utiliza un objeto para recibir las props
  const handlePhoneNumberChange = (phoneNumber) => {
    console.log(phoneNumber)
    onChange(phoneNumber);
  };
  return (
    <div>
      <PhoneInput
        country={'co'}
        value={value} // Pasa el valor
        onChange={handlePhoneNumberChange}
      />
    </div>
  );
};

export default PhoneNumberInput;
