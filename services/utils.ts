import Axios from "@/config/axios";
import { LOCAL_STORAGE_KEY } from "@/constants/local-storage-key";
import { getAsyncStorageData } from "@/utils/localstorage";

export const getAccessToken = () => {
  return getAsyncStorageData(LOCAL_STORAGE_KEY.TOKEN, null);
};

export const GET = async (url: string) => {
  const accessToken = await getAccessToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return Axios.get(url, { headers }).then((response) => response.data);
};

export const POST = async (url: string, data: any) => {
  const accessToken = await getAccessToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  try {
    const response = await Axios.post(url, data, { headers });
    return response.data;
  } catch (error: any) {
    // Try to extract error message safely
    if (error.response) {
      const contentType = error.response.headers["content-type"];
      if (contentType?.includes("application/json")) {
        throw error.response.data; // API returned structured error
      } else {
        throw new Error(error.response.data || "Unknown error");
      }
    } else {
      throw new Error(error.message || "Network error");
    }
  }
};

export const PATCH = async (url: string, data: any) => {
  const accessToken = await getAccessToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return Axios.patch(url, data, { headers }).then((response) => response.data);
};
export const DELETE = async (url: string) => {
  const accessToken = await getAccessToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return Axios.delete(url, { headers }).then((response) => response.data);
};
