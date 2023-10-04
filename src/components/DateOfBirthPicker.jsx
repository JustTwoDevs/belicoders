import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { calculateAge } from '../app/Register/calculateAge';

const DateOfBirthPicker = ({ handleDateChange }) => {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [edad, setEdad] = React.useState(null);


  const handleOnChange = (date) => {
    setSelectedDate(date);
    if (date) {
      const age = calculateAge(date);
      setEdad(age);
    } else {
      setEdad(null);
    }
    handleDateChange(date);
  };

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={handleOnChange}
        placeholderText="Fecha de Nacimiento"
        dateFormat="dd/MM/yyyy"
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={100}
        dropdownMode="select"
      />
    
    </div>
  );
};

export default DateOfBirthPicker;
