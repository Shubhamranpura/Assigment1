import React from 'react';
import Select from 'react-select';

const MultiSelect = ({ onChangeSelection, options, isMultiple, className, placeholder, value }) => {
  const handleChange = (selected) => {
    if (onChangeSelection) {
      onChangeSelection(selected);
    }
  };


  return (
    <Select
      className={`w-[40%] text-indigo-400 ${className}`}
      options={options}
      isMulti={isMultiple}
      placeholder={placeholder}
      value={value} 
      onChange={handleChange}
    />
  );
};

export default MultiSelect;
