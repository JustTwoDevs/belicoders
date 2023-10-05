"use client";

import React, { useState, useRef } from "react";
import { calculateAge } from "./calculateAge";
import RegistrationForm from '../../components/RegistrationForm';

export default function Page() {
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    username: "",
    number: "",
    nationality: "",
    age: 0,
    genre: "",
  });

  const [isRecaptchaValid, setIsRecaptchaValid] = useState(false);
 

  const handleRecaptchaSuccess = (token) => {
    setIsRecaptchaValid(true);
  };
  const handleDateOfBirthChange = (date) => {
    setUser({ ...user, age: date ? calculateAge(date) : 0 });
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
    console.log(user);


    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/user/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(user),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        router.push("/login"); // Redirige al usuario al inicio de sesión después del registro
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
     
      
          <RegistrationForm
          user={user}
          handleChange={handleChange}
          handleDateOfBirthChange={handleDateOfBirthChange}
          handleCountryChange={handleCountryChange}
          handleGenderChange={handleGenderChange}
          handleRecaptchaSuccess={handleRecaptchaSuccess}
          handleSubmit={handleSubmit}
          isRecaptchaValid={isRecaptchaValid}
        />

    
      </div>
    </div>
  );
}
