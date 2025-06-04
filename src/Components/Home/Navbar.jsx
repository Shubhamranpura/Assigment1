import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from "../../assets/Logo.jpg"
function Navbar() {
  const [userToken , setUserToken] = useState("")
  const navigate = useNavigate()

  useEffect(()=>{
      const token = JSON.parse(localStorage.getItem("Token"));
          console.log(token)
          setUserToken(token)
          console.log(userToken)
  },[userToken])

  const handlelogout = () => {
    localStorage.removeItem("Token")
    navigate("/login") 
  }
  return (
    <div className='text-black '>
      <header className='bg-[#ca5757] w-full h-[60px] '>
        <nav>
          <ul className='flex justify-around pt-2  text-2xl'>
            <li>
              <Link to={"/encounter"}>
                <img src={Logo} alt="logoimg" className='rounded-full  h-12' />
              </Link>
            </li>
           
           { !userToken  && <li>
              <Link to={"/login"} className='bg-white px-2 h-10 rounded-lg'>Login</Link>
            </li> }
            <li>
              <button className='bg-[rgb(167,210,60)] px-3 rounded-lg'
                onClick={handlelogout}>Logout</button>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default Navbar
