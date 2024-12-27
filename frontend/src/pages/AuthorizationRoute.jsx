import React from 'react'
import { Navigate } from 'react-router-dom'

function AuthorizationRoute({authenticated, children}) {
  return (
    <div>
        {authenticated?<Navigate to="/"/>:children}
    </div>
  )
}

export default AuthorizationRoute
