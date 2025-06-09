import encounter from "../../Userdata/encounters.json"
const encounterData = JSON.parse(JSON.stringify(encounter))
let filterdata = []
for(let user of encounterData.data){
  let patientname = ""
  if(user?.patient?.address?.home?.full_name.length<4){
      patientname = user?.patient?.name
  }
  else{
    patientname=user?.patient?.address?.home?.full_name
  }

  filterdata.push({
    consultation_type:user.consultation_type,
    created_at:user.created_at,
    full_name:patientname
  })
}
export default filterdata

