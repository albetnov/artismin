import { app } from "../Store/AuthStore";
import { collection, getDocs, getFirestore, doc, getDoc } from "firebase/firestore";
export default abstract class BaseRepository {
  db = getFirestore(app);
  abstract table: string;

  constructor() {
    this.get = this.get.bind(this);
    this.find = this.find.bind(this);
  }

  async get() {
    return await getDocs(collection(this.db, this.table));
  }

  async find(filter: string) {
    const docRef = doc(this.db, this.table, filter);
    return await getDoc(docRef);
  }
}
