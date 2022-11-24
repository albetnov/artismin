import create from "zustand";

const WEBHOOK_URL = "WEBHOOK_URL";

interface WebhookStoreProps {
  webhookUrl: string | false;
  registerUrl(url: string): void;
  changed: boolean;
  unregister(): void;
}

export const useWebhookStore = create<WebhookStoreProps>((set) => ({
  webhookUrl: localStorage.getItem(WEBHOOK_URL) || false,
  changed: false,
  registerUrl(url: string) {
    localStorage.setItem(WEBHOOK_URL, url);
    set({ webhookUrl: url, changed: true });
  },
  unregister() {
    localStorage.removeItem(WEBHOOK_URL);
    set({ webhookUrl: false });
  },
}));
