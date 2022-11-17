import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../Store/AuthStore";

export default function Logout() {
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    logout();
  }, []);

  return <Navigate to="/login" />;
}
