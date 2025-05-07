import React, { useState } from 'react'
import Select from 'react-select'

// const options = [
//   { value: 'Male', label: 'Male' },
//   { value: 'Female', label: 'Female' },
//   { value: 'Others', label: 'Others' }
// ]

const MultiSelect = ({ onChangeSelection ,options , ismultiple , classname  , placeholder }) => {
  const [selectedOptions, setSelectedOptions] = useState([])
  // console.log(classname) 
  const handleChange = (selected) => {
    // console.log(selected)
    setSelectedOptions(selected)
    if (onChangeSelection) {
      onChangeSelection(selected )
    }
  }

  return (
    <Select
      className={`w-[40%] text-green-600 ${classname}`}
      options={options}
      isMulti = {ismultiple}
      placeholder={placeholder}
      value={selectedOptions}
      onChange={handleChange}
    />
  )
}

export default MultiSelect
