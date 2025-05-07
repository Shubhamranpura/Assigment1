import React, { useState } from 'react'
import patientData from '../../mydata/Patient'
import PatientTable from './PatientTable'
import MultiSelect from '../Common/Multipleselect'

function Patient() {


  const [refferalprogram, setrefferalprogram] = useState()
  const [gender, setgender] = useState()
  const handlereffProgChanged = (selected) => {
    console.log(selected.value)
    setrefferalprogram(selected.value)
  }
  const handleSelectionChange = (selected) => {
    // console.log(selected)
    const value = selected.map(item => item.value)
    // console.log(value)
    setgender(value)
  }

  const referralOption = [
    { value: "", label: "All Referral Program" },    
    { value: "Baebies", label: "Baebies" },    
    { value: "UCLA Health", label: "UCLA Health" },
    { value: "outreach", label: "outreach" },
    { value: "DTC_Proactive", label: "DTC_Proactive" },
    { value: "BioMarin", label: "BioMarin" }
  ]

  const genderOption = [
    { value: "male", label: "male" }, { value: "female", label: "Female" },
    { value: "others", label: "Others" }
  ]

  // console.log(patientData)
  // console.log(refferalprogram)
  // console.log(gender)

  return (
    <div>

      <section>
        <div className='mt-2 flex gap-10'>
          <MultiSelect
            classname=' w-[30%] pl-3 h-[40px] text-2xl font-semibold ml-2'
            onChangeSelection={handlereffProgChanged}
            options={referralOption}
            placeholder={"Select referral Program"}
            ismultiple={false}
          />
          <MultiSelect onChangeSelection={handleSelectionChange}
            options={genderOption} ismultiple={true} 
            placeholder={"Select Gender"}/>
        </div>
        <PatientTable patientData={patientData} refferalprogram={refferalprogram} selectGender={gender} />
      </section>
    </div>

  )
}

export default Patient
