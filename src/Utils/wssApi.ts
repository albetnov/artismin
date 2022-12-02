import { ClearCacheOptions, SendEmbedOptions, SendMessageOptions, timeoutableFetch } from "./Api";

export const checkClient = async (baseUrl: string) => {
  try {
    const res = await timeoutableFetch(`${baseUrl}/api/checkUser`, {
      timeout: 8000,
    });
    if (!res.ok) {
      throw Error("Error fetching");
    }

    const json = await res.json();
    if (json.count > 0) {
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const clearCache = async (baseUrl: string, options?: ClearCacheOptions) => {
  return await fetch(`${baseUrl}/api/refreshCache`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: options ? JSON.stringify(options) : "{}",
  });
};

export const sendMessage = async (baseUrl: string, options: SendMessageOptions) => {
  return await fetch(`${baseUrl}/api/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
};

export const channelList = async (baseUrl: string) => {
  return await fetch(`${baseUrl}/api/channelList`, {
    headers: {
      Accept: "application/json",
    },
  });
};

export const sendEmbed = async (baseUrl: string, options: SendEmbedOptions) => {
  return await fetch(`${baseUrl}/api/sendEmbed`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
};

export const castRules = async (baseUrl: string) => {
  return await fetch(`${baseUrl}/api/castRules`, {
    headers: {
      Accept: "application/json",
    },
  });
};
