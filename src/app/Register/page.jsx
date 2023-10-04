"use client";

import React, { useState, useRef } from "react";
import PhoneNumberInput from "../../components/PhoneNumber";
import RecaptchaValidation from "../../components/RecaptchaValidation";
import CountrySelect from "../../components/Country";
import InputField from "../../components/InputField";
import DateOfBirthPicker from "../../components/DateOfBirthPicker";
import { calculateAge } from "./calculateAge";
import GenderSelector from "../../components/GenderSelector";

export default function Page() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    userName: "",
    phoneNumber: "",
    nationality: "",
     age: 0,
    genre: "",
  });

  const [isRecaptchaValid, setIsRecaptchaValid] = useState(false);
  const inputFields = [
    { name: "name", placeholder: "Nombre", type: "text" },
    { name: "email", placeholder: "Correo electrónico", type: "email" },
    { name: "password", placeholder: "Contraseña", type: "password" },
    { name: "userName", placeholder: "Nombre de usuario", type: "text" },
  ];
 
  const handleRecaptchaSuccess = (token) => {
    
    setIsRecaptchaValid(true);
   
  };
  const handleDateOfBirthChange = (date) => {
    setUser({ ...user,   age: date ? calculateAge(date) : 0 });
  };
  const handleCountryChange = (selectedCountry) => {
    setUser({ ...user, nationality: selectedCountry });
  };
  const handleGenderChange = (event) => {
    const selectedGender = event.target.value;
    setUser({ ...user, genre: selectedGender }); // Usa genre en lugar de gender
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isRecaptchaValid) {
      console.error("Por favor, completa el reCAPTCHA.");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/v1/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        router.push('/login'); // Redirige al usuario al inicio de sesión después del registro
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(`Error al registrar: ${error.message}`);
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#120907]">
      <div className="bg-[#241f35] p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Regístrate</h1>
        <form onSubmit={handleSubmit} className="bg-[#241f35]">
          {inputFields.map((field) => (
            <InputField
              key={field.name}
              name={field.name}
              placeholder={field.placeholder}
              value={user[field.name]}
              onChange={handleChange}
              type={field.type}
            />
          ))}
<div className="mb-4">
          <DateOfBirthPicker handleDateChange={handleDateOfBirthChange} />
          </div>
          <div className="mb-4">
          <PhoneNumberInput
  value={user.phoneNumber}
 onChange={(phoneNumber) => handleChange({ target: { name: 'phoneNumber', value: phoneNumber } })}
/>
</div>

          <div className="mb-4">
            <label htmlFor="genre" className="block text-gray-700">
              Género:
            </label>
            <GenderSelector
              selectedGender={user.genre}
              handleGenderChange={handleGenderChange}
            />
          </div>
          <div className="mb-4">
          <CountrySelect
            value={user.nationality} 
            onChange={(selectedOption) =>
              handleCountryChange(selectedOption.value)
            } 
          />
          </div>
          <div className="mb-4">

         <RecaptchaValidation
       sitekey="6LfS4WkoAAAAAGsW9Iji8azVQPousI0yR5uQBHXw"
         onValidationSuccess={handleRecaptchaSuccess}
/>
</div>

          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
          >
            Registrarme
          </button>
        </form>
      </div>
    </div>
  );
}
