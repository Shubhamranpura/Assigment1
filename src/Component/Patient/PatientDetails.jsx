import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import filterPatientData from '../../mydata/Patient'
import { FaAngleRight } from 'react-icons/fa'

function PatientDetails() {
  const navigate = useNavigate()
  const location = useLocation()
  const peramsData = new URLSearchParams(location.search)
  let patientIndex = peramsData.get('id');

  patientIndex = +patientIndex

  const filteredDetailData = filterPatientData.filter((item)=>(item.id == patientIndex) )
  const patient = filteredDetailData[0]


  return (
    <div className='p-8'>

      <div className='flex items-center gap-4 w-[30%] p-3 my-2 rounded-lg'>
        <button
          onClick={() => navigate('/patient')}
          className='text-2xl hover:underline'
        >
          Patient
        </button>
          <FaAngleRight size={18} />
        <h1 className='text-2xl'>Patients Details</h1>
      </div>

      {patient ? (
        <div className='bg-white p-6 rounded-lg shadow-lg'>
          <h1 className='text-2xl font-bold mb-4'>Patient Details</h1>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <p className='font-semibold'>Name:</p>
              <p>{patient.Name}</p>
            </div>
            <div>
              <p className='font-semibold'>Email:</p>
              <p>{patient.Email}</p>
            </div>
            <div>
              <p className='font-semibold'>Gender:</p>
              <p>{patient.PatientGender}</p>
            </div>
            <div>
              <p className='font-semibold'>Referral Program:</p>
              <p>{patient.RefferralProgram}</p>
            </div>
            <div>
              <p className='font-semibold'>Date of Birth:</p>
              <p>{patient.Dob}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className='text-red-500'>Patient not found</div>
      )}
    </div>
  )

}
export default PatientDetails
