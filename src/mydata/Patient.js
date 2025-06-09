import patient from "../../Userdata/patients.json"
const patientData = JSON.parse(JSON.stringify(patient, null, 2))

let filterPatientData = []
let id = 0
for (let patient of patientData.data) {

  let gender = ""
  if (patient.gender != "male" && patient.gender != "female") {
    gender = "others"
  }
  else {
    gender = patient.gender
  }

  let pid = id

  let patientsname = patient?.address?.home?.full_name || patient.first_name + " " + patient.last_name


  if (patientsname.length < 4 ||
    patientsname.split(" ")[1].length === 1 ||
    patientsname.split(" ")[0] === patientsname.split(" ")[1] || patientsname.split(" ").length === 3) {
    patientsname = patient.email.split("+")[0].split(".").join(" ")
  }

  filterPatientData.push({
    Email: patient.email, RefferralProgram: patient.referral_program, PatientGender: gender,
    Name: patientsname,
    Dob: patient.dob,
    id: pid
  })
  id++;

}

export default filterPatientData