import { DocumentData } from "firebase/firestore";
import { CreateProps } from "./CreateProps";

export interface EditProps extends CreateProps {
  item?: DocumentData;
}
