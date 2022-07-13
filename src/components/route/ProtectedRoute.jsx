import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux'

const ProtectedRoute = ({}) => {
  const user = useSelector(state => state.user)

  return (
    user.isSignedIn ?  
        <Outlet />
    : <Navigate to='/auth' />
  )
}

export default ProtectedRoute