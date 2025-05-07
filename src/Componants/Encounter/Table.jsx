import React, { useEffect, useState } from 'react';
import { BiData } from 'react-icons/bi';
import { FaCaretLeft, FaCaretRight, FaSearch } from 'react-icons/fa';
import CommonTable from '../Common/CommonTable';

function Table({ startDate, endDate, consultantType, Data }) {
  console.log(startDate , endDate)
  const pageItem = 5

  const [page, setPage] = useState(1)
  const [filterData, setFilterData] = useState([])
  const [serchItem, setsearchItem] = useState('')

  // console.log(consultantType)
  
  const handleSerchItem = (e) => {
    setsearchItem(e.target.value)
  }

  useEffect(() => {
    const filterarray = (startDate, endDate, Data, consultantType, serchItem) => {
      let finalData = Data;
      // console.log(consultantType)
      if (consultantType) {
        finalData = finalData.filter(encounter =>
          encounter.consultation_type.trim()=== consultantType.trim()
        );
      }
         
      console.log(startDate , endDate)
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        finalData = finalData.filter(encounter => {
          const datestring = encounter.created_at.split(" ")[0];
          const encounterdate = new Date(datestring);
          return encounterdate >= start && encounterdate < end;
        });
      }

      if (serchItem) {
        finalData = finalData.filter(encounter => 
          encounter.full_name.toLowerCase().includes(serchItem.toLowerCase())
        );
      }
       
      // console.log(filterData)
      setFilterData(finalData);
      setPage(1);
    };


    filterarray(startDate, endDate, Data, consultantType, serchItem);
  }, [startDate, endDate, consultantType, Data, serchItem]);

  
  const totalPages = Math.ceil(filterData.length / pageItem);
  const startIndex = (page - 1) * pageItem;
  const endIndex = startIndex + pageItem;
  const PageData = filterData.slice(startIndex, endIndex);

  // table comp Data
  const tableHead = ["Date of Service","Patient Name","Consultation Type"]

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
      </div>

      <div className="h-[70vh] overflow-y-auto px-4">
        <CommonTable tableHead={tableHead} PageData={PageData} page={page} setPage={setPage} totalPages={totalPages} isDetails={false}/>
        </div>
        
    </section>
  );
}

export default Table;
