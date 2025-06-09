import encounter from "../../Userdata/encounters.json"
const encounterData = JSON.parse(JSON.stringify(encounter))
let filterdata = []
for(let user of encounterData.data){
  let patientName = ""

  if(user?.patient?.address?.home?.full_name.includes(".") || user?.patient?.address?.home?.full_name.length < 4){
      patientName = user?.patient?.name
  }
  else{
    patientName=user?.patient?.address?.home?.full_name
  }

  filterdata.push({
    consultation_type:user.consultation_type,
    created_at:user.created_at,
    full_name:patientName
  })
}
export default filterdata

