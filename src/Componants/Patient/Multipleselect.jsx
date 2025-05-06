import React, { useState } from 'react'
import Select from 'react-select'

const options = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Others', label: 'Others' }
]

const MyComponent = ({ onChangeSelection }) => {
  const [selectedOptions, setSelectedOptions] = useState([])

  const handleChange = (selected) => {
    setSelectedOptions(selected)
    if (onChangeSelection) {
      onChangeSelection(selected)
    }
  }

  return (
    <Select
      options={options}
      isMulti
      placeholder={"Select Gender . . . ."}
      value={selectedOptions}
      onChange={handleChange}
    />
  )
}

export default MyComponent
