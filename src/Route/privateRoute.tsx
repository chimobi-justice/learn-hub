import { FunctionComponent, ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

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