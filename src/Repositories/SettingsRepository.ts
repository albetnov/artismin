import { DocumentData } from "firebase/firestore";
import BaseRepository from "./BaseRepository";

export default class SettingsRepository extends BaseRepository {
  table = "settings";

  async getSettings(): Promise<DocumentData[]> {
    return (await this.get()).docs.map((item) => {
      const data = item.data();
      return {
        id: item.id,
        ...data,
      };
    });
  }

  async editSetting(id: string, value: boolean) {
    await this.edit(id, { value });
  }

  async editSaves(id: string, url: string, value: boolean) {
    await this.edit(id, { url, value });
  }
}
