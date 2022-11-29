import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import shallow from "zustand/shallow";
import SettingsRepository from "../../Repositories/SettingsRepository";
import { useAuthStore } from "../../Store/AuthStore";
import useSettingsStore from "../../Store/SettingStore";
import { useWebhookStore } from "../../Store/WebhookStore";
import { useWebsocketStore } from "../../Store/WebsocketStore";
import showRouteParser from "../../Utils/showRouteParser";
import Loading from "../Loading";

interface AuthedProps {
  redirect?: boolean;
}

export default function Authed({ redirect = false }: AuthedProps) {
  const navigate = useNavigate();
  const path = useLocation();

  const { isAuthed, checkForAuth } = useAuthStore(
    (state) => ({ isAuthed: state.isAuthed, checkForAuth: state.checkForAuth }),
    shallow
  );
  const { changed } = useSettingsStore((state) => ({ changed: state.isChanged }));
  const { checkWebhookCloud } = useWebhookStore((state) => ({
    checkWebhookCloud: state.checkCloud,
  }));
  const { checkWebsocketCloud } = useWebsocketStore((state) => ({
    checkWebsocketCloud: state.checkCloud,
  }));

  const [settings, setSettings] = useState<DocumentData[]>([]);

  const fetchSettings = async () => {
    const data = await new SettingsRepository().getSettings();
    setSettings(data);
  };

  useEffect(() => {
    const allowed = showRouteParser(settings);
    if (path.pathname in allowed && allowed[path.pathname] === false) {
      navigate("/dashboard");
    }
  }, [settings]);

  useEffect(() => {
    if (changed) {
      fetchSettings();
    }
  }, [changed]);

  useEffect(() => {
    checkForAuth();
    checkWebhookCloud();
    checkWebsocketCloud();
    fetchSettings();
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
