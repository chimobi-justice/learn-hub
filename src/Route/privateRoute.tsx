import { FunctionComponent } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { LOCAL_STORAGE_VALUES } from '@constant/Localstorage'

const PrivateRoute: FunctionComponent = () => {
  const location = useLocation();
  const token = localStorage.getItem(LOCAL_STORAGE_VALUES.ucType_);

  return token ? <Outlet /> : <Navigate to="auth/login" state={{ from: location }} replace />
}

export default PrivateRoute