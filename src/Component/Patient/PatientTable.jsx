import React, { useEffect, useState } from 'react'
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa'
import { FaSearch } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import CommonTable from '../Common/CommonTable'
import { IoRefresh } from 'react-icons/io5'

function PatientTable({ patientData, referralProgram, selectGender , setReferralProgram , setSelectedReferralOption , setSelectedGender , setGender  }) {
  const itemPerPage = 5
  const [filterPatientData, setfilterPatientData] = useState([])
  const [searchItem, setsearchItem] = useState()
  const [page, setPage] = useState(1)
  


  const navigate = useNavigate()
  const location = useLocation()
  
  

  const handlesearchItem = (e) => {
    setsearchItem(e.target.value)
  }


  useEffect(() => {
    const filterPatient = (referralProgram, patientData, selectGender, searchItem) => {
      let finalpatientdata = patientData;

      if (referralProgram) {
        finalpatientdata = finalpatientdata.filter(
          (patient) => patient.RefferralProgram.trim() === referralProgram.trim()
        );
      }

      if (selectGender && selectGender.length > 0) {
        finalpatientdata = finalpatientdata.filter(
          (patient) => selectGender.includes(patient.PatientGender)
        );
      }

      if (searchItem) {
        finalpatientdata = finalpatientdata.filter(encounter =>
          encounter.Name.toLowerCase().includes(searchItem.toLowerCase())
        );
      }

      

      setfilterPatientData(finalpatientdata);
      setPage(1)
    };

    filterPatient(referralProgram, patientData, selectGender, searchItem);
  }, [referralProgram, patientData, selectGender, searchItem ]);

  const totalPages = Math.ceil(filterPatientData.length / itemPerPage);
  const startIndex = (page - 1) * itemPerPage
  const endIndex = startIndex + itemPerPage
  const pageData = filterPatientData.slice(startIndex, endIndex)

  
 const tableHead = ["Email","Patient Name","Gender" , "Referral Program"];
 const handleRefresh = () => {
  setReferralProgram("");
  setSelectedReferralOption({ value: "", label: "All Referral Program" });
  setGender(null);
  setSelectedGender(null);
  setsearchItem("")
};



  return (
    <div className="h-[70vh] overflow-y-auto px-4 mt-5 ">
      <div className='mb-3 flex gap-4 items-center'>
        <div className='flex relative border-2 pl-2 rounded-lg  w-[42%]'>
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
          <button
            className='bg-white w-14 absolute -right-20 shadow-lg flex items-center justify-center shadow-[#525252] py-2 rounded-lg'
            onClick={handleRefresh}
          >
            <IoRefresh color='green' size={24} />
          </button>
        </div>
      </div>
      <div>  
    </div>
      <CommonTable tableHead={tableHead} page={page} setPage={setPage} pageData = {pageData} totalPages={totalPages} isDetails={true} />
    </div>

  )
}

export default PatientTable
