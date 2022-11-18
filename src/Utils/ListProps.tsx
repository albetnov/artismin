import { DocumentData } from "firebase/firestore";

export interface ListProps {
  data: DocumentData[];
  fetchChannel: () => Promise<void>;
}
