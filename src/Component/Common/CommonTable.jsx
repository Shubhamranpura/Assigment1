import React from 'react'
import { FaCaretRight, FaCaretLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function CommonTable({ tableHead, pageData, setPage, totalPages, page, isDetails }) {
  const navigate = useNavigate();
  return (
    <div>
      <table className="w-full table-auto border-collapse">
        <thead className="bg-[#a7d23c] text-white">
          <tr>
            {tableHead.map((title, index) => (
              <th key={index} className="text-left p-3 text-[18px]">{title}</th>
            ))}
          </tr>
        </thead>
        <tbody >
          {isDetails ? (
            
            pageData.map((ele, index) => (
              <tr key={index} className="odd:bg-gray-200 even:bg-white">
                <td className="p-3 text-[20px]">{ele.Email}</td>
                <td className="text-[20px]">
                  <button
                    onClick={() => navigate(`/patient/patients-details?id=${ele.id}`)}
                    className="hover:text-blue-600 text-[20px] hover:underline"
                  >
                    {ele.Name}
                  </button>
                </td>
                <td className="p-3 text-[20px]">{ele.PatientGender }</td>
                <td className="p-3 text-[20px]">{ele.RefferralProgram }</td>
              </tr>
            ))
          ) 
           :
          (
              pageData.map((ele, index) => (
          <tr key={index} className="odd:bg-gray-200 even:bg-white">
            <td className="p-3 text-[25px]">{ele.created_at.split(" ")[0]}</td>
            <td className="p-3 text-[25px]">
              {ele.full_name }
            </td>
            <td className="p-3 text-[25px]">{ele.consultation_type }</td>
          </tr>
          ))
          ) 
          }

        </tbody>
      </table>

      <div className='mt-[70px] flex justify-center items-center gap-2'>
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-3 py-1 rounded ${page === 1 ? 'bg-gray-300 opacity-0' : ' text-white '}`}
        >
          <FaCaretLeft color='blue' size={24} />
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`w-8 border-2 rounded-lg px-2 ${page === i + 1
              ? 'bg-[#a7d23c] text-white border-[#a7d23c]'
              : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className={`px-3 py-1 rounded ${page === totalPages ? 'bg-gray-300  opacity-0' : ' text-white '}`}
        >
          <FaCaretRight color='blue' size={24} />

        </button>
      </div>
    </div>
  )
}

export default CommonTable
