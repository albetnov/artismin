import create from "zustand";

const WSS_URL = "WEBSOCKET_SERVER_URL";

interface WebsocketStoreProps {
  wssUrl: string | false;
  registerUrl(url: string): void;
  changed: boolean;
  unregister(): void;
}

export const useWebhookStore = create<WebsocketStoreProps>((set) => ({
  wssUrl: localStorage.getItem(WSS_URL) || false,
  changed: false,
  registerUrl(url: string) {
    localStorage.setItem(WSS_URL, url);
    set({ wssUrl: url, changed: true });
  },
  unregister() {
    localStorage.removeItem(WSS_URL);
    set({ wssUrl: false });
  },
}));
