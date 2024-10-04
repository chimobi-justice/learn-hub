import { FunctionComponent } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const AuthRoute: FunctionComponent = () => {
  const token = localStorage.getItem("ucType_");
  
  return !token ? <Outlet /> : <Navigate to="/" />
}

export default AuthRoute;