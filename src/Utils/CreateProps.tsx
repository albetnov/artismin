export interface CreateProps {
  show: boolean;
  setShow: (value: boolean) => void;
  fetchChannel: () => Promise<void>;
}
