import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

function PriveteRoutes({children}) {
  const [unauthenticated, setunauthenticated] = useState(false)
  
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("Token")
      setunauthenticated(!token)
    }
    checkAuth()
  }, [])

  if (unauthenticated) {
    return <Navigate to="/login" />
  }
  
  return children
}

export default PriveteRoutes
