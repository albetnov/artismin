import { addDoc, collection } from "firebase/firestore";
import BaseRepository from "./BaseRepository";

export default class ChannelRepository extends BaseRepository {
  table = "channels";

  async getChannel() {
    return (await this.get()).docs.map((item) => {
      return {
        id: item.id,
        ...item.data(),
      };
    });
  }

  async createChannel(name: string, value: string): Promise<void> {
    await addDoc(collection(this.db, this.table), {
      name,
      value,
    });
  }
}
