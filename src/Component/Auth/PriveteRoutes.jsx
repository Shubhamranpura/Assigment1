import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

function PriveteRoutes({children}) {
  const [unAuthenticated, setUnAuthenticated] = useState(false)
  
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("Token")
      setUnAuthenticated(!token)
    }
    checkAuth()
  }, [])

  if (unAuthenticated) {
    return <Navigate to="/login" />
  }
  
  return children
}

export default PriveteRoutes
