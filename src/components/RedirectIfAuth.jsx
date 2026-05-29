import { useAuthStore } from "../store/useAuthStore";
import { Navigate } from "react-router-dom";

const RedirectIfAuth = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RedirectIfAuth;
