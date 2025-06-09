
const userdata = [
  {
    username:"shubham",
    emailid:"ranpurashubham@gmail.com",
    password:"Shubham@3108"
  },{
    username:"Arjun",
    emailid:"arjunprajapati@gmail.com",
    password:"Arjun@2901"
  },{
    username:"Harsh",
    emailid:"Patelharsh@gmail.com",
    password:"Harsh@2707"
  }
]

export const authdata = localStorage.setItem("user",JSON.stringify(userdata))