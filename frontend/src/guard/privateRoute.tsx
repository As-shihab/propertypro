import { Navigate, useLocation } from "react-router-dom";
import { Guard } from "./Guard"; // Assuming Guard class is properly implemented
import { ReactElement } from "react";

interface PrivateRouteProps {
  element: ReactElement;
  [key: string]: any;
}

const PrivateRoute = ({ element, ...rest }: PrivateRouteProps) => {
  const location = useLocation();

  // Check if the user is authenticated using the Guard
  if (!Guard.isAuthenticated()) {
    // Redirect to login if not authenticated, preserving the current location to redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the protected route
  return element;
};

export default PrivateRoute;
