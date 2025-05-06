import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import encounterData from '../../mydata/Encounter';
import Table from './Table';
import Logo from "../../assets/Logo.jpg"
import Patient from '../Patient/Patient';

function Encounter() {
  const [username, setUsername] = useState(null);
  const [startdate, setStartDate] = useState(null);
  const [enddate, setEndDate] = useState(null);
  const [consultanttype, setConsultantType] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const isPatientTab = location.pathname === '/patient';

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("Curruser"));
    if (user) setUsername(user);
  }, []);

  return (
    <div>
      <section className='bg-blue-600 h-[60px] flex justify-start items-center text-white text-3xl'>
        <div className='w-[50px] m-2'>
          <img src={Logo} alt="logoimg" className='rounded-full h-12 w-24' />
        </div>
        <h1>Welcome <span>{username}</span></h1>
      </section>

      <section className='grid grid-cols-[250px_1fr] gap-5'>
        <aside className='border-2 flex flex-col gap-2 m-2 rounded-lg p-4 border-blue-500 h-[90vh]'>
          <div className={`${!isPatientTab ? 'bg-gray-300 p-2 border-l-4 border-indigo-500' : 'bg-gray-300 p-2'}`}>
            <button onClick={() => navigate('/encounter')}>
              Encounters
            </button>
          </div>

          <div className={`${isPatientTab ? 'bg-gray-300 p-2 border-l-4 border-indigo-500' : 'bg-gray-300 p-2'}`}>
            <button onClick={() => navigate('/patient')}>
              Patient
            </button>
          </div>
        </aside>

        <aside className='border-2 m-2 rounded-lg p-4 border-blue-500 h-[120vh]'>
          {isPatientTab ? (
            <Patient />
          ) : (
            <>
              <div className='flex gap-2'>
                <select
                  className='bg-blue-300 w-[30%] pl-3 h-[40px] text-2xl font-semibold ml-2'
                  onChange={(e) => setConsultantType(e.target.value || null)}
                >
                  <option value="" >All Consultation Type</option>
                  <option value="Get Started - No Results">Get Started - No Results</option>
                  <option value="CDT Consultation">CDT Consultation</option>
                  <option value="FH Test">FH Test</option>
                </select>

                <input
                  type="date"
                  className='bg-[rgb(167,210,60)] pl-2 text-white text-2xl'
                  value={startdate || ''}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  type="date"
                  className='bg-[#e53c3c] pl-2 text-white text-2xl'
                  value={enddate || ''}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              <div className='mt-[20px]'>
                <Table
                  startdate={startdate}
                  enddate={enddate}
                  consultanttype={consultanttype}
                  data={encounterData}
                />
              </div>
            </>
          )}
        </aside>
      </section>
    </div>
  );
}

export default Encounter;
