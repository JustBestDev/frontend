import { mainApi } from "./mainApi";

export function registerAccount(payload) {
  return mainApi.post("/auth/register", payload);
}

export function loginAccount(payload) {
  return mainApi.post("/auth/login", payload);
}
