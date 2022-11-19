import { Timestamp } from "firebase/firestore";
import BaseRepository from "./BaseRepository";

export default class ScheduleRepository extends BaseRepository {
  table = "scheduler";

  async getSchedule() {
    return (await this.get()).docs.map((item) => {
      const data = item.data();
      const execute_when = data.execute_when.toDate().toLocaleString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
      delete data.execute_when;
      return {
        id: item.id,
        ...data,
        execute_when,
      };
    });
  }

  async createSchedule(
    channel_id: string,
    description: string,
    execute_when: Timestamp,
    image: string,
    title: string
  ): Promise<void> {
    await this.create({ channel_id, description, execute_when, image, title });
  }

  async editSchedule(
    id: string,
    channel_id: string,
    description: string,
    execute_when: Timestamp,
    image: string,
    title: string
  ): Promise<void> {
    await this.edit(id, { channel_id, description, execute_when, image, title });
  }
}
