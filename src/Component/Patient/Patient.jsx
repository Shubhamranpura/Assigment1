import React, { useState } from 'react';
import patientData from '../../mydata/Patient';
import PatientTable from './PatientTable';
import MultiSelect from '../Common/MultipleSelect';
import { IoRefresh } from 'react-icons/io5';

function Patient() {
  const [referralProgram, setReferralProgram] = useState();
  const [gender, setGender] = useState();

  const [selectedReferralOption, setSelectedReferralOption] = useState({ value: "", label: "All Referral Program" })

  const [selectedGender, setSelectedGender] = useState(null)



  const handleReferralProgramChange = (selected) => {
    setReferralProgram(selected.value);
    setSelectedReferralOption(selected);
  };

  const handleGenderSelectionChange = (selected) => {
    const value = selected.map(item => item.value);
    setGender(value);
    setSelectedGender(selected);
  };

  const referralOptions = [
    { value: "", label: "All Referral Program" },
    { value: "Baebies", label: "Baebies" },
    { value: "UCLA Health", label: "UCLA Health" },
    { value: "outreach", label: "outreach" },
    { value: "DTC_Proactive", label: "DTC_Proactive" },
    { value: "BioMarin", label: "BioMarin" }
  ];

  const genderOptions = [
    { value: "male", label: "male" },
    { value: "female", label: "Female" },
    { value: "others", label: "Others" }
  ];




  return (
    <div>
      <section>
        <div className='mt-2 flex gap-10'>
          <MultiSelect
            className='w-[30%] pl-3 h-[40px] text-2xl font-semibold ml-2'
            onChangeSelection={handleReferralProgramChange}
            options={referralOptions}
            placeholder={"Select Referral Program"}
            isMultiple={false}
            value={selectedReferralOption}
          />

          <MultiSelect
            onChangeSelection={handleGenderSelectionChange}
            options={genderOptions}
            isMultiple={true}
            value={selectedGender}
            placeholder={"Select Gender"}
          />


        </div>
        <PatientTable
          patientData={patientData}
          referralProgram={referralProgram}
          selectGender={gender}
          setReferralProgram={setReferralProgram}
          setSelectedReferralOption={setSelectedReferralOption}
          setGender={setGender}
          setSelectedGender={setSelectedGender}
        />
      </section>
    </div>
  );
}

export default Patient;
