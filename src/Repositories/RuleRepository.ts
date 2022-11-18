import BaseRepository from "./BaseRepository";

export default class RuleRepository extends BaseRepository {
  table = "rules";

  async getRules() {
    return (await this.get()).docs.map((item) => {
      return {
        id: item.id,
        ...item.data(),
      };
    });
  }

  async createRule(name: string, value: string): Promise<void> {
    await this.create({ name, value });
  }

  async editRule(id: string, name: string, value: string): Promise<void> {
    await this.edit(id, { name, value });
  }
}
