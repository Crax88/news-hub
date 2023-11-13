import axios from "axios";
import type { AxiosError, AxiosRequestConfig } from "axios";
// "https://news-hub-api-a9vv.onrender.com/api";
export const apiInstance = axios.create({
  baseURL: "http://localhost:4000/api", //import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const createInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  return apiInstance({
    ...config,
    ...options,
  }).then((r) => r.data);
};

export type BodyType<Data> = Data;

export type ErrorType<Error> = AxiosError<Error>;
