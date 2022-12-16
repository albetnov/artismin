import { DocumentData } from "firebase/firestore";
import { useState, useEffect } from "react";
import SettingsRepository from "../Repositories/SettingsRepository";
import useSettingsStore from "../Store/SettingStore";

export default function useCan(id: string) {
  const [approved, setApproved] = useState(false);
  const { changed } = useSettingsStore((state) => ({ changed: state.isChanged }));
  const [data, setData] = useState<DocumentData>({});

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await new SettingsRepository().find(id);
      if (data.exists()) {
        setData(data.data());
        setApproved(data.data().value);
      } else {
        setApproved(false);
      }
    };

    fetchSettings();

    return () => {
      setApproved(false);
    };
  }, [changed]);

  return { approved, data };
}
