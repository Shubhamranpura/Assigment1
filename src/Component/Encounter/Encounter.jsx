import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import encounterData from '../../mydata/Encounter';
import Table from './Table';
import Logo from "../../assets/Logo.jpg";
import Patient from '../Patient/Patient';
import MultiSelect from '../Common/MultipleSelect';

function Encounter() {
  const [username, setUsername] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [consultanttype, setConsultantType] = useState(null);
  const [error, setError] = useState({});
  const [selectedOption, setSelectedOption] = useState({ value: "", label: "All Consultation Type" });

  const navigate = useNavigate();
  const location = useLocation();

  const isPatientTab = location.pathname === '/patient';

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("Curruser"));
    if (user) {
      setUsername(user);
    } else {
      navigate("/login");
    }
    setError({})
  }, [navigate]);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (start > end) {
        setError({ dateError: "Please select a valid Ending Date" });
      } else {
        setError({});
      }

    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (!startDate || !endDate) {
      setError({});
    }
  }, [startDate, endDate]);


  const option = [
    { value: "", label: "All Consultation Type" },
    { value: "Get Started - No Results", label: "Get Started - No Results" },
    { value: "CDT Consultation", label: "CDT Consultation" },
    { value: "FH Test", label: "FH Test" }
  ];




  const handleSelectionChange = (selected) => {
    setConsultantType(selected.value);
    setSelectedOption(selected);
  };


  const handlelogout = () => {
    localStorage.removeItem("Token");
    navigate("/login");
  };



  return (
    <div>
      <section className='bg-indigo-400 h-[70px] flex justify-around items-center text-white text-3xl'>
        <div className='m-2 w-[50%] flex items-center gap-4'>
          <img src={Logo} alt="logoimg" className='rounded-[50px] w-12 h-12' />
          <h1>Welcome, <span>{username}</span></h1>
        </div>
        <button className='bg-[rgb(167,210,60)] px-3 py-2 rounded-lg' onClick={handlelogout}>
          Logout
        </button>
      </section>

      <section className='grid grid-cols-[250px_1fr] gap-5'>
        <aside className='border-2 flex flex-col gap-2 m-2 rounded-lg p-4 border-blue-500 h-[90vh]'>
          <div className={`${!isPatientTab ? 'bg-gray-300 p-2 border-l-4 border-indigo-500 text-indigo-500 text-lg' : 'bg-gray-300 p-2'}`}>
            <button onClick={() => navigate('/')}>Encounters</button>
          </div>

          <div className={`${isPatientTab ? 'bg-gray-300 p-2 border-l-4 border-indigo-500 text-indigo-500 text-lg' : 'bg-gray-300 p-2'}`}>
            <button onClick={() => navigate('/patient')}>Patient</button>
          </div>
        </aside>

        <aside className='border-2 m-2 rounded-lg p-4 border-blue-500 h-[120vh]'>
          {isPatientTab ? (
            <Patient />
          ) : (
            <section>
              <div className='flex gap-2'>
                <MultiSelect
                  className='w-[30%] pl-3 h-[40px] text-2xl font-semibold ml-2'
                  onChangeSelection={handleSelectionChange}
                  options={option}
                  placeholder={"Select Consultant Type."}
                  value={selectedOption}
                  isMultiple={false}
                />

                <input
                  type="date"
                  className='bg-[rgb(167,210,60)] px-2 rounded-lg text-white text-2xl'
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />

                <input
                  type="date"
                  className='bg-[rgb(172,196,111)] rounded-lg px-2 text-white text-2xl'
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />

              </div>

              {error.dateError && (
                <p className='text-red-600 absolute right-10  mt-10 font-semibold ml-4 '>{error.dateError}</p>
              )}

              <div className='mt-[20px]'>
                <Table
                  startDate={startDate}
                  endDate={endDate}
                  consultantType={consultanttype}
                  encounterData={encounterData}
                  setConsultantType={setConsultantType}
                  setEndDate={setEndDate}
                  setStartDate={setStartDate}
                  setSelectedOption={setSelectedOption}
                />
              </div>


            </section>
          )}
        </aside>
      </section>
    </div>
  );
}

export default Encounter;
