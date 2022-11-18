import { DocumentData } from "firebase/firestore";

export interface DetailProps {
  show: boolean;
  setShow(value: boolean): void;
  item?: DocumentData;
}
