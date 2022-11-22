import { doc, setDoc } from "firebase/firestore";
import BaseRepository from "./BaseRepository";

export default class RoadmapRepository extends BaseRepository {
  table = "roadmap";

  async getRoadmap() {
    return (await this.get()).docs.map((item) => {
      const data = item.data();
      return { id: item.id, ...data };
    });
  }

  async createRoadmap(
    id: string,
    author_name: string,
    author_url: string,
    content: string,
    footer: string,
    image: string,
    title: string
  ): Promise<boolean> {
    if ((await this.find(id)).exists()) {
      return false;
    }

    await setDoc(doc(this.db, this.table, id), {
      author_name,
      author_url,
      content,
      footer,
      image,
      title,
    });
    return true;
  }

  async editRoadmap(
    id: string,
    author_name: string,
    author_url: string,
    content: string,
    footer: string,
    image: string,
    title: string
  ): Promise<void> {
    await this.edit(id, { author_name, author_url, content, footer, image, title });
  }
}
