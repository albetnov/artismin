import { app } from "../Store/AuthStore";
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  getDoc,
  deleteDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
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

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(this.db, this.table, id));
  }

  async create<T extends object>(data: T) {
    return addDoc(collection(this.db, this.table), data);
  }

  async edit<T extends object>(id: string, data: T) {
    const docRef = doc(this.db, this.table, id);
    await updateDoc(docRef, data);
  }
}
