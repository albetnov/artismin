import dayjs from "dayjs";
import TokenRepository from "../Repositories/TokenRepository";

const headerBuilder = {
  headers: {
    Accept: "application/json",
  },
};

const headerBuilderWithJson = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export const checkForHealth = async (baseUrl: string) => {
  return await fetch(baseUrl + "/health", headerBuilder);
};

const makeToken = () => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < 64; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const installToken = (repo: TokenRepository) => {
  const newToken = makeToken();
  repo.createToken(newToken, dayjs().add(30, "minutes").toDate());
  return newToken;
};

const generateKey = async () => {
  const repo = new TokenRepository();
  const token = await repo.find("token");
  let result: string;

  if (!token.exists()) {
    result = installToken(repo);
  } else {
    const data = token.data();
    if (data!.expire_at.toDate() < new Date()) {
      result = installToken(repo);
    } else {
      result = data!.value;
    }
  }

  return result;
};

const urlBuilder = async (baseUrl: string, url: string) => {
  return `${baseUrl}/api/${url}?adminKey=${await generateKey()}`;
};

export const ping = async (baseUrl: string) => {
  return await fetch(await urlBuilder(baseUrl, "ping"), headerBuilder);
};

interface ClearCacheOptions {
  channels: boolean;
  roles: boolean;
}

export const clearCache = async (baseUrl: string, options?: ClearCacheOptions) => {
  return await fetch(await urlBuilder(baseUrl, "refreshCache"), {
    ...headerBuilderWithJson,
    method: "POST",
    body: options ? JSON.stringify(options) : "{}",
  });
};

interface SendMessageOptions {
  channel_id: string;
  message: string;
}

export const sendMessage = async (baseUrl: string, options: SendMessageOptions) => {
  return await fetch(await urlBuilder(baseUrl, "sendMessage"), {
    ...headerBuilderWithJson,
    method: "POST",
    body: JSON.stringify(options),
  });
};

export interface ChannelListInterface {
  type: number;
  guild: string;
  guildId: string;
  parentId: string;
  permissionOverwrites: string[];
  messages: any[];
  threads: any[];
  nsfw: boolean;
  flags: number;
  id: string;
  name: string;
  rawPosition: number;
  topic: any;
  lastMessageId?: string;
  rateLimitPerUser: number;
  createdTimestamp: number;
  lastPinTimestamp?: number;
}

export const channelList = async (baseUrl: string) => {
  return await fetch(await urlBuilder(baseUrl, "channelList"), headerBuilder);
};

type OrNull<T> = T | null;
type StringOrNull = OrNull<string>;

export interface Author {
  name: string;
  url: StringOrNull;
  iconUrl: StringOrNull;
}

export interface Field {
  name: string;
  value: string;
  inline: OrNull<boolean>;
}

export interface SendEmbedOptions {
  title: StringOrNull;
  description: StringOrNull;
  author: OrNull<Author>;
  fields: Field[];
  image: StringOrNull;
  thumbnail: StringOrNull;
  color: StringOrNull;
  channel_id: string;
}

export const sendEmbed = async (baseUrl: string, options: SendEmbedOptions) => {
  return await fetch(await urlBuilder(baseUrl, "sendEmbed"), {
    ...headerBuilderWithJson,
    method: "POST",
    body: JSON.stringify(options),
  });
};
