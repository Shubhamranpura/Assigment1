import React from 'react';
import Select from 'react-select';

const MultiSelect = ({ onChangeSelection, options, isMultiple, classname, placeholder, value }) => {
  const handleChange = (selected) => {
    if (onChangeSelection) {
      console.log(selected)
      onChangeSelection(selected);
    }
  };


  return (
    <Select
      className={`w-[40%] text-green-600 ${classname}`}
      options={options}
      isMulti={isMultiple}
      placeholder={placeholder}
      value={value} 
      onChange={handleChange}
    />
  );
};

export default MultiSelect;
