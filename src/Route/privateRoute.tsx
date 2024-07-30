import { FunctionComponent, ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  element: ReactElement;
}

const PrivateRoutes: FunctionComponent<PrivateRouteProps> = ({ element }) => {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem("ucType_");

  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/auth/login" state={{ from: location}} replace />
  )
}

export default PrivateRoutes