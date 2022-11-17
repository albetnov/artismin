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
}
