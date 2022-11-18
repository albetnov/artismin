export interface CreateProps {
  show: boolean;
  setShow: (value: boolean) => void;
  refetch: () => Promise<void>;
}
