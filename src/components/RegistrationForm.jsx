import React from "react";
import InputField from "./InputField";
import logo from "../assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import Select from "react-select";
import countryList from "react-select-country-list";
import PhoneInput from "react-phone-input-2";
import DatePicker from "react-datepicker";
import ReCAPTCHA from "react-google-recaptcha";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";
import { calculateAge } from "@/app/register/calculateAge";

const optionsCountry = countryList().getData();
const optionsGenre = [
  { value: "M", label: "Male" },
  { value: "F", label: "Female" },
  { value: "O", label: "Other" },
];
const inputFields = [
  { name: "name", placeholder: "Nombre", type: "text" },
  { name: "lastname", placeholder: "Apellido", type: "text" },
  { name: "email", placeholder: "Correo electrónico", type: "email" },
  { name: "password", placeholder: "Contraseña", type: "password" },
  { name: "username", placeholder: "Nombre de usuario", type: "text" },
];

function RegistrationForm() {
  const [genre, setGenre] = useState(null);
  const [country, setCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [age, setAge] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isRecaptchaValid, setIsRecaptchaValid] = useState(false);

  const handleOnChangeDate = (date) => {
    if (date) {
      setSelectedDate(date);
      const age = calculateAge(date);
      setAge(age);
    } else setEdad(null);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const lastname = event.target.lastname.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const username = event.target.username.value;

    const user = {
      name,
      lastname,
      email,
      password,
      username,
      genre,
      country,
      phoneNumber,
      age,
    };

    console.log(user);

    if (!isRecaptchaValid) console.error("Por favor, completa el reCAPTCHA.");
    else {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/user/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(user),
          },
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
    }
  };

  return (
    <>
      <section className=" flex flex-col justify-center rounded-md border-solid border-[1.5px] p-6 lg:w-[60%] md:w-1/2 sm:w-3/4 min-h-[50%] gap-4 shadow-lg">
        <Image
          src={logo}
          alt="logo"
          width={100}
          height={100}
          className="self-center"
        />

        <h1 className="text-3xl font-bold text-center ">Register</h1>
        <form
          onSubmit={onSubmit}
          className="grid lg:grid-cols-3 sm:grid-cols-2 justify-center gap-3"
        >
          {inputFields.map((field, i) => (
            <InputField
              key={i}
              name={field.name}
              placeholder={field.placeholder}
              type={field.type}
            />
          ))}
          <DatePicker
            selected={selectedDate}
            onChange={handleOnChangeDate}
            placeholderText="Fecha de Nacimiento"
            dateFormat="dd/MM/yyyy"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            dropdownMode="select"
            required
          />
          <PhoneInput
            country={"co"}
            onChange={(e) => {
              setPhoneNumber(e);
            }}
          />
          <Select
            options={optionsGenre}
            onChange={(e) => {
              setGenre(e.value);
            }}
            placeholder="Seleccionar género"
            required
          />
          <Select
            options={optionsCountry}
            onChange={(e) => {
              setCountry(e.value);
            }}
            placeholder="País de nacimiento"
            required
            className="sm:col-span-2 lg:col-span-1"
          />

          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_SITE_KEY}
            onChange={() => {
              setIsRecaptchaValid(true);
            }}
            className="lg:col-span-3 sm:col-span-2 mx-auto"
          />
          <button className="bg-blue-400 text-white rounded-lg p-2 m-1 hover:bg-blue-500 lg:col-start-2 lg:col-span-1 sm:col-span-2">
            Registrarme
          </button>
        </form>
      </section>
      <section className="flex justify-center items-center rounded-md border-solid border-[1.5px] p-3 lg:w-[28%] md:w-1/2 sm:w-3/4 min-h-[6%] shadow-lg">
        <p>Do you have an account alredy?</p>
        <Link className="text-blue-500 font-bold ml-3" href="/login">
          Log In
        </Link>
      </section>
    </>
  );
}

export default RegistrationForm;
