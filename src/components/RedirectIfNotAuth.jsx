import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { ScaleLoader } from "react-spinners";

const RedirectIfNotAuth = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth(); 
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ScaleLoader color="#f43f5e" height={40} width={5} radius={2} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RedirectIfNotAuth;
