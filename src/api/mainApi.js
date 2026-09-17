import axios from "axios";

export const mainApi = axios.create({
  baseURL: "http://localhost:8899",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
