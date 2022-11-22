import create from "zustand";

const WEBHOOK_URL = "WEBHOOK_URL";

interface WebhookStoreProps {
  webhookUrl: string | false;
  registerUrl(url: string): void;
}

export const useWebhookStore = create<WebhookStoreProps>((set) => ({
  webhookUrl: localStorage.getItem(WEBHOOK_URL) || false,
  registerUrl(url: string) {
    localStorage.setItem(WEBHOOK_URL, url);
    set({ webhookUrl: url });
  },
}));
