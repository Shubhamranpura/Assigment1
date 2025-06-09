import React, { useEffect, useState } from 'react';
import { BiData } from 'react-icons/bi';
import { FaCaretLeft, FaCaretRight, FaSearch } from 'react-icons/fa';
import CommonTable from '../Common/CommonTable';
import { IoRefresh } from 'react-icons/io5';

function Table({ startDate, endDate, consultantType, encounterData, setConsultantType, setEndDate, setStartDate, setSelectedOption }) {

  const pageItem = 5

  const [page, setPage] = useState(1)
  const [filterData, setFilterData] = useState([])
  const [serchItem, setsearchItem] = useState('')


  const handleSerchItem = (e) => {
    setsearchItem(e.target.value)
  }

  useEffect(() => {
    const filterarray = (startDate, endDate, encounterData, consultantType, serchItem) => {

      let finalData = encounterData;
      if (consultantType) {
        finalData = finalData.filter(encounter =>
          encounter.consultation_type.trim() === consultantType.trim()
        );
      }

      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        finalData = finalData.filter(encounter => {
          const dateString = encounter.created_at.split(" ")[0];
          const encounterDate = new Date(dateString);
          return encounterDate >= start && encounterDate <= end;
        });
      }


      if (serchItem) {
        finalData = finalData.filter(encounter =>
          encounter.full_name.toLowerCase().includes(serchItem.toLowerCase())
        );
      }

      setFilterData(finalData);
      setPage(1);
    };


    filterarray(startDate, endDate, encounterData, consultantType, serchItem);
  }, [startDate, endDate, consultantType, encounterData, serchItem]);

  const handleRefresh = () => {
    setStartDate("")
    setEndDate("")
    setConsultantType("")
    setsearchItem("")
    setSelectedOption({ value: "", label: "All Consultation Type" });

  }

  const totalPages = Math.ceil(filterData.length / pageItem);
  const startIndex = (page - 1) * pageItem;
  const endIndex = startIndex + pageItem;
  const pageData = filterData.slice(startIndex, endIndex);

  // table comp Data
  const tableHead = ["Date of Service", "Patient Name", "Consultation Type"]

  return (
    <section>
      {/* filter by name */}
      <div className='m-5 flex relative border-2 pl-2 rounded-lg border-[#a7d23c] w-[40%]'>
        <input
          type="text"
          name="search_by_name"
          placeholder='Search by Patient name'
          value={serchItem}
          onChange={handleSerchItem}
          id="searchbyname"
          className='outline-none h-10 w-[90%] text-2xl'
        />
        <button className='absolute right-3 top-3'>
          <FaSearch size={20} />
        </button>
        <button className='bg-white absolute -right-28  w-14 py-1 mt-[10px] shadow-lg shadow-[#525252] flex items-center justify-center rounded-lg py-auto'><IoRefresh color='green' size={24}
          onClick={handleRefresh}
        /></button>
      </div>


      <div className="h-[70vh] overflow-y-auto px-4">
        <CommonTable tableHead={tableHead} pageData={pageData} page={page} setPage={setPage} totalPages={totalPages} isDetails={false} />
      </div>
    </section>
  );
}

export default Table;
