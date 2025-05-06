import React, { useState } from 'react'
import patientData from '../../mydata/Patient'
import MultiSelect from './Multipleselect'
import PatientTable from './PatientTable'

function Patient() {


  const [refferalprogram, setrefferalprogram] = useState()
  const [gender, setgender] = useState()
  const handlereffProgChanged = (e) => {
    setrefferalprogram(e.target.value)
  }
  const handleSelectionChange = (selected) => {
    const value = selected.map(item => item.value.toLowerCase())
    setgender(value)
  }

  // console.log(patientData)
  // console.log(refferalprogram)
  // console.log(gender)

  return (
    <div>
      <h1 className='text-3xl text-green-500 pb-2'>
        Patients
      </h1>
      <section>
        <div className='mt-2 flex gap-10'>
          <select name="referral_program" id="referral_program"
            className='bg-blue-300 w-[30%] pl-3 h-[40px] text-2xl font-semibold ml-2'
            value={refferalprogram}
            onChange={handlereffProgChanged}>
            <option value="" >All Refferal Program</option>

            <option value="UCLA Health" className='bg-white' >UCLA Health</option>
            <option value="DTC_Proactive" className='bg-white' >DTC_Proactive</option>
            <option value="outreach" className='bg-white'>outreach</option>
            <option value="BioMarin" className='bg-white'>BioMarin</option>
          </select>
          <MultiSelect onChangeSelection={handleSelectionChange} />
        </div>
        <PatientTable patientData={patientData} refferalprogram={refferalprogram} selgender={gender} />
      </section>
    </div>

  )
}

export default Patient
