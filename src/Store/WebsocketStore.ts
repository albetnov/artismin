import create from "zustand";
import SettingsRepository from "../Repositories/SettingsRepository";

const WSS_URL = "WEBSOCKET_SERVER_URL";

interface WebsocketStoreProps {
  wssUrl: string | false;
  registerUrl(url: string): void;
  changed: boolean;
  unregister(): void;
  fromCloud: boolean;
  checkCloud(): Promise<void>;
}

export const useWebsocketStore = create<WebsocketStoreProps>((set, get) => ({
  wssUrl: localStorage.getItem(WSS_URL) || false,
  changed: false,
  fromCloud: false,
  async checkCloud() {
    const data = await new SettingsRepository().find("saves_url_websocket");
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
      await new SettingsRepository().editSaves("saves_url_websocket", url, true);
    }
    localStorage.setItem(WSS_URL, url);
    set({ wssUrl: url, changed: true });
  },
  async unregister() {
    if (get().fromCloud) {
      await new SettingsRepository().editSaves("saves_url_websocket", "", false);
    }
    localStorage.removeItem(WSS_URL);
    set({ wssUrl: false });
  },
}));
