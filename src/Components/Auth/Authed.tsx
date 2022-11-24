import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import shallow from "zustand/shallow";
import { useAuthStore } from "../../Store/AuthStore";
import Loading from "../Loading";

interface AuthedProps {
  redirect?: boolean;
}

export default function Authed({ redirect = false }: AuthedProps) {
  const navigate = useNavigate();
  const { isAuthed, checkForAuth } = useAuthStore(
    (state) => ({ isAuthed: state.isAuthed, checkForAuth: state.checkForAuth }),
    shallow
  );

  useEffect(() => {
    checkForAuth();
  }, []);

  useEffect(() => {
    if (!isAuthed && isAuthed !== null) {
      navigate("/login");
    }

    if (redirect && isAuthed) {
      navigate("/dashboard");
    }
  }, [isAuthed]);

  if (isAuthed === null) {
    return <Loading />;
  }

  return <Outlet />;
}
