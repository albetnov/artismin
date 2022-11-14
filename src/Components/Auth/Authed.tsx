import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import shallow from "zustand/shallow";
import { useAuthStore } from "../../Store/AuthStore";

export default function Authed() {
  const navigate = useNavigate();
  const { isAuthed, checkForAuth } = useAuthStore(
    (state) => ({ isAuthed: state.isAuthed, checkForAuth: state.checkForAuth }),
    shallow
  );

  useEffect(() => {
    checkForAuth();
  }, []);

  useEffect(() => {
    if (!isAuthed) {
      navigate("/login");
    }
  }, [isAuthed]);

  return <Outlet />;
}
