import { Alert, Button, TextInputField } from "evergreen-ui";
import { FormEvent, useRef, useState } from "react";
import { FiRepeat, FiSave } from "react-icons/fi";
import { useWebhookStore } from "../../Store/WebhookStore";
import { checkForHealth } from "../../Utils/Api";

export default function NotConfigured() {
  const { registerUrl, webhookUrl } = useWebhookStore((state) => ({
    registerUrl: state.registerUrl,
    webhookUrl: state.webhookUrl,
  }));
  const urlRef = useRef<HTMLInputElement>(null);
  const [alert, setAlert] = useState<boolean | string>(false);
  const [loading, setLoading] = useState(false);

  const revalidate = async (url: string) => {
    try {
      setLoading(true);

      const res = await checkForHealth(url);
      !res.ok && setAlert("Failed to connect.");
      return true;
    } catch {
      setAlert("Failed to connect.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const revalidateHandler = () => {
    if (!webhookUrl) {
      setAlert("Ups, You don't even have webhook URL lol. Now configure!");
      return;
    }

    revalidate(webhookUrl);
  };

  const configureWebhook = async (e: FormEvent) => {
    e.preventDefault();
    setAlert(false);
    const urlInput = urlRef.current?.value;
    if (!urlInput) {
      setAlert("Invalid input!");
      return;
    }

    if (!revalidate(urlInput)) return;

    registerUrl(urlInput);
  };

  return (
    <>
      <Alert intent="warning" marginY={20}>
        Webhook configuration not detected or failed! Please configure the webhook below!
      </Alert>
      {alert && (
        <Alert intent="danger" marginY={10}>
          {alert}
        </Alert>
      )}
      <form onSubmit={configureWebhook}>
        <TextInputField
          marginX="auto"
          label="URL (Webhook URL)"
          hint="Enter your bot webhook URL."
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
