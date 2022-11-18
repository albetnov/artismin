import { DocumentData } from "firebase/firestore";

export interface ListProps {
  data: DocumentData[];
  refetch: () => Promise<void>;
}
