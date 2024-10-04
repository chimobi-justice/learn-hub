import { FunctionComponent } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

const PrivateRoute: FunctionComponent = () => {
  const location = useLocation();
  const token = localStorage.getItem("ucType_");

  return token ? <Outlet /> : <Navigate to="auth/login" state={{ from: location }} replace />
}

export default PrivateRoute