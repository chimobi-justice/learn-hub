import { FunctionComponent, ReactElement, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useUser } from '@context/userContext'

interface AuthRouteProps {
  element: ReactElement;
}

const AuthRoute: FunctionComponent<AuthRouteProps> = ({ element }) => {
  const navigate = useNavigate();

  const getToken = !!localStorage.getItem("ucType_");

  const { user } = useUser();

  useEffect(() => {
    if (user && getToken) {
      navigate('/', { replace: true});
    }
  }, [user, getToken, navigate]);

  if (getToken) return null;

  return element;
}

export default AuthRoute;