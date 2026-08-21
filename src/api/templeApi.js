import { mainApi } from "./mainApi";

export const getTemples = (params) => mainApi.get("/temples", { params });
export const getTempleById = (templeId) => mainApi.get(`/temples/${templeId}`);
export const getCategories = () => mainApi.get("/categories");
export const getFavorites = (token) =>
  mainApi.get("/favorites", { headers: { Authorization: `Bearer ${token}` } });
export const addFavorite = (templeId, token) =>
  mainApi.post(
    `/temples/${templeId}/favorite`,
    {},
    { headers: { Authorization: `Bearer ${token}` } },
  );
export const removeFavorite = (templeId, token) =>
  mainApi.delete(`/temples/${templeId}/favorite`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const drawFortune = (templeId, token) =>
  mainApi.post(
    `/temples/${templeId}/fortune`,
    {},
    { headers: { Authorization: `Bearer ${token}` } },
  );
export const getFortuneHistoryById = (historyId, token) =>
  mainApi.get(`/fortune-histories/${historyId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
