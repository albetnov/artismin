import { Alert, Button, TextInputField } from "evergreen-ui";
import { FormEvent, useRef, useState } from "react";
import { FiRepeat, FiSave } from "react-icons/fi";
import { useWebsocketStore } from "../../Store/WebsocketStore";
import { checkClient } from "../../Utils/wssApi";

export default function NotConfigured() {
  const { registerUrl, wssUrl } = useWebsocketStore((state) => ({
    registerUrl: state.registerUrl,
    wssUrl: state.wssUrl,
  }));
  const urlRef = useRef<HTMLInputElement>(null);
  const [alert, setAlert] = useState<boolean | string>(false);
  const [loading, setLoading] = useState(false);

  const revalidate = async (url: string) => {
    try {
      setLoading(true);

      const res = await checkClient(url);
      !res && setAlert("Failed to connect.");
      registerUrl(url);
      return true;
    } catch {
      setAlert("Failed to connect.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const revalidateHandler = () => {
    if (!wssUrl) {
      setAlert("Ups, You don't even have WebSocket URL lol. Now configure!");
      return;
    }

    revalidate(wssUrl);
  };

  const configureWebsocket = async (e: FormEvent) => {
    e.preventDefault();
    setAlert(false);
    const urlInput = urlRef.current?.value;
    if (!urlInput) {
      setAlert("Invalid input!");
      return;
    }

    revalidate(urlInput);
  };

  return (
    <>
      <Alert intent="warning" marginY={20}>
        WebSocket configuration not detected or failed! Please configure the WebSocket below!
      </Alert>
      {alert && (
        <Alert intent="danger" marginY={10}>
          {alert}
        </Alert>
      )}
      <form onSubmit={configureWebsocket}>
        <TextInputField
          marginX="auto"
          label="URL (WebSocket URL)"
          hint="Enter your bot WebSocket URL."
          type="text"
          required
          ref={urlRef}
        />
        <Button isLoading={loading}>
          <FiSave /> Save
        </Button>
        <Button marginLeft={10} isLoading={loading} type="button" onClick={revalidateHandler}>
          <FiRepeat /> Just Revalidate
        </Button>
      </form>
    </>
  );
}
