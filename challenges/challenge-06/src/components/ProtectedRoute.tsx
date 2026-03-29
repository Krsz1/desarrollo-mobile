import { Navigate } from "react-router-dom";
import type { ReactElement } from "react";
import { useAuth } from "../hooks/useAuth";

interface Props {
  children: ReactElement;
}

const ProtectedRoute = ({ children }: Props) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;