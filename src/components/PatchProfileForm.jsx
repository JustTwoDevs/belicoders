
import Link from "next/link";
import Select from "react-select";
import countryList from "react-select-country-list";
import PhoneInput from "react-phone-input-2";
import DatePicker from "react-datepicker";
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


function PatchProfileForm({profileData}) {
    const [profile, setProfile] = useState(profileData);

  const router = useRouter();
  const inputFields = [
    { name: "name", placeholder: "Name", type: "text" ,value: profileData.name},
    { name: "lastname", placeholder: "Lastname", type: "text", value: profileData.lastname },
    { name: "email", placeholder: "Email", type: "email", value: profileData.email },
    { name: "username", placeholder: "Username", type: "text" , value: profileData.username},
  ];

  const [birthDate, setSelectedDate] = useState(new Date(profileData.birthDate));


  const onSubmit = async (e) => {
    e.preventDefault();

   
 //   user.birthDate = birthDate;
 setProfile({
    email: e.target.email.value,
    lastname: e.target.lastname.value,
    name: e.target.name.value,
    username: e.target.username.value,
  });
 

 console.log(profile)
    
  
      try {
       
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/myProfile`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(profile),
          }
        );

        const data = await response.json();
        if (response.ok) {
          console.log(data);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error(`Error patching : ${error.message}`);
      }
  };

  return (
    <>

        <h1 className="text-3xl font-bold text-center ">Edit your profile</h1>
        <form
          onSubmit={onSubmit}
        >
          {inputFields.map((field, i) => (
            <input
              key={i}
              placeholder={field.placeholder}
              type={field.type}
              name={field.name}
              className="w-full border rounded px-3 py-2 mt-1"
              autoComplete="on"
                defaultValue={field.value}
               
         
            />
          ))}
          <DatePicker
            selected={birthDate}
            onChange={(date) => {
                setSelectedDate(date);
                setProfile({ ...profile, birthDate: date });
              }}            
            placeholderText="Fecha de Nacimiento"
            dateFormat="dd/MM/yyyy"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            dropdownMode="select"
            name="birthdate"
            className="w-full border rounded px-3 py-2 mt-1"
          />
          <PhoneInput
            country={"co"}
            value={profile.number||""}
            onChange={(number) => {
              setProfile({ ...profile, number: number });
            }}
            inputProps={{
              name: "number",
            }}
          />
          <Select
         onChange={(selectedOption) => {
                setProfile({ ...profile, genre: selectedOption.value });
              }
         }
            options={optionsGenre}
            name="genre"
            placeholder="Select genre"
            value={optionsGenre.find(option => option.value === profile.genre) || null}
          />
          <Select
            options={optionsCountry}
            name="nationality"
            placeholder="Nationality"
            className="sm:col-span-2 lg:col-span-1"
            value={optionsCountry.find(option => option.value === profile.nationality) || null}
            onChange={(selectedOption) => {
                setProfile({ ...profile, nationality: selectedOption.value });
              }}
          />
           <button
  type="submit"
  className="text-white mx-40 my-4 py-2 px-4 rounded bg-blue-700 hover:bg-blue-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
>
  Save Changes
</button>
        </form>
        
      
    </>
  );
}

export default PatchProfileForm;
