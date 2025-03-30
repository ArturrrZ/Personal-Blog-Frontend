import React, {useContext} from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../AuthContext'


function AuthorizationRoute({children}) {
  const {authenticated} = useContext(AuthContext);
  return (
    <div>
        {authenticated?<Navigate to="/"/>:children}
    </div>
  )
}

export default AuthorizationRoute
