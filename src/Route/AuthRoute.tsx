import { FunctionComponent } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

import { LOCAL_STORAGE_VALUES } from '@constant/Localstorage'

const AuthRoute: FunctionComponent = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_VALUES.ucType_);
  
  return !token ? <Outlet /> : <Navigate to="/" />
}

export default AuthRoute;