import { doc, setDoc, Timestamp } from "firebase/firestore";
import BaseRepository from "./BaseRepository";

export default class TokenRepository extends BaseRepository {
  table = "tokens";

  async createToken(value: string, expireAt: Date): Promise<void> {
    const expire_at = Timestamp.fromDate(expireAt);
    await setDoc(doc(this.db, this.table, "token"), { value, expire_at });
  }

  async editToken(id: string, value: string): Promise<void> {
    await this.edit(id, { value });
  }
}
