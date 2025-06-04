import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  return (
    <div className='bg-gray-400 flex justify-center items-center text-2xl text-white rounded-lg'>
     <p>Go To Encounter page</p>
     <button
     onClick={()=>navigate("/encounter")}
     > <FaArrowRight/></button>
    </div>
  )
}

export default Home
