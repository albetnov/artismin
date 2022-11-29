import create from "zustand";

interface useSettingsStoreProps {
  isChanged: boolean;
  setChanged: (value: boolean) => void;
}

const useSettingsStore = create<useSettingsStoreProps>((set) => ({
  isChanged: false,
  setChanged(value) {
    set({ isChanged: value });
  },
}));

export default useSettingsStore;
