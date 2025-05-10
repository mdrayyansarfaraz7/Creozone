import { useAuthStore } from "../store/useAuthStore";
import { Navigate } from "react-router-dom";

const RedirectIfNotAuth = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  console.log("RedirectIfNotAuth: ", isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RedirectIfNotAuth;
