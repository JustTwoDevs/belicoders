import React from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

const CountrySelect = ({ value, onChange }) => {
  const options = countryList().getData();

  return (
    <Select
      options={options}
      value={options.find((option) => option.value === value)}
      onChange={onChange}
      required
    />
  );
};

export default CountrySelect;
