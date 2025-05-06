import patient from "../../Userdata/patients.json"
const patientData  = JSON.parse(JSON.stringify(patient,null,2))

let  filterPatientData = []
for(let patient of patientData.data){
  // console.log(patient.email)
  // console.log(patient.referral_program)
  // console.log(patient.gender)
  // console.log(patient?.address?.home?.full_name)
  let gender = ""
  if(patient.gender != "male" &&  patient.gender != "female"){
  gender = "others"
  }
  else{
    gender = patient.gender
  }

  filterPatientData.push({Email:patient.email,RefferralProgram:patient.referral_program,PatientGender:gender,
  Name: patient?.address?.home?.full_name || patient.first_name+ " " +patient.last_name,
  Dob:patient.dob})
}

console.dir(filterPatientData)
export default filterPatientData