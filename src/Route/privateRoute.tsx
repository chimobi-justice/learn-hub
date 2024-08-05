import { FunctionComponent, ReactElement } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useUser } from '@context/userContext'

interface PrivateRouteProps {
  element: ReactElement;
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({ element }) => {
  const { user } = useUser();
  const location = useLocation();

  if (!user) {
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