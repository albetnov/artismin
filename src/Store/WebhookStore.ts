import create from "zustand";
import SettingsRepository from "../Repositories/SettingsRepository";

const WEBHOOK_URL = "WEBHOOK_URL";

interface WebhookStoreProps {
  webhookUrl: string | false;
  registerUrl(url: string): void;
  changed: boolean;
  unregister(): void;
  fromCloud: boolean;
  checkCloud(): Promise<void>;
}

export const useWebhookStore = create<WebhookStoreProps>((set, get) => ({
  webhookUrl: localStorage.getItem(WEBHOOK_URL) || false,
  changed: false,
  fromCloud: false,
  async checkCloud() {
    const data = await new SettingsRepository().find("saves_url_webhook");
    if (data.exists()) {
      const item = data.data();
      if (item.value) {
        set({ fromCloud: true });
        get().registerUrl(item.url);
      }
    }
  },
  async registerUrl(url: string) {
    if (get().fromCloud) {
      await new SettingsRepository().editSaves("saves_url_webhook", url, true);
    }
    localStorage.setItem(WEBHOOK_URL, url);
    set({ webhookUrl: url, changed: true });
  },
  async unregister() {
    if (get().fromCloud) {
      await new SettingsRepository().editSaves("saves_url_webhook", "", false);
    }
    localStorage.removeItem(WEBHOOK_URL);
    set({ webhookUrl: false });
  },
}));
