import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from "../../assets/Logo.jpg"
function Navbar() {
  const navigate = useNavigate()
  const handlelogout = () => {
    localStorage.removeItem("Token")
    navigate("/")

    useEffect(()=>{
      JSON.parse(localStorage.getItem("Token"))
    })
  }
  return (
    <div className='text-black '>
      <header className='bg-[#ca5757] w-full h-[60px] '>
        <nav>
          <ul className='flex justify-around pt-2  text-2xl'>
            <li>
              <Link to={"/"}>
                <img src={Logo} alt="logoimg" className='rounded-full  h-12' />
              </Link>
            </li>
            <li>
              <Link to={"/encounter"}>
                <button >Encounter</button>
              </Link>
            </li>
            <li>
              <Link to={"/login"} className='bg-white px-2 h-10 rounded-lg'>Login</Link>
            </li>
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
