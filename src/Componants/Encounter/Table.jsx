import React, { useEffect, useState } from 'react';
import { BiData } from 'react-icons/bi';
import { FaCaretLeft, FaCaretRight, FaSearch } from 'react-icons/fa';

function Table({ startdate, enddate, consultanttype, data }) {
  
  const pageitem = 5

  const [page, setpage] = useState(1)
  const [filterdata, setfilterdata] = useState([])
  const [serchItem, setsearchItem] = useState('')

  const handleserchitem = (e) => {
    setsearchItem(e.target.value)
  }

  useEffect(() => {
    const filterarray = (startdate, enddate, data, consultanttype, serchItem) => {
      let finaldata = data;

      if (consultanttype) {
        finaldata = finaldata.filter(encounter =>
          encounter.consultation_type.trim() === consultanttype.trim()
        );
      }

      if (startdate && enddate) {
        const start = new Date(startdate);
        const end = new Date(enddate);
        finaldata = finaldata.filter(encounter => {
          const datestring = encounter.created_at.split(" ")[0];
          const encounterdate = new Date(datestring);
          return encounterdate >= start && encounterdate < end;
        });
      }

      if (serchItem) {
        finaldata = finaldata.filter(encounter => 
          encounter.full_name.toLowerCase().includes(serchItem.toLowerCase())
        );
      }

      setfilterdata(finaldata);
      setpage(1);
    };

    filterarray(startdate, enddate, data, consultanttype, serchItem);
  }, [startdate, enddate, consultanttype, data, serchItem]);

  const totalPages = Math.ceil(filterdata.length / pageitem);
  console.log(totalPages)
  const startIndex = (page - 1) * pageitem;
  const endIndex = startIndex + pageitem;
  const PageData = filterdata.slice(startIndex, endIndex);
  console.log(PageData)

  return (
    <section>
      {/* filter by name */}
      <div className='m-5 flex relative border-2 pl-2 rounded-lg border-[#a7d23c] w-[40%]'>
        <input 
          type="text" 
          name="search_by_name"
          placeholder='Search by Patient name'
          value={serchItem}
          onChange={handleserchitem}
          id="searchbyname" 
          className='outline-none h-10 w-[90%] text-2xl'
        />
        <button className='absolute right-3 top-3'>
          <FaSearch size={20} />
        </button>
      </div>

      <div className="h-[70vh] overflow-y-auto px-4">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-[#a7d23c] text-white">
            <tr>
              <th className="text-left p-3 text-[18px]">Date of Service</th>
              <th className="text-left p-3 text-[18px]">Patient Name</th>
              <th className="text-left p-3 text-[18px]">Consultation Type</th>
            </tr>
          </thead>
          <tbody>
            {PageData.map((ele, index) => (
              <tr key={index} className="odd:bg-gray-200 even:bg-white ">
                <td className="p-3 text-[20px]">{ele.created_at.split(" ")[0]}</td>
                <td className="p-3 text-[20px]">{ele.full_name.split(".")[0]}</td>
                <td className="p-3 text-[20px]">{ele.consultation_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='mt-5 flex justify-center items-center gap-2'>
        <button
          onClick={() => setpage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-3 py-1 rounded ${page === 1 ? 'bg-gray-300 opacity-0' : ' text-white '}`}
        >
          <FaCaretLeft color='blue' size={24}/>
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button 
            key={i} 
            onClick={() => setpage(i + 1)}
            className={`w-8 border-2 rounded-lg px-2 ${
              page === i + 1 
                ? 'bg-[#a7d23c] text-white border-[#a7d23c]' 
                : 'bg-gray-200 text-black hover:bg-gray-300'
            }`}
          >
            {i +1}
          </button>
        ))}
        <button
          onClick={() => setpage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-3 py-1 rounded ${page === totalPages ? 'bg-gray-300  opacity-0' : ' text-white '}`}
        >
                    <FaCaretRight color='blue' size={24}/>

        </button>
      </div>
    </section>
  );
}

export default Table;
