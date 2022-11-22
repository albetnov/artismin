import dayjs from "dayjs";
import TokenRepository from "../Repositories/TokenRepository";

const headerBuilder = {
  headers: {
    Accept: "application/json",
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

export const clearCache = async (baseUrl: string) => {
  return await fetch(await urlBuilder(baseUrl, "refreshCache"), {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    method: "POST",
    body: "{}",
  });
};
