import { Alert } from "evergreen-ui";
import { useState } from "react";

type AlertIntent = "danger" | "success" | "warning" | "none";

interface AlertProps {
  intent: AlertIntent;
  content: string;
  activate: boolean;
}

export default function useAlert() {
  const initialState: AlertProps = {
    activate: false,
    content: "",
    intent: "none",
  };

  const [alert, setAlert] = useState<AlertProps>(initialState);

  const changeAlert = (content: string, intent: AlertIntent) => {
    setAlert({
      activate: true,
      content,
      intent,
    });
  };

  const resetAlert = () => {
    setAlert(initialState);
  };

  return {
    changeAlert,
    resetAlert,
    element: alert.activate ? <Alert intent={alert.intent}>{alert.content}</Alert> : <></>,
  };
}
