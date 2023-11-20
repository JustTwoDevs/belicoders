import InputField from "./InputField";
import LogoColor from "@/assets/LogoColor.png";
import Image from "next/image";
import Link from "next/link";
import Select from "react-select";
import countryList from "react-select-country-list";
import PhoneInput from "react-phone-input-2";
import DatePicker from "react-datepicker";
import ReCAPTCHA from "react-google-recaptcha";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-input-2/lib/style.css";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const [birthDate, setSelectedDate] = useState(null);
  const isRecaptchaValid = useRef(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    const user = Object.fromEntries(new window.FormData(e.target));
    user.birthdate = birthDate;

    console.log(user);

    if (!isRecaptchaValid) console.error("Por favor, completa el reCAPTCHA.");
    else {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/register`,
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
    }
  };

  return (
    <>
      <section className=" flex flex-col justify-center rounded-md border-solid border-[1.5px] p-6 lg:w-[60%] md:w-1/2 sm:w-3/4 min-h-[50%] gap-4 shadow-lg">
        <Image
          src={LogoColor}
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
            <input
              key={i}
              placeholder={field.placeholder}
              type={field.type}
              name={field.name}
              className="w-full border rounded px-3 py-2 mt-1"
              autoComplete="off"
              required
            />
          ))}
          <DatePicker
            selected={birthDate}
            onChange={(date) => setSelectedDate(date)}
            placeholderText="Fecha de Nacimiento"
            dateFormat="dd/MM/yyyy"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            dropdownMode="select"
            name="birthdate"
            required
          />
          <PhoneInput
            country={"co"}
            inputProps={{
              name: "number",
              required: true,
            }}
          />
          <Select
            options={optionsGenre}
            name="genre"
            placeholder="Seleccionar género"
            required
          />
          <Select
            options={optionsCountry}
            name="nationality"
            placeholder="País de nacimiento"
            required
            className="sm:col-span-2 lg:col-span-1"
          />

          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_SITE_KEY}
            onChange={() => {
              isRecaptchaValid.current = true;
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
