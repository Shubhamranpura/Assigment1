import React, { useState } from 'react'
import { GoEye } from 'react-icons/go'
import { LuEyeClosed } from 'react-icons/lu'
import { useNavigate } from 'react-router-dom'
import { authdata } from '../../../Userdata/userdata'

function Login() {
  const [showpassword, setshowpassword] = useState(false)
  const [error, seterror] = useState({})
  const data = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData(e.target)
    const result = data.find((user) => user.emailid === formdata.get("user_email") && user.password === formdata.get("user_password"))
    if (result) {
      navigate('/')
      const token = btoa(`${result.username}${result.userpassword}`)
      localStorage.setItem("Curruser", JSON.stringify(result.username))
      localStorage.setItem("Token", JSON.stringify(token))
    }
    else {
    }
  }
  return (

    <div className='flex items-center h-[100vh]   justify-center'>
      <section className='bg-blue-500 rounded-lg p-3   text-black sm:w-full  lg:w-[40%] h-[50vh]'>
        <p className='text-2xl shadow-md '>Hello User</p>
        <form action="userlogin" onSubmit={handleSubmit}>
          <div className='flex flex-col mt-2'>
            <label htmlFor="user_email" className='text-[25px] text-yellow-400'>Email*</label>
            <input type="email" name="user_email" id="user_email"
              placeholder='Enter your email'
              autoComplete="new-Email"
              className='mt-2  rounded-lg h-10 w-[80%] p-2 text-2xl' />
          </div>
          {/* password */}
          <div className='flex flex-col mt-2 relative'>
            <label htmlFor="user_password" className='text-[25px] text-yellow-400'>Password*</label>
            <input type={showpassword ? "text" : "password"} name="user_password" id="user_password"
              placeholder='Enter your Password'
              autoComplete="new-password"
              className='mt-2  rounded-lg h-10 w-[80%] p-2 text-2xl' />
            <span onClick={() => setshowpassword(prev => !prev)}
              className='absolute lg:top-[56px] lg:right-[130px]  '
            >{showpassword ? <GoEye fontSize={24} /> : <LuEyeClosed fontSize={24} />}</span>
          </div>
          {/* button */}
          <div className=' flex justify-center items-center  mt-5 h-20 px-5 '>
            <button className=' bg-white text-blue-500 sm:w-[40%] lg:w-[20%] text-2xl h-10 rounded-lg'>Login</button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Login
