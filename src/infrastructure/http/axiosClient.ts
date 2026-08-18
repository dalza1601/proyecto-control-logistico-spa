import axios from "axios";
import { attachInterceptors } from "./interceptors";

type ViteEnv = {
  VITE_API_BASE_URL?: string;
  VITE_API_URL?: string;
};

const env = (import.meta as ImportMeta & { env?: ViteEnv }).env ?? {};
const defaultApiUrl = "http://localhost:5113";
const apiBaseUrl = (env.VITE_API_BASE_URL ?? env.VITE_API_URL ?? defaultApiUrl)
  .concat("/api")
  .trim()
  .replace(/\/$/, "");

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "X-Client-Id": 111,
  },
});

attachInterceptors(apiClient);
