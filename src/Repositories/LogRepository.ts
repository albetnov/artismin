import { DocumentData } from "firebase/firestore";
import BaseRepository from "./BaseRepository";

export interface LogInterface {
  details: string;
  message: string;
}

export default class LogRepository extends BaseRepository {
  table = "logging";

  async getLog() {
    return (await this.get()).docs.map((item: DocumentData) => item.data());
  }
}
