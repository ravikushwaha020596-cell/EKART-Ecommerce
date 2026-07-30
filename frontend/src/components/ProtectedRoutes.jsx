
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes  = ({children, adminOnly = false}) => {
    const {user} = useSelector((store) => store.user)
 
  if(!user){
    return <Navigate to="/login" replace />
  }
  if(adminOnly && user?.role !== "admin"){
    return <Navigate to='/' replace />
  }
  return children
}

export default ProtectedRoutes 
