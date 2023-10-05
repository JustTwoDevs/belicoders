import React from 'react';
import InputField from './InputField';
import DateOfBirthPicker from './DateOfBirthPicker';
import PhoneNumberInput from './PhoneNumber';
import GenderSelector from './GenderSelector';
import CountrySelect from './Country';
import RecaptchaValidation from './RecaptchaValidation';


function RegistrationForm({
  user,
  handleChange,
  handleDateOfBirthChange,
  handleCountryChange,
  handleGenderChange,
  handleRecaptchaSuccess,
  handleSubmit,
  isRecaptchaValid,
}) {
  const inputFields = [
    { name: 'name', placeholder: 'Nombre', type: 'text' },
    { name: 'lastname', placeholder: 'Apellido', type: 'text' },
    { name: 'email', placeholder: 'Correo electrónico', type: 'email' },
    { name: 'password', placeholder: 'Contraseña', type: 'password' },
    { name: 'username', placeholder: 'Nombre de usuario', type: 'text' },
  ];

  return (
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
          inputProps={{
            name: 'number',
            required: true,
          }}
          value={user.phoneNumber}
          onChange={(phoneNumber) =>
            handleChange({
              target: { name: 'number', value: phoneNumber },
            })
          }
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
        <RecaptchaValidation onValidationSuccess={handleRecaptchaSuccess} />
      </div>
      <button
        type="submit"
        className="bg-[8b84c8] text-white rounded px-4 py-2 hover:bg-[#c7b9ed]"
      >
        Registrarme
      </button>
    </form>
  );
}

export default RegistrationForm;
