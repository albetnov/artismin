import BaseRepository from "./BaseRepository";

export default class RoleRepository extends BaseRepository {
  table = "roles";

  async getRole() {
    return (await this.get()).docs.map((item) => {
      return {
        id: item.id,
        ...item.data(),
      };
    });
  }

  async createRole(name: string, value: string): Promise<void> {
    await this.create({ name, value });
  }

  async editRole(id: string, name: string, value: string): Promise<void> {
    await this.edit(id, { name, value });
  }
}
