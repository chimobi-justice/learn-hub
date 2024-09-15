import { axiosInstance } from '@api/axiosInstance';
import { FunctionComponent, ReactElement, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

// import { useUser } from '@context/userContext'

interface PrivateRouteProps {
  element: ReactElement;
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({ element }) => {
  const location = useLocation();

  const loggedInUser = localStorage.getItem("ucType_");

  if (!loggedInUser) {
    return (
      <Navigate
        to="/auth/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return element;
}

export default PrivateRoute