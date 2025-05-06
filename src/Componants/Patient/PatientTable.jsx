import React, { useEffect, useState } from 'react'
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa'
import { FaSearch } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function PatientTable({ patientData, refferalprogram, selgender }) {
  const itemperpage = 5
  const [filterpatientdata, setfilterpatientdata] = useState([])
  const [searchItem, setsearchItem] = useState()
  const [page, setpage] = useState(1)
  console.log(selgender)

  const navigate = useNavigate()
  const location = useLocation()
  
  // const ispatientdetailtab = location.pathname === `/patient/patients-details?id=${index}` 
  // console.log(ispa)

  const handlesearchItem = (e) => {
    setsearchItem(e.target.value)
  }

  useEffect(() => {
    const filterPatient = (refferalprogram, patientData, selgender, searchItem) => {
      let finalpatientdata = patientData;

      if (refferalprogram) {
        finalpatientdata = finalpatientdata.filter(
          (patient) => patient.RefferralProgram.trim() === refferalprogram.trim()
        );
      }

     

      if (selgender && selgender.length > 0) {
        finalpatientdata = finalpatientdata.filter(
          (patient) => selgender.includes(patient.PatientGender)
        );
      }

      if (searchItem) {
        finalpatientdata = finalpatientdata.filter(encounter =>
          encounter.Name.toLowerCase().includes(searchItem.toLowerCase())
        );
      }

      setfilterpatientdata(finalpatientdata);
      setpage(1)
    };

    filterPatient(refferalprogram, patientData, selgender, searchItem);
  }, [refferalprogram, patientData, selgender, searchItem]);

  const totalPages = Math.ceil(filterpatientdata.length / itemperpage);
  const startindex = (page - 1) * itemperpage
  const endindex = startindex + itemperpage
  const pagedata = filterpatientdata.slice(startindex, endindex)

  



  return (
    <div className="h-[70vh] overflow-y-auto px-4 mt-5 ">
      <div className='m-5 flex relative border-2 pl-2 rounded-lg border-[#a7d23c] w-[40%]'>
        <input
          type="text"
          name="search_by_name"
          placeholder='Search by Patient name'
          value={searchItem}
          onChange={handlesearchItem}
          id="searchbyname"
          className='outline-none h-10 w-[90%] text-2xl'
        />
        <button className='absolute right-3 top-3'>
          <FaSearch size={20} />
        </button>
      </div>
      <div>
        <table className="w-full table-auto border-collapse">
          <thead className="bg-[#a7d23c] text-white">
            <tr>
              <th className="text-left p-3 text-[18px]">Email</th>
              <th className="text-left p-3 text-[18px]">Patient Name</th>
              <th className="text-left p-3 text-[18px]">Gender</th>
              <th className='text-left p-3 text-[18px]'>Referral Program</th>
            </tr>
          </thead>
          <tbody>
            {pagedata.slice(0, 8).map((ele, index) => (
              <tr key={index} className="odd:bg-gray-200 even:bg-white ">
                <td className="p-3 text-[20px]">{ele.Email}</td>
                <td className=" text-[20px]">
                  <button onClick={()=>navigate(`/patient/patients-details?id=${index}`)} >
                  {ele.Name}
                  </button>
                  </td>
                <td className="p-3 text-[20px]" >{ele.PatientGender}</td>
                <td className="p-3 text-[20px]">{ele.RefferralProgram}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className=' mt-[100px] flex justify-center items-center gap-2'>
        <button
          onClick={() => setpage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-3 py-1 rounded ${page === 1 ? 'bg-gray-300 opacity-0' : ' text-white '}`}
        >
          <FaCaretLeft color='blue' size={24} />
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setpage(i + 1)}
            className={`w-8 border-2 rounded-lg px-2 ${page === i + 1
              ? 'bg-[#a7d23c] text-white border-[#a7d23c]'
              : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setpage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-3 py-1 rounded ${page === totalPages ? 'bg-gray-300  opacity-0' : ' text-white '}`}
        >
          <FaCaretRight color='blue' size={24} />

        </button>
      </div>

    </div>

  )
}

export default PatientTable
